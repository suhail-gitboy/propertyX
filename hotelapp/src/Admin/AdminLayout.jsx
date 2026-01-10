import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa';
import Sidebar from "./AdminSide"
import { Outlet } from 'react-router';

const Adminlayout = () => {


    const [isSidebar, Setsidebar] = useState(false);
    const Togglesidear = () => {
        Setsidebar(!isSidebar)
    }
    return (
        <>
            <div className=''>

                <div className='min-h-screen   flex flex-col md:flex-row relative '>

                    <div className={`md:fixed min-h-screen ${isSidebar ? "translate-x-0" : "-translate-x-full"} transform z-60 absolute w-1/2 sm:w-1/3   md:w-2/12 left-0 top-0   md:translate-x-0   transition-transform duration-300`} >
                        <Sidebar Setsidebar={Setsidebar} />
                    </div>

                    <div className='flex md:hidden p-4 bg-gray-900 text-white z-20'>
                        <button onClick={Togglesidear}>
                            <FaBars size={24} />
                        </button>
                        <h1 className='ml-4 text-xl font-medium'>Admin Dashboard</h1>
                    </div>

                    <div className='w-full md:ml-34 lg:ml-60'>
                        <Outlet />
                    </div>



                </div>

            </div>

        </>

    )
}

export default Adminlayout
