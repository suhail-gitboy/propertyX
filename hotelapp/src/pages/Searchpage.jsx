import React, { useEffect, useState, useRef } from 'react'
import Nav from '../Common/Nav'
import Sidebar from '../Components/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import Cardhotel from '../Components/Cardhotel'
import SkeletonCard from '../Components/Skeleton'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowLeft } from 'react-icons/fa'
import { Link, useOutletContext } from 'react-router'
import { CiHome } from "react-icons/ci";
import { BsFastForward } from "react-icons/bs";
import { BsSkipBackward } from "react-icons/bs";
import { Sortingfunc } from '../redux/ProductSlice'
import ScrollToTop from '../Components/Scrollcomp'
import { ContextDatas } from '../Common/ContextWrapped'
import { CiGrid41 } from "react-icons/ci";
import { CiGrid2H } from "react-icons/ci";
import { LuSettings2 } from "react-icons/lu";
import Filtermodal from '../Components/modals/Filtermodal'
const Searchpage = () => {


  const { products, loading } = useSelector((state) => state.Product)
  console.log("filtered", products);

  const [Value, setValue] = useState([599, 100000])
  const [Page, Setpage] = useState(1)

  // filter
  const FilteredSlider = products?.filter((data) => {
    if (data.isActive !== "approved") return false
    if (data.listingType == "rent") {
      return data.price >= Value[0] && data.price <= Value[1]
    }

    return true
  });

  const Productperpage = 20
  const Totalpage = Math?.ceil(FilteredSlider?.length / Productperpage)
  const CurrpageLAstindex = Page * Productperpage
  const CurrpageFirstindex = CurrpageLAstindex - Productperpage

  //pagination
  const AfterSlice = FilteredSlider?.slice(CurrpageFirstindex, CurrpageLAstindex)


  const [Skeleton, Setskeleton] = useState(false)

  const Dispatch = useDispatch()
  const HandleSelectChange = (value) => {


    Dispatch(Sortingfunc(value))


  }



  const [fixed, setFixed] = useState(true);
  useEffect(() => {

    Setskeleton(true)
    setTimeout(() => {
      Setskeleton(false)
    }, 1000);



  }, [])


  const SkeletonCount = products?.length > 0 ? products?.length : 6;

  const Forward = () => {
    if (Page !== Totalpage) {
      Setpage(Page + 1)
    }
  }
  const Backword = () => {
    if (Page !== 1) {
      Setpage(Page - 1)
    }
  }

  const [grid, Setgrid] = useState(1)
  const [filtermodal, Setfiltermodal] = useState(false)


  return (
    <motion.div initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, damping: 5 }}
      exit={{ y: 60, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 10 }} >
      <ScrollToTop />
      {filtermodal && <Filtermodal Setfilter={Setfiltermodal} Value={Value} Setpage={Setpage} setValue={setValue} Skeleton={Skeleton} Setskeleton={Setskeleton} />}
      <Nav search={"search"} Setpage={Setpage} homesearch={"yes"} />
      <div className='px-4 sm:px-5 md:px-6 lg:px-8 mt-10'>
        <div className=' flex'>
          <div className='hidden md:block -translate-x-full md:translate-x-0 md:mr-4 absolute md:static left-0  md:w-1/4 lg:w-2/5'>
            <Sidebar Hoteldata={AfterSlice} />
          </div>
          <div className='w-full md:w-3/4 lg:w-3/5 '>
            <div className='flex justify-between items-center'>
              <h1 className="text-xs md:text-2xl lg:text-3xl  font-semibold mb-4">Explore 200+ Properties in India</h1>
              {/* left side */}
              <div className='flex items-center justify-center space-x-4'>
                <div className='flex items-center px-3 py-1 rounded-full border text-sm md:text-md border-gray-500/20' onClick={() => Setfiltermodal(true)}><LuSettings2 className='pr-2 text-xl md:text-2xl' />filters</div>
                <div className='hidden md:flex p-0.5 border border-gray-700/10 rounded-full  items-center space-x-2'>
                  <button onClick={() => Setgrid(1)} className={` ${grid === 1 ? "border-black/70 text-black" : "border-gray-300/70  text-gray-300"} rounded-full p-0.5 border `}><CiGrid2H className=' text-4xl p-0.5' /></button>
                  <button onClick={() => Setgrid(3)} className={` ${grid === 3 ? "border-black/70 text-black" : "border-gray-300/70  text-gray-300"} rounded-full p-0.5 border `}><CiGrid41 className='text-4xl 
          p-0.5 '/></button>

                </div>
              </div>
            </div>
            <div className=' px-1 md:px-4 rounded-xl border w-fit border-black/10'>
              <select name="" onChange={(e) => HandleSelectChange(e.target.value)} id="" className='p-1 text-xs md:text-md md:p-3 outline-0 '>
                <option selected>sort by:low to high</option>
                <option value="lowhigh">low to high</option>
                <option value="highlow">high to low</option>
                <option value="toprate">high rating</option>
                <option value="lowrate">low rating</option>
              </select>
            </div>

            {/* main */}
            <div className={`mt-10  overflow-y-auto md:grid w-full  ${grid == 1 ? "grid-cols-1 " : "md:grid-cols-2 lg:grid-cols-3 gap-4"}  space-y-3 h-[120vh] mb-20 no-scrollbar`}>
              {
                Skeleton ? (<div>{[...Array(SkeletonCount)]?.map((data, id) => (
                  <SkeletonCard key={id} />
                ))

                }</div>) : (
                  AfterSlice?.length > 0 ? AfterSlice?.map((data, id) => (
                    <AnimatePresence>

                      <Cardhotel data={data} grid={grid} id={id} />



                    </AnimatePresence>
                  )) : <>no property found</>

                )
              }
            </div>

            <div className='flex justify-end'   >
              <div className={` 
          bottom-5 fixed left-5"
       w-fit p-4 flex justify-end space-x-2.5 -3 bg-blue-500/70 rounded-md text-white`} >
                <button onClick={Backword}><BsSkipBackward /></button>
                <h1 className=' text-xl font-semibold'>page {Page} of {Totalpage}</h1>
                <button onClick={Forward}><BsFastForward /></button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  )
}

export default Searchpage
