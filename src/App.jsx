import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GetStarted } from "./Pages/GetStarted";
import { MainPage } from './Pages/MainPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <GetStarted />
    },
    {
        path: "/quiz",
        element: <MainPage />
    }
]);

export default function App() {
    return <RouterProvider router={router} />;
}
