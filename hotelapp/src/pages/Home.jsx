import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'
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

// import CardHome from '';
const Cardhome = lazy(() => import("../Components/HomepageCard"))
import Header from '../Common/Header';
import PropertyCard from '../Components/MediaScroll';

import Homenav from '../Common/Homenav';
import { toast } from 'sonner';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Getfullproperyforinfinite } from '../ApiServices/Allapi';
import Loading from '../Components/Loading';
import CardSkeletonGrid from '../Components/Skeleton/Skeleton';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../Common/Errorboundary';


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


  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage, isLoading
  } = useInfiniteQuery({
    queryKey: ["propertydata"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await Getfullproperyforinfinite(pageParam);
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {

      return lastPage?.hasMore ? allPages.length + 1 : undefined;
    },
  });

  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);


  useEffect(() => {

    Setafterfiltered(products?.filter((data) => data.isActive == "approved" && !data.isAvailable == false))
  }, [products])
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])


  return (
    <>







      <Header />



      <div className="px-4 pt-20 md:px-20">

        <ErrorBoundary fallback={<ErrorFallback />} onReset={() => { window.location.reload }}>
          <Suspense fallback={<CardSkeletonGrid />}>
            {!data || data == null ? <CardSkeletonGrid /> : <><div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {AfterFiltered?.slice(0, 4).map((data, id) => (




                <AnimatePresence key={id}>
                  <Cardhome property={data} grid={1} id={id} home={"home"} />
                </AnimatePresence>



              ))}
            </div>
            </>}

          </Suspense>
        </ErrorBoundary>



      </div>
      <div className="pt-20 px-4 md:px-10 flex pb-10 w-full">


        <div className="hidden md:block md:w-1/6">
          {
            User && <div className="sticky top-30">
              <Homenav />
            </div>
          }
        </div>


        <div className="mx-auto w-full md:w-4/6 min-h-screen">
          {!data || data == null ? <div className='flex gap-2 items-center'><p className='font-bold text-md text-blue-500 animate-pulse'>Server is slow</p><Loading /></div> :
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence>
                {data?.pages
                  ?.flatMap(page => page?.prop)
                  .map((property, key) => (
                    <PropertyCard
                      key={property._id}
                      property={property}
                    />
                  ))}
                {hasNextPage && (
                  <div ref={loadMoreRef} className="h-10" />
                )}

                {isFetchingNextPage && <p>Loading more…</p>}

              </AnimatePresence>
            </div>

          }
        </div>

      </div>







      <div className='px-5 sm:px-7 md:px-14 lg:px-20'> {/*padding main*/}

        {/* third */}





        {/* s7 */}



        {/* s5 */}
        {/* sec7 */}
        <div className='mt-20'>

          <motion.div className='grid grid-cols-1 sm:grid-cols-3'>
            <motion.div initial={{ opacity: 0, filter: "blur(10px)" }} whileInView={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.7, ease: easeInOut }} className='p-4 flex flex-col items-center justify-center space-y-2'>
              <div className='p-4 bg-blue-200 rounded-md'>
                <img src="/images/shield-check.webp" alt="priceicon" className='w-10 h-10 ' />
              </div>
              <p className='font-semibold text-xl'>No hidden fees</p>
              <p className='text-sm text-center text-gray-700 '>Transparent pricing with no hidden fees.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, filter: "blur(10px)" }} whileInView={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.7, ease: easeInOut }} className='p-4 flex flex-col items-center justify-center space-y-2'>
              <div className='p-4 bg-blue-200 rounded-md'>
                <img src="/images/file-list-edit.avif" alt="editicon" className='w-10 h-10 ' />
              </div>
              <p className='font-semibold text-xl'>Instant booking</p>
              <p className='text-sm text-center text-gray-700 '>Get confirm right after you reserve.</p>
            </motion.div> <motion.div initial={{ opacity: 0, filter: "blur(10px)" }} whileInView={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.7, ease: easeInOut }} className='p-4 flex flex-col items-center  space-y-2'>
              <div className='p-4 bg-blue-200 rounded-md'>
                <img src="/images/dollar-circle.avif" alt="dollaricon" className='w-10 h-10 ' />
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
