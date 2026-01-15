import React, { useEffect, useRef, useState } from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";
import { NavLink } from "react-router-dom"
import {
  FiMessageCircle,
  FiHeart,
  FiCalendar,
  FiHome,
  FiCpu,
  FiUser
} from "react-icons/fi";
import { LuSun } from "react-icons/lu";
import { Link, Outlet, useLocation } from 'react-router';



import Rating from '@mui/material/Rating';


import { motion, AnimatePresence, useInView, easeInOut } from "framer-motion";
import { ContextDatas } from '../Common/ContextWrapped';
import { reviews } from '../Common/Hoteldatas';

import Nav from '../Common/Nav';

import { useDispatch, useSelector } from 'react-redux';

import CardHome from '../Components/HomepageCard';

import Header from '../Common/Header';
import PropertyCard from '../Components/MediaScroll';

import Homenav from '../Common/Homenav';
import { toast } from 'sonner';


const Home = () => {

  const location = useLocation()

  const { User, isLogged, SetisLogged, Setloginmodal, token } = ContextDatas()
  const [Skeleton, Setskeleton] = useState(false)



  useEffect(() => {
    const Getuser = JSON.parse(localStorage.getItem("loginuser"))
    if (Getuser == null) {
      SetisLogged(false)
    }

    Setskeleton(true)
    setTimeout(() => {
      Setskeleton(false)
    }, 1000);


  }, [])



  const [AfterFiltered, Setafterfiltered] = useState([])
  const { products, loading } = useSelector((state) => state.Product)

  const Protuctbar = () => {

    if (User.role == "user" || User.role == "host") return

    if (!User) {
      toast.warning("login to start explore")
      Setloginmodal(true)
    }
  }

  useEffect(() => {

    Setafterfiltered(products?.filter((data) => data.isActive == "approved" && !data.isAvailable == false))
  }, [products])
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <>
      {/* top */}
      <Nav homesearch={"yes"} />


      {/* hero */}
      <Header />
      <div className="pt-40 px-4 md:px-10 flex pb-10 w-full">


        <div className="hidden md:block md:w-1/6">
          {
            User.role !== "admin" && User && <div className="sticky top-30">
              <Homenav />
            </div>
          }
        </div>


        <div className="mx-auto w-full md:w-4/6 min-h-screen">
          <PropertyCard property={AfterFiltered} />
        </div>

      </div>





      <div className={`mt-30  px-4 md:px-20 md:grid w-full  grid grid-cols-2 md:grid-cols-4  gap-4 space-y-3 h-auto mb-20`}>

        {

          AfterFiltered?.slice(0, 12).map((data, id) => (
            <AnimatePresence>

              <CardHome property={data} grid={1} id={id} home={"home"} />



            </AnimatePresence>
          ))


        }
      </div>
      <div className="flex justify-end px-4 md:px-20">
        <Link to="/search" className='px-4 flex justify-center items-center py-2 rounded text-white bg-blue-400 hover:bg-blue-600'>See more <FaLongArrowAltRight className='ml-2' /></Link>
      </div>

      <div className='px-5 sm:px-7 md:px-14 lg:px-20'> {/*padding main*/}

        {/* third */}





        {/* s7 */}
        <h3 className='font-semibold text-3xl py-4 mt-10'>Things to do in Kerala</h3>
        <div className='mt-3 gap-2 hidden md:flex  lg:w-3/4 space-x-3  '>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-black text-white px-2 py-2 border border-black/20 rounded-full flex justify-center items-center"
                : "px-3 py-1  text-black text-xs border border-black/20 rounded-full flex justify-center items-center"
            }
            to="/summer"
          >
            <LuSun className="mr-2" />
            Explore
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-black text-white px-2 py-2 border border-black/20 rounded-full flex justify-center items-center"
                : "px-3 py-1  text-black border border-black/20 text-xs rounded-full flex justify-center items-center"
            }
            to="/summer"
          >
            <LuSun className="mr-2" />
            Beach
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-black text-white px-2 py-2 border border-black/20 rounded-full flex justify-center items-center"
                : "px-3 py-1  text-black border border-black/20 text-xs rounded-full flex justify-center items-center"
            }
            to="/summer"
          >
            <LuSun className="mr-2" />
            Museum
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-black text-white px-2 py-2 border border-black/20 rounded-full flex justify-center items-center"
                : "px-3 py-1  text-black border border-black/20 rounded-full text-xs flex justify-center items-center"
            }
            to="/summer"
          >
            <LuSun className="mr-2" />
            Show
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-black text-white px-2 py-2 border border-black/20 rounded-full flex justify-center items-center"
                : "px-3 py-1  text-black border text-xs border-black/20 rounded-full flex justify-center items-center"
            }
            to="/summer"
          >
            <LuSun className="mr-2" />
            Food
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-black text-white px-2 py-2 border border-black/20 rounded-full flex justify-center items-center"
                : "px-3 py-1  text-black border text-xs border-black/20 rounded-full flex justify-center items-center"
            }
            to="/summer"
          >
            <LuSun className="mr-2" />
            Night life
          </NavLink>
        </div>
        <Link to="/search">
          <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1 mt-6 mb-10'>

            <div className='hover:scale-102 transition-transform duration-300'>
              <img src="https://static.wixstatic.com/media/5afe33_de255f2ea33d4589aa2c9a2b9b10d650~mv2.png/v1/fill/w_580,h_408,al_c,q_85,enc_avif,quality_auto/5afe33_de255f2ea33d4589aa2c9a2b9b10d650~mv2.png" className='h-40 w-50 rounded-lg' alt="" />
              <h1 className='text-sm mt-1 font-semibold text-gray-700 '>History</h1>
            </div>
            <div className='hover:scale-102 transition-transform duration-300'>
              <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/17/28/ed/iduukki-arch-dam.jpg?w=700&h=400&s=1" className='h-40 w-50 rounded-lg' alt="" />
              <h1 className='text-sm mt-1 font-semibold text-gray-700 '>idukki</h1>
            </div><div className='hover:scale-102 transition-transform duration-300'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO-Ltj3Z2pGJtwhvJ1LG1zlP7AVu8QZ57S4g&s" className='h-40 w-50 rounded-lg' alt="" />
              <h1 className='text-sm mt-1 font-semibold text-gray-700 '>Theyyam ,Kannur</h1>
            </div><div className='hover:scale-102 transition-transform duration-300'>
              <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/95/26/3d/bar-interior.jpg?w=500&h=-1&s=1" className='h-40 w-50 rounded-lg' alt="" />
              <h1 className='text-sm mt-1 font-semibold text-gray-700 '>Kovalam party,Kollam</h1>
            </div><div className='hover:scale-102 transition-transform duration-300'>
              <img src="https://cdn.confident-group.com/wp-content/uploads/2021/09/14192247/Calicut-A-place-with-major-historical-significance-COVER.jpg" className='h-40 w-50 rounded-lg' alt="" />
              <h1 className='text-sm mt-1 font-semibold text-gray-700 '>Food capital,kozhikode</h1>
            </div>
            <div className='hover:scale-102 transition-transform duration-300'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3p6BT4kcqCraktjlEiQZ1Y7Exu4W2QjZsww&s" className='h-40 w-50 rounded-lg' alt="" />
              <h1 className='text-sm mt-1 font-semibold text-gray-700 '>Cultural capital,Thrissur</h1>
            </div>

          </div>
        </Link>


        {/* s5 */}
        {/* sec7 */}
        <div className='mt-20'>

          <motion.div className='grid grid-cols-1 sm:grid-cols-3'>
            <motion.div initial={{ opacity: 0, filter: "blur(10px)" }} whileInView={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.7, ease: easeInOut }} className='p-4 flex flex-col items-center justify-center space-y-2'>
              <div className='p-4 bg-blue-200 rounded-md'>
                <img src="/shield-check.png" alt="" className='w-10 h-10 ' />
              </div>
              <p className='font-semibold text-xl'>No hidden fees</p>
              <p className='text-sm text-center text-gray-700 '>Transparent pricing with no hidden fees.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, filter: "blur(10px)" }} whileInView={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.7, ease: easeInOut }} className='p-4 flex flex-col items-center justify-center space-y-2'>
              <div className='p-4 bg-blue-200 rounded-md'>
                <img src="/file-list-edit.png" alt="" className='w-10 h-10 ' />
              </div>
              <p className='font-semibold text-xl'>Instant booking</p>
              <p className='text-sm text-center text-gray-700 '>Get confirm right after you reserve.</p>
            </motion.div> <motion.div initial={{ opacity: 0, filter: "blur(10px)" }} whileInView={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.7, ease: easeInOut }} className='p-4 flex flex-col items-center  space-y-2'>
              <div className='p-4 bg-blue-200 rounded-md'>
                <img src="/dollar-circle.png" alt="" className='w-10 h-10 ' />
              </div>
              <p className='font-semibold text-xl'>Flexibility</p>
              <p className='text-sm text-center text-gray-700 '>flexible option with free cancellation on many listings.</p>
            </motion.div>
          </motion.div>


        </div>



      </div>
      <motion.div
        className="relative overflow-x-hidden w-full min-h-80 bg-neutral-900 py-10 text-white"
      >
        <h3 className='text-2xl font-semibold mb-5 ml-10'>Our Reviews</h3>
        {/* LEFT FADE */}
        <motion.div animate={{
          x: ["0%", "-50%"],
        }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }} className="flex gap-6">
          {reviews.map((data, id) => (
            <div className="min-w-[220px] bg-neutral-700 hover:scale-102 transition-transform duration-300 rounded-xl p-4 text-white shadow-md">
              <div className='gap-1 flex justify-end '>
                <Rating sx={{ fontSize: "1rem" }} name="half-rating-read" defaultValue={data.stars} precision={0.5} readOnly />
              </div>
              <h3 className="font-semibold text-sm">{data.name}</h3>
              <p className="text-xs mt-1 leading-snug opacity-85">
                {data.text}
              </p>
            </div>
          ))}
        </motion.div>


        {/* SCROLL CONTAINER */}


      </motion.div>
    </>



  )
}

export default Home
