import './App.css'
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import React, { lazy, Suspense } from 'react'
const Home = lazy(() => import("./pages/Home"))

import { Toaster } from "sonner"

import { AnimatePresence } from 'framer-motion'
const Searchpage = lazy(() => import("./pages/Searchpage"))
const Profile = lazy(() => import('./pages/Profile'))

const Detailpage = lazy(() => import("./pages/Detailpage"))
import Wishlist from './Components/Wishlist'
import Bookinglist from './Components/Bookinglist'
import Mainlayout from './Layout.jsx/Mainlayout'
import ProtectedRoutes from './Common/ProtectedRoutes'
import Userprofile from './pages/profileuser/Userprofiledata'
import Message from './pages/profileuser/Message'
import Alassitance from './pages/profileuser/Alassitance'
import Saleshistory from './pages/profileuser/Saleshistory'

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
import ErrorFallback from './Common/Routererror'
import Loader from './Common/Loader'
import LoaderMAin from './Common/Loader'
import Protuctedroutebasedrole from './Common/Protuctedroute'



function App() {

  const router = createBrowserRouter([
    {
      path: "/", element: <Mainlayout />,
      children: [


        {
          path: "/", element: <Home />
        },
        // searchpage
        { path: "search", element: <Searchpage /> },

        {
          path: "/host/:host/profile", element: <UserDetailspages />
        },

        { path: "roomdetail/:id", element: (<Detailpage />), errorElement: <ErrorFallback /> },
        { path: "/editproperty/:id", element: (<Protuctedroutebasedrole host={true} > <Editpage /></Protuctedroutebasedrole>) },
        { path: "/payment/success", element: (<ConfettiDemo />) },
        { path: "/payment/cancel", element: (<ConfettiDemo cancel={"cancel"} />) },
        // profilepage
        {
          path: "profile", element: <Protuctedroutebasedrole  > <Profile /></Protuctedroutebasedrole>, children: [
            { index: true, element: <Userprofile /> },
            { path: "bookings", element: <Bookinglist /> },
            { path: "messages", element: <Message /> },
            { path: "message/:id", element: <MessageTosingleuser /> },
            { path: "wishlists", element: <Wishlist /> },
            { path: "aibot", element: <Alassitance /> },
            { path: "history", element: <Saleshistory /> },

            { path: "dashboard", element: <Protuctedroutebasedrole host={true}>  <Dashboard /> </Protuctedroutebasedrole> },
            { path: "yourproperties", element: <PropertiesGrid /> }

          ]
        },

        // new  property upload
        {
          path: "/property/host", element: <Protuctedroutebasedrole host={true}>   <MainSellingpage /></Protuctedroutebasedrole>
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


        // adminside
        {
          path: "/admin", element: <Protuctedroutebasedrole admin={true}>     <Adminlayout /></Protuctedroutebasedrole>,
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
        <Suspense fallback={<LoaderMAin />}>

          <RouterProvider router={router} />
        </Suspense>
      </AnimatePresence>
    </>
  )
}

export default App
