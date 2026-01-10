import './App.css'
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import React, { lazy, Suspense } from 'react'
const Home = lazy(() => import("./pages/Home"))
import HotelCardExlusive from './Components/HotelCardExlusive'
import { Toaster } from "sonner"
import { AutumnKochi, Datasforhotel, Springdata, WinterNewYearKerala } from './Common/Hoteldatas'
import { AnimatePresence } from 'framer-motion'
const Searchpage = lazy(() => import("./pages/Searchpage"))
const Profile = lazy(() => import('./pages/Profile'))

const Detailpage = lazy(() => import("./pages/Detailpage"))
import Wishlist from './Components/Wishlist'
import Bookinglist from './Components/Bookinglist'
import Mainlayout from './Layout.jsx/Mainlayout'
import ProtectedRoutes from './Common/ProtectedRoutes'
import Userprofile from './pages/profileuser/userprofile'
import Message from './pages/profileuser/Message'
import Alassitance from './pages/profileuser/Alassitance'
import Saleshistory from './pages/profileuser/Saleshistory'
import Sellingproperties from './pages/profileuser/Sellingproperties'
import Approved from './pages/profileuser/Approved'

import Mapdetail from './pages/Sellingpage/Mapdetail'
import Payment from './pages/Payment'
import MainSellingpage from './pages/Sellingpage/MainSellingpage'
import Dashboard from './pages/profileuser/Dashboard'
import UserHistory from './pages/profileuser/UserHistory'
import PropertiesGrid from './pages/profileuser/YourAllproperty'
import Adminhome from './Admin/AdminHome'
import Adminuserpage from './Admin/Admin.users'
import Adminproductmanagement from './Admin/Adminmanage'

import Adminlayout from './Admin/AdminLayout'
import AdminProfile from './Admin/Adminprofile'
import UserDetailspages from './pages/UserDetailspages'
import HostRegister from './pages/HostRegister'
import Editpage from './pages/Editpage'
import { ConfettiDemo } from './Utils/UILIBRARY/Sucesscomp'
import MessageTosingleuser from './pages/profileuser/MessageTosingleuser'



function App() {

  const router = createBrowserRouter([
    {
      path: "/", element: <Mainlayout />,
      children: [

        // home
        {
          path: "/", element: <Home />, children: [
            { index: true, element: <HotelCardExlusive data={Datasforhotel} /> },
            { path: "home/spring", element: <HotelCardExlusive data={Springdata} /> },
            { path: "home/automn", element: <HotelCardExlusive data={AutumnKochi} /> },
            { path: "home/winter", element: <HotelCardExlusive data={WinterNewYearKerala} /> },
          ]
        },
        // searchpage
        { path: "search", element: <Searchpage /> },

        {
          path: "/host/:host/profile", element: <UserDetailspages />
        },

        { path: "roomdetail/:id", element: (<Detailpage />) },
        { path: "/editproperty/:id", element: (<Editpage />) },
        { path: "/payment/success", element: (<ConfettiDemo />) },
        { path: "/payment/cancel", element: (<ConfettiDemo cancel={"cancel"} />) },
        // profilepage
        {
          path: "profile", element: <ProtectedRoutes><Profile /></ProtectedRoutes>, children: [
            { index: true, element: <Userprofile /> },
            { path: "bookings", element: <Bookinglist /> },
            { path: "messages", element: <Message /> },
            { path: "message/:id", element: <MessageTosingleuser/>},
            { path: "wishlists", element: <Wishlist /> },
            { path: "aibot", element: <Alassitance /> },
            { path: "history", element: <Saleshistory /> },

            { path: "dashboard", element: <Dashboard /> },
            { path: "yourproperties", element: <PropertiesGrid /> }

          ]
        },

        // new  property upload
        {
          path: "/property/host", element: <MainSellingpage />
        },
        // payment
        {
          path: "/payment", element: <Payment />
        },
        //edit property
        {
          path: "/edit/:host/property", element: <Payment />
        },
        {
          path: "/register/host", element: <HostRegister />
        }
        ,
        {
          path: "/admin", element: <Adminlayout />,
          children: [
            { path: "/admin/home", element: <Adminhome /> }
            , {
              path: "/admin/user", element: <Adminuserpage />
            },
            , {
              path: "/admin/product", element: <Adminproductmanagement />
            },

            , {
              path: "/admin/profile", element: <AdminProfile />
            },


          ]

        },

        {
          path: "*", element: <>
            <Link to="/" className="h-screen w-screen flex items-center justify-center">
              <img className='h-fit w-fit object-cover' src="https://codetap.org/storage/projects/404-page-not-found-animated-error-page.png" alt="" />
            </Link>
          </>
        },

      ]
    }
  ])

  return (
    <>
      <Toaster position='top-center' />
      <AnimatePresence mode="wait">
        <Suspense fallback={<>loading..</>}>

          <RouterProvider router={router} />
        </Suspense>
      </AnimatePresence>
    </>
  )
}

export default App
