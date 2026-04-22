import './App.css'
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import React, { lazy, Suspense } from 'react'
import { Toaster } from "sonner"
import { AnimatePresence } from 'framer-motion'


import Mainlayout from './Layout.jsx/Mainlayout'
import ProtectedRoutes from './Common/ProtectedRoutes'
import Protuctedroutebasedrole from './Common/Protuctedroute'
import ErrorFallback from './Common/Routererror'
import LoaderMAin from './Common/Loader'


const Home = lazy(() => import("./pages/Home"))
const Searchpage = lazy(() => import("./pages/Searchpage"))
const Detailpage = lazy(() => import("./pages/Detailpage"))
const UserDetailspages = lazy(() => import('./pages/UserDetailspages'))
const HostRegister = lazy(() => import('./pages/HostRegister'))
const Editpage = lazy(() => import('./pages/Editpage'))
const Payment = lazy(() => import('./pages/Payment'))
const MainSellingpage = lazy(() => import('./pages/Sellingpage/MainSellingpage'))
const ConfettiDemo = lazy(() => import('./Utils/UILIBRARY/Sucesscomp').then(m => ({ default: m.ConfettiDemo })))

const Profile = lazy(() => import('./pages/Profile'))
const Userprofile = lazy(() => import('./pages/profileuser/Userprofiledata'))
const Wishlist = lazy(() => import('./Components/Wishlist'))
const Bookinglist = lazy(() => import('./Components/Bookinglist'))
const Message = lazy(() => import('./pages/profileuser/Message'))
const MessageTosingleuser = lazy(() => import('./pages/profileuser/MessageTosingleuser'))
const Alassitance = lazy(() => import('./pages/profileuser/Alassitance'))
const Saleshistory = lazy(() => import('./pages/profileuser/Saleshistory'))
const Dashboard = lazy(() => import('./pages/profileuser/Dashboard'))
const UserHistory = lazy(() => import('./pages/profileuser/UserHistory'))
const PropertiesGrid = lazy(() => import('./pages/profileuser/YourAllproperty'))


const Adminlayout = lazy(() => import('./Admin/AdminLayout'))
const Adminhome = lazy(() => import('./Admin/AdminHome'))
const Adminuserpage = lazy(() => import('./Admin/Admin.users'))
const Adminproductmanagement = lazy(() => import('./Admin/Adminmanage'))
const AdminProfile = lazy(() => import('./Admin/Adminprofile'))

function App() {

  const router = createBrowserRouter([
    {
      path: "/", element: <Mainlayout />,
      children: [


        {
          path: "/", element: <Home />
        },

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
