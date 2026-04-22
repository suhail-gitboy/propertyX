import { AnimatePresence, motion, useInView, easeInOut } from 'framer-motion'
import React, { useRef } from 'react'
import { Link, useLocation } from 'react-router'
import { FaMapMarkerAlt, FaSearch, FaHome, FaPlusCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BsFillBuildingsFill } from "react-icons/bs"
import { RiHotelLine } from "react-icons/ri";
import { IoIosHome } from "react-icons/io";
import { HiHomeModern } from "react-icons/hi2";
import { MdOutlineAddHomeWork } from "react-icons/md"
import { VscAccount } from "react-icons/vsc";
import { ContextDatas } from './ContextWrapped';
import Nav from './Nav';

const Header = ({ text = "Find homes,Connect directly" }) => {
    const ref = useRef(null);

    const location = useLocation()
    const newRef = useRef(null)
    const isInView = useInView(ref, { once: true });
    const isInViewTwo = useInView(ref, { once: true });

    const { User, token } = ContextDatas()


    return (
        <>
            <div className='relative'>


                <div className='relative bg-black/65 flex justify-center items-center'>
                    <section className='z-50 absolute top-0 left-0 right-0'>
                        <Nav homesearch="fvfd" />
                    </section>

                    <img src="/house.webp" className='w-full sm:h-100 brightness-70 md:h-150' alt="" />
                    <div className='text-center absolute '>
                        <AnimatePresence>
                            {text.split("").map((char, i) => (
                                <motion.span
                                    ref={ref}
                                    key={i}
                                    initial={{ opacity: 0, x: -18 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    exit="hidden"
                                    transition={{ duration: 0.3, delay: i * 0.1 }}
                                    className="text-2xl sm:text-4xl md:text-5xl text-white font-bold inline-block"
                                >
                                    {char === " " ? <span>&nbsp;</span> : char}
                                </motion.span>
                            ))}
                            <motion.p ref={newRef}
                                initial={{ filter: 'blur(20px)', opacity: 0 }}
                                animate={isInViewTwo ? { filter: 'blur(0px)', opacity: 1 } : {}}
                                transition={{ duration: 1.2 }} className='text-sm md:text-2xl font-medium text-white'>Social real estate platform where users discovery properties</motion.p>
                        </AnimatePresence>



                    </div>
                </div>
                <div className='flex  relative justify-center items-center '>

                    <div className="absolute -bottom-9 bg-neutral-200 rounded-md shadow-xl flex-col px-3 md:px-6 py-1 md:py-3">

                        {/* TOP CATEGORY PILLS */}
                        <div className="mb-2 hidden md:flex absolute left-0 justify-center items-center -top-18 w-full px-3 py-5 rounded-md">
                            <div className="flex items-center justify-center gap-x-2 backdrop-blur-xl bg-neutral-900/80 px-9 mx-auto py-4 rounded-full">

                                {[
                                    { icon: <RiHotelLine />, label: "hotel" },
                                    { icon: <IoIosHome />, label: "home" },
                                    { icon: <MdOutlineAddHomeWork />, label: "guest house" },
                                    { icon: <HiHomeModern />, label: "villas" },
                                    { icon: <BsFillBuildingsFill />, label: "apartments" },
                                ].map((item, i) => (
                                    <Link
                                        key={i}
                                        to="/search"
                                        className="flex items-center text-neutral-200 hover:bg-white hover:text-neutral-900 px-3 py-2 rounded-full transition"
                                    >
                                        <span className="w-6 h-6 mr-1">{item.icon}</span>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* MAIN CONTENT */}
                        <div className="flex md:mt-6 space-x-4 items-center text-neutral-900">

                            {/* LEFT TEXT */}
                            <div className="hidden md:flex md:flex-row gap-4 items-center">
                                <div className="gap-4">
                                    <p className="font-semibold text-md md:text-xl text-neutral-900">
                                        EXPLORE
                                    </p>
                                    <p className="font-semibold text-xs md:text-sm text-neutral-600">
                                        find your ideal property
                                    </p>
                                </div>

                                <img src="/home.webp" alt="homeimage" className="h-18 w-14 opacity-80" />
                            </div>

                            {/* ACTION BLOCKS */}
                            <div className="flex px-6 space-x-4 items-center">

                                {/* FIND PROPERTY */}
                                <Link
                                    to="/search"
                                    className="hidden md:flex flex-col items-center border-l border-neutral-300 p-3"
                                >
                                    <div className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-sm">
                                        <FaHome />
                                        Find Property
                                    </div>
                                    <p className="text-neutral-600 text-sm mt-1 flex items-center gap-1">
                                        view on map <FaMapMarkerAlt />
                                    </p>
                                </Link>

                                {/* SEARCH OPTIONS */}
                                <div className="hidden md:flex flex-col items-center border-l border-neutral-300 p-3">
                                    <Link
                                        to="/profile/aibot"
                                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold border border-neutral-900 text-neutral-900 rounded-full hover:bg-neutral-900 hover:text-white transition"
                                    >
                                        <FaSearch />
                                        use chat bot
                                    </Link>
                                    <p className="text-neutral-600 text-sm mt-1">
                                        advanced search
                                    </p>
                                </div>

                                {/* HOST CTA */}
                                <div className="flex flex-col items-center border-0 md:border-l border-neutral-300 p-2 md:p-3">
                                    {User?.role === "host" ? (
                                        <>
                                            <Link
                                                to="/property/host"
                                                className="flex items-center gap-2 px-4 py-2 text-xs md:text-lg font-semibold bg-neutral-900 text-white rounded-full hover:opacity-90 transition shadow"
                                            >
                                                <FaPlusCircle />
                                                Start Hosting
                                            </Link>
                                            <p className="text-neutral-600 text-sm mt-1 hidden md:flex">
                                                list your property
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/register/host"
                                                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold border border-neutral-900 text-neutral-900 rounded-full hover:bg-neutral-900 hover:text-white transition"
                                            >
                                                <FaPlusCircle />
                                                Be a Host
                                            </Link>
                                            <p className="text-neutral-600 text-sm mt-1 hidden md:flex">
                                                earn from listings
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* SEARCH BUTTON */}
                            <div>
                                <Link
                                    to="/search"
                                    className="flex items-center mr-5 md:mr-0 gap-2 px-3 md:px-5 py-2 rounded-md text-xs md:text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition shadow"
                                >
                                    <FaSearch />
                                    Search
                                </Link>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Header
