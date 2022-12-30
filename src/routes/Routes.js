import { useContext } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Home from "../home/Home/Home";
import Main from "../layout/Main";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import Addtask from "../task/add task/Addtask";
import Completedtask from "../task/completed task/Completedtask";
import Mytask from "../task/mytask/Mytask";
import Private from "./Private";

export const router = createBrowserRouter([

    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }, {
                path: '/addtask',
                element: <Private><Addtask></Addtask></Private>
            }, {
                path: '/mytask',
                element: <Private><Mytask></Mytask></Private>
            }, {
                path: '/completedtask',
                element: <Private><Completedtask></Completedtask></Private>
            }, {
                path: '/login',
                element: <Login></Login>
            }, {
                path: '/signup',
                element: <Signup></Signup>
            }
        ]
    }
])