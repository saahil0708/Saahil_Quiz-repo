import { ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const GetStarted = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center font-[Chillax] bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0]">
            <main className="w-[22rem] rounded-3xl shadow-xl h-[35rem] bg-white backdrop-opacity-20 relative overflow-hidden">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#026670]/10 opacity-50"></div>

                <div className="flex justify-center mt-12 relative z-10">
                    <img 
                        src="https://5lvqoxsqvr.ufs.sh/f/pX5NHY8clfw3Pyblfq58lx1BLTXmhtsbrJkvOzW6E40Niwjy" 
                        alt="" 
                        className="w-[250px] transition-transform duration-300 hover:scale-105" 
                    />
                </div>

                <div className="flex justify-center mt-20 relative z-10">
                    <NavLink to='/quiz'>
                        <button className="font-medium text-3xl text-[#026670] shadow-xl px-10 rounded-full py-2 flex items-center hover:bg-[#026670] hover:text-white transition-all duration-300 hover:shadow-2xl hover:shadow-[#026670]/50 relative overflow-hidden">
                            <span className="relative z-10">Get Started</span>
                            <div className="ml-5 relative z-10 transition-transform duration-300 group-hover:translate-x-2">
                                <ChevronRight />
                            </div>
                            {/* Button hover effect */}
                            <div className="absolute inset-0 bg-[#026670] opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                        </button>
                    </NavLink>
                </div>
            </main>
        </div>
    );
};