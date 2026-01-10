import React, { useEffect, useState } from 'react'
import { FaHome, FaUserCircle } from "react-icons/fa";
import { CiBookmarkCheck } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';
import { ContextDatas } from '../Common/ContextWrapped';
import { MdOutlineMessage } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import { FaHouseChimney } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { toast } from 'sonner';
import Loading from './Loading';
const Profilebar = () => {

  const GetName = JSON.parse(localStorage.getItem("user"))
  const [loading, Setloading] = useState(false)
  const Navigate = useNavigate()
  const { isLogged, SetisLogged, Setloginmodal } = ContextDatas()



  useEffect(() => {
    if (!GetName) {
      SetisLogged(false)
    }
  }, []

  )
  const { SetUser, User, token } = ContextDatas()
  const [sellTogle, Setselltogle] = useState(true)




  const FunctionLogout = () => {
    Setloading(true)

    setTimeout(() => {

      sessionStorage?.clear()
      SetUser("")
      Navigate("/")
      Setloading(false)
      toast.success("logout successfully")
    }, 2000);

  }

  return (
    <div className='px-3 lg:px-10 mt-10 h-full pb-10 relative '>

      <div className='flex space-x-3 items-center pb-5 border-b border-gray-500/30'>
        <img src={
          typeof User?.picture === "string"
            ? User.picture
            : User?.picture?.url
        } className='w-10 h-10 rounded-full' />
        <div>
          <h1 className='text-xl text-gray-500 font-medium '>{User?.name}</h1>
          <p className='text-gray-500 font-light'>Account user</p>
        </div>



      </div>
      <div className='flex flex-col justify-start  mt-5 border-b border-neutral-600/20 pb-2'>
        <NavLink to="/profile/" end className={({ isActive }) => isActive ? "mb-2  text-nowrap transition-colors duration-150 text-md md:text-lg  bg-blue-100 px-4 w-full rounded-md py-2  text-blue-600 font-medium flex  items-center" : "mb-2 text-nowrap text-sm md:text-lg text-gray-600 font-medium flex w-full px-4 py-2   items-center"}>
          <FaRegCircleUser className='mr-1' />
          Personal
        </NavLink>
        {
          User?.role == "host" ? (
            <>
              <NavLink to="/profile/dashboard" className={({ isActive }) => isActive ? "mb-2  w-full text-sm md:text-lg bg-blue-100 px-4 rounded-md py-2  text-blue-600 font-medium flex  items-center" : "mb-2   text-gray-600 font-medium flex text-sm md:text-lg w-full px-4 py-2  items-center"}>
                <CiBookmarkCheck className='mr-1' />
                Dashboard
              </NavLink>

              <NavLink to="/profile/yourproperties" className={({ isActive }) => isActive ? "mb-2 w-full text-sm md:text-lg bg-blue-100 px-4 rounded-md py-2  text-blue-600 font-medium flex  items-center" : "mb-2   text-gray-600 font-medium text-sm md:text-lg flex w-full px-4 py-2  items-center"}>
                <FaHeart className='mr-1' />
                Allproperties
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile/bookings" className={({ isActive }) => isActive ? "mb-2  w-full text-sm md:text-lg bg-blue-100 px-4 rounded-md py-2  text-blue-600 font-medium flex  items-center" : "mb-2   text-gray-600 font-medium flex text-sm md:text-lg w-full px-4 py-2  items-center"}>
                <CiBookmarkCheck className='mr-1' />
                Trips
              </NavLink>

              <NavLink to="/profile/wishlists" className={({ isActive }) => isActive ? "mb-2 w-full text-sm md:text-lg bg-blue-100 px-4 rounded-md py-2  text-blue-600 font-medium flex  items-center" : "mb-2   text-gray-600 font-medium text-sm md:text-lg flex w-full px-4 py-2  items-center"}>
                <FaHeart className='mr-1' />
                Wishlists
              </NavLink>
            </>
          )
        }
        <NavLink to="/profile/messages" className={({ isActive }) => isActive ? "mb-2 w-full    text-md md:text-lg bg-blue-100 px-4 rounded-md py-2  text-blue-600 font-medium flex  items-center" : "mb-2   text-gray-600 font-medium text-sm md:text-lg w-full px-4 py-2  flex  items-center"}>
          <MdOutlineMessage className='mr-1' />
          messages
        </NavLink>
      </div>


      {/* bar2 */}
      <div className='flex flex-col justify-start  mt-5 border-b border-neutral-600/20 pb-2'>
        <NavLink to="/profile/aibot" end className={({ isActive }) => isActive ? "mb-2  text-nowrap transition-colors duration-150 text-md md:text-lg  bg-blue-100 px-4 w-full rounded-md py-2  text-blue-600 font-medium flex  items-center" : "mb-2 text-nowrap text-sm md:text-lg text-gray-600 font-medium flex w-full px-4 py-2   items-center"}>
          <RiRobot2Fill className='mr-1' />
          al asistance
        </NavLink>


        {
          User?.role == "host" && <>
            <NavLink to="/profile/history" className={({ isActive }) => isActive ? "mb-2 w-full    text-md md:text-lg bg-blue-100 px-4 rounded-md py-2  text-blue-600 font-medium flex  items-center" : "mb-2   text-gray-600 font-medium text-sm md:text-lg w-full px-4 py-2  flex  items-center"}>
              <FaHome className='mr-1' />
              bookings
            </NavLink>
          </>
        }
      </div>

      <div onClick={FunctionLogout} className='mt-5  flex justify-center items-center text-red-500 py-2 w-full hover:bg-red-300  px-2 bg-red-100 rounded-md'>
        {loading ? <Loading /> : <><IoIosLogOut className='mr-1' />Log-out</>}

      </div>

    </div>
  )
}

export default Profilebar
