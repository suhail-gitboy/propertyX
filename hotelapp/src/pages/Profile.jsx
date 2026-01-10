import React, { useEffect, useRef, useState } from 'react'
import Profilebar from '../Components/Profilebar'
import { Outlet, useLocation } from 'react-router'
import Nav from '../Common/Nav'
import { easeIn, motion } from 'framer-motion'
import { ContextDatas } from '../Common/ContextWrapped'


const Profile = () => {
  const { baropen, Setbaropen } = ContextDatas()
  const newRef = useRef()
  const newTwo = useRef()
  const { pathname
  } = useLocation()
  const newThree = useRef()
  useEffect(() => {
    window.scrollTo(0, 0);

  }, [pathname])
  return (
    <motion.div initial={{ opacity: 0, y: -14 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3, ease: easeIn }} >
      {/* sidebar  */}
      <Nav profile={"profile"} Setbaropen={Setbaropen} baropen={baropen} user={"user"} ref={newThree} />
      <div className='flex bg-gray-100 gap-4 px-4 md:px-10' >
        <div className={`absolute left-0 ${baropen ? "translate-x-0 inset-y-0 fixed border-r top-0 border-black/5 rounded-none shadow-2xl " : "-translate-x-full"} md:static z-20  w-2/3 md:translate-x-0 transition-transform duration-300 md:w-1/4 lg:w-1/5 my-5 bg-white rounded-md  min-h-screen `}>
          <Profilebar />
        </div>
        <div className="w-full md:3/4 lg:w-4/5 min-h-screen bg-white my-5 rounded-md" ref={newTwo} >
          <Outlet />
        </div>
      </div>
    </motion.div>
  )
}

export default Profile
