import React, { useState } from 'react'
import { FaBoxOpen, FaClipboardCheck, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from 'react-icons/fa';
import { HiXMark } from "react-icons/hi2";
import { NavLink, useNavigate } from 'react-router';
import { ContextDatas } from '../Common/ContextWrapped';
import Loading from '../Components/Loading';

const Sidebar = ({ Setsidebar }) => {
    const navigate = useNavigate()
    const [loading, Setloading] = useState(false)


    const { SetUser, User } = ContextDatas()


    const FunctionLogout = () => {
        Setloading(true)

        setTimeout(() => {

            sessionStorage?.clear()
            SetUser("")
            navigate("/")
            Setloading(false)
            toast.success("logout successfully")
        }, 2000);

    }
    return (
        <div className=' p-5 top-0 z-70   h-screen  bg-gray-900' >
            <div className='flex justify-end items-end mb-4 md:hidden'>
                <HiXMark className='text-xl text-white' onClick={() => Setsidebar(false)} />

            </div>


            <div className="py-4 flex gap-3 items-center  mb-5">
                <img src={
                    typeof User?.picture === "string"
                        ? User.picture
                        : User?.picture?.url
                } alt="" className='h-10 w-10 rounded-full' />
                <h3 className='text-center font-semibold text-md md:text-md text-gray-500'>{User?.name}

                </h3>
            </div>

            <nav className='flex flex-col space-y-2'>
                <NavLink to="/admin/home" className={({ isActive }) => isActive ? "bg-gray-700 text-white py-3 px-3 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}><FaStore /><span>shop</span></NavLink>
                <NavLink to="/admin/user" className={({ isActive }) => isActive ? "bg-gray-700 text-white py-3 px-3 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}><FaUser /><span>user</span></NavLink>
                <NavLink to="/admin/product" className={({ isActive }) => isActive ? "bg-gray-700 text-white py-3 px-3 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}><FaBoxOpen /><span>products</span></NavLink>
                <NavLink to="/admin/profile" className={({ isActive }) => isActive ? "bg-gray-700 text-white py-3 px-3 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}><FaClipboardList /><span>Profile</span></NavLink>


            </nav>
            <div className='mt-6' >
                <button onClick={FunctionLogout} className='w-full bg-red-500 text-white px-4 py-2 rounded flex items-center justify-center  ' >{loading ? <Loading /> : <><FaSignOutAlt /><span>logout</span></>}</button>
            </div>
        </div>
    )
}

export default Sidebar
