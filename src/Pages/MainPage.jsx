"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

const questions = [
  {
    question: "Who was the Czar of Russia during WW II?",
    options: ["Nicholas II", "Alexander III", "Peter the Great", "None of the above"],
    correctAnswer: "None of the above",
  },
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "Who is the best Coder in Uniques?",
    options: ["Kumar Sujal", "Aryan Kamboz", "Niraj Gupta", "Saahil"],
    correctAnswer: "Saahil",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Jupiter",
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Ag", "Au", "Pt"],
    correctAnswer: "Au",
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "South Korea", "Vietnam"],
    correctAnswer: "Japan",
  },
  {
    question: "How many bones are present in the adult body?",
    options: ["206", "201", "207", "180"],
    correctAnswer: "206",
  },
  {
    question: "Which gas do plants use for photosynthesis?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Carbon Dioxide",
  },
  {
    question: "Who developed the theory of relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo Galilei"],
    correctAnswer: "Albert Einstein",
  },
]

export const MainPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [timeLeftPerQuestion, setTimeLeftPerQuestion] = useState(15)
  const [totalTimeLeft, setTotalTimeLeft] = useState(600)
  const [quizResults, setQuizResults] = useState({
    correct: 0,
    incorrect: 0,
    unattempted: questions.length,
  })
  const [isQuizFinished, setIsQuizFinished] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null))
  const [answeredQuestions, setAnsweredQuestions] = useState(Array(questions.length).fill(false))

  useEffect(() => {
    if (totalTimeLeft === 0) {
      setIsQuizFinished(true)
      return
    }
    const globalTimer = setTimeout(() => {
      setTotalTimeLeft(totalTimeLeft - 1)
    }, 1000)
    return () => clearTimeout(globalTimer)
  }, [totalTimeLeft])

  useEffect(() => {
    if (timeLeftPerQuestion === 0) {
      handleNextQuestion()
    }
    const questionTimer = setTimeout(() => {
      setTimeLeftPerQuestion(timeLeftPerQuestion - 1)
    }, 1000)
    return () => clearTimeout(questionTimer)
  }, [timeLeftPerQuestion])

  useEffect(() => {
    if (showResult) {
      const resultTimer = setTimeout(() => {
        setShowResult(false)
        handleNextQuestion()
      }, 2000)
      return () => clearTimeout(resultTimer)
    }
  }, [showResult])

  const handleOptionSelect = (option) => {
    if (!answeredQuestions[currentQuestionIndex]) {
      setSelectedOption(option)
    }
  }

  const handleSubmit = () => {
    if (answeredQuestions[currentQuestionIndex]) return // Prevent re-submission

    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = selectedOption === currentQuestion.correctAnswer

    setQuizResults((prevResults) => ({
      ...prevResults,
      correct: isCorrect ? prevResults.correct + 1 : prevResults.correct,
      incorrect: !isCorrect ? prevResults.incorrect + 1 : prevResults.incorrect,
      unattempted: prevResults.unattempted - 1,
    }))

    setIsAnswerCorrect(isCorrect)
    setShowResult(true)

    const newAnsweredQuestions = [...answeredQuestions]
    newAnsweredQuestions[currentQuestionIndex] = true
    setAnsweredQuestions(newAnsweredQuestions)

    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = selectedOption
    setUserAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setTimeLeftPerQuestion(15)
      setSelectedOption(null)

      // If the next question was previously answered, show the saved answer
      if (answeredQuestions[currentQuestionIndex + 1]) {
        setSelectedOption(userAnswers[currentQuestionIndex + 1])
      }
    } else {
      setIsQuizFinished(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setTimeLeftPerQuestion(15)

      // Set the selected option based on whether the question was previously answered
      if (answeredQuestions[currentQuestionIndex - 1]) {
        setSelectedOption(userAnswers[currentQuestionIndex - 1])
      } else {
        setSelectedOption(null)
      }
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`
  }

  if (isQuizFinished || totalTimeLeft === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center font-[Chillax] bg-[#f0f0f0]">
        <main className="w-[22rem] rounded-3xl shadow-xl h-[35rem] bg-white">
          <div className="flex flex-col items-center w-full bg-[#026670] rounded-t-3xl py-5">
            <div className="w-[90%] flex justify-start mt-7">
              <p className="text-2xl font-semibold text-white">Quiz Results</p>
            </div>
          </div>
          <div className="w-full flex justify-center mt-10">
            <div className="w-[90%] space-y-6 text-center">
              <p className="text-xl font-medium text-gray-700">
                Correct: <span className="text-green-600">{quizResults.correct}</span>
              </p>
              <p className="text-xl font-medium text-gray-700">
                Incorrect: <span className="text-red-600">{quizResults.incorrect}</span>
              </p>
              <p className="text-xl font-medium text-gray-700">
                Unattempted: <span className="text-yellow-600">{quizResults.unattempted}</span>
              </p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (showResult) {
    return (
      <div className="w-full h-screen flex items-center justify-center font-[Chillax] bg-[#f0f0f0]">
        <main className="w-[22rem] rounded-3xl shadow-xl h-[35rem] bg-white">
          <div className="flex flex-col items-center w-full bg-[#026670] rounded-t-3xl py-5">
            <div className="w-[90%] flex justify-start mt-7">
              <p className="text-2xl font-semibold text-white">Result</p>
            </div>
          </div>
          <div className="w-full flex justify-center mt-10">
            <div className="w-[90%] flex justify-center text-xl font-medium">
              {isAnswerCorrect ? (
                <p className="text-green-600">Correct Answer!</p>
              ) : (
                <p className="text-red-600">Incorrect Answer!</p>
              )}
            </div>
          </div>
        </main>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const isQuestionAnswered = answeredQuestions[currentQuestionIndex]

  return (
    <div className="w-full h-screen flex items-center justify-center font-[Chillax] bg-[#f0f0f0]">
      <main className="w-[22rem] rounded-3xl shadow-xl h-[35rem] bg-white">
        <div className="flex flex-col items-center w-full bg-[#026670] rounded-t-3xl py-5">
          <div className="flex items-center justify-end w-[90%]">
            <Clock className="w-6 h-5 text-white mr-2" />
            <p className="flex font-medium text-white">{formatTime(totalTimeLeft)}</p>
          </div>
          <div className="w-[90%] flex justify-start mt-7">
            <p className="text-2xl font-semibold text-white">
              Question {currentQuestionIndex + 1} / {questions.length}
            </p>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full flex justify-center">
            <div className="flex items-center justify-end w-[90%] mt-3">
              <Clock className="w-6 h-5 text-black mr-2" />
              <p className="flex font-medium text-black">0 : {timeLeftPerQuestion.toString().padStart(2, "0")}</p>
            </div>
          </div>
          <div className="w-full flex justify-center mt-3">
            <div className="w-[90%] flex justify-center text-xl font-medium text-center px-4">
              {currentQuestion.question}
            </div>
          </div>
          <div className="w-full flex justify-center mt-5">
            <ul className="space-y-4 w-[90%]">
              {currentQuestion.options.map((option, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 transform transition-all duration-300 hover:scale-105 text-[#026670] font-medium text-lg rounded-lg cursor-pointer border-2 border-[#026670] text-center ${
                    selectedOption === option ? "bg-[#026670] text-white" : ""
                  } ${isQuestionAnswered ? "pointer-events-none opacity-50" : ""}`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full flex justify-center mt-8">
            <div className="w-[90%] flex justify-between text-lg">
              {currentQuestionIndex > 0 && (
                <button
                  className="px-4 rounded text-white bg-[#026670] hover:bg-[#024b5a] transition-all"
                  onClick={handlePreviousQuestion}
                >
                  Previous
                </button>
              )}
              <button
                className={`px-4 rounded text-white ${
                  selectedOption || isQuestionAnswered
                    ? "bg-[#026670] hover:bg-[#024b5a]"
                    : "bg-gray-400 cursor-not-allowed"
                } transition-all`}
                onClick={isQuestionAnswered ? handleNextQuestion : selectedOption ? handleSubmit : undefined}
                disabled={!selectedOption && !isQuestionAnswered && currentQuestionIndex === questions.length - 1}
              >
                {isQuestionAnswered ? "Next" : selectedOption ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

