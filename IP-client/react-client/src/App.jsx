import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar';
import PubHome from './pages/PubHome';
import Login from './pages/Login';
import Register from './pages/Register';




const router = createBrowserRouter([
  {
    path: "/",
    element: <>
    <Navbar/>
    <PubHome/>
    </>
  },
  {
    path: "/login",
    element: <>
    <Navbar/>
    <Login/>
    </>
  },
  {
    path: "/register",
    element: <>
    <Navbar/>
    <Register/>
    </>
  },
])






function App() {

  return <RouterProvider router={router} />
  
}

export default App
