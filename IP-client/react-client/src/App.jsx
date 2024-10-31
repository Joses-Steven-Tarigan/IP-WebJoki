import { useState } from 'react'
import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar';
import PubHome from './pages/PubHome';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';



function PubLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

function UserLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <PubLayout/>,
    loader: async () => {
      const access_token = localStorage.getItem("access_token");
      const isLoggedIn = access_token;
      if(isLoggedIn){
        throw redirect("/services")
      }else{
        return null
      }
    },
    children: [
    
  {
    path: "/",
    element: <>
    <PubHome/>
    </>
  },
  {
    path: "/login",
    element: <>
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
  ]
},
{
  element:<PubLayout/>,
  loader: async () => {
    const access_token = localStorage.getItem("access_token");
    const isLoggedIn = access_token;
    if(isLoggedIn){
      return null;
    }else{
      throw redirect("/login")
    }
  },
  children: [
    {
      path: "/services",
      element: <>
      <Navbar/>
      <Services/>
      </>
    },

  ]
}

])






function App() {

  return <RouterProvider router={router} />
  
}

export default App
