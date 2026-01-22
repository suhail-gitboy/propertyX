import React, { useState, useEffect } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import Rating from '@mui/material/Rating';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TbAirConditioning } from "react-icons/tb";
import Slider from '@mui/material/Slider';
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { clearfilter, filterbytype, Filterbysellorsale } from '../../redux/ProductSlice';

const Filtermodal = ({ Value, setValue, Setpage, Setskeleton, Setfilter }) => {
  const dispatch = useDispatch()
  const [arrowfirst, Setarrowfirst] = useState(true)

  const [arrowSecond, SetarrowSecond] = useState(true)
  const [arrowthird, Setarrowthird] = useState(true)
  const [arrowFourth, SetarrowFourth] = useState(true)

  const [AmenitiesCheck, SetamenitiesCheck] = useState([])
  const FuncAmenities = (value) => {
    SetamenitiesCheck(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item != value)
      } else {
        return [...prev, value]
      }
    })
  }

  const HandleOnchange = (event, newValue) => {
    setValue(newValue)
  }


  const { products } = useSelector((state) => state.Product)
  useEffect(() => {
    Setpage(1)
    Setskeleton(true)
    setTimeout(() => {
      Setskeleton(false)
    }, 1500);

  }, [])

  const [Type, Settypehome] = useState("all")
  return (
    <div className='fixed inset-0 bg-black/40 min-h-screen z-50 flex justify-center items-center'>
      <motion.div initial={{ opacity: 0, y: 500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        exit={{ opacity: 0.3 }} className='md:w-2/4 md:static absolute bottom-0  w-full mx-5 md:mx-0 px-5 py-5 rounded-xl shadow-2xl h-3/4 bg-gray-100'>
        <div className='flex justify-end ' onClick={() => Setfilter(false)}>
          <IoIosClose className='text-xl ' />

        </div>
        <div className='border-b border-gray-700/10'>
          <h1 className='text-center py-3 '>filter</h1>
        </div>

        {/* filter stuffs here */}
        <div className='border-r border-l w-full border-gray-700/10 flex flex-col  h-90  overflow-auto overflow-y-scroll'>
          <div className=' py-3 border  border-black/10 rounded-lg mb-20 bg-gray-100 w-full'>
            <div onClick={() => dispatch(clearfilter())} className='flex justify-between border-b border-gray-600/10 px-3 py-3'>
              <p className='text-gray-600 text-lg font-semibold'>filter:</p>
              <p className='text-gray-600 text-md font-semibold'>clear</p>
            </div>
            {/* sect 1 */}
            <div className='flex flex-col items-center  border-b border-gray-600/10 px-3 py-3'>
              <div onClick={() => Setarrowfirst(!arrowfirst)} className='flex items-center w-full justify-between '>
                <h3 className='text-md font-semibold '>listing type</h3>
                {arrowfirst ? <button> <IoIosArrowDown /></button> : <button> <IoIosArrowUp /></button>}
              </div>
              <div className={`flex mt-3 ${arrowfirst ? "" : "hidden "} justify-center items-center transform transition-all duration-200 space-x-2 p-3 md:w-3/4 border border-gray-600/10 rounded-xl`}>
                <h5 onClick={() => { dispatch(Filterbysellorsale("rent")); Settypehome("rent") }} className={`${Type == "rent" ? "border-black border-1 text-xs md:text-md px-4 py-2  rounded-md" : "text-xs md:text-md px-4 py-2 flex flex-col items-center justify-center gap-2  text-nowrap rounded-md"}`} > <img src='/images/residential.png' className='w-12 h-12' /> for rent</h5>
                <h5 onClick={() => { dispatch(Filterbysellorsale("sell")); Settypehome("sale") }} className={`${Type == "sale" ? "border-black border-1 text-xs md:text-md px-4 py-2  rounded-md" : "text-xs md:text-md px-4 py-2  flex flex-col gap-2 rounded-md"}`} ><img src='/interior-design.png' className='w-14 h-14' />for sale</h5>

              </div>

            </div>
            <div className='flex flex-col items-center  border-b border-gray-600/10 px-3 py-3'>
              <div onClick={() => Setarrowfirst(!arrowfirst)} className='flex items-center w-full justify-between '>
                <h3 className='text-md font-semibold '>Type of place</h3>
                {arrowfirst ? <button> <IoIosArrowDown /></button> : <button> <IoIosArrowUp /></button>}
              </div>
              <div className={`flex mt-3 ${arrowfirst ? "" : "hidden "} justify-center items-center transform transition-all duration-200 space-x-2 p-3 md:w-3/4 border border-gray-600/10 rounded-xl`}>
                <h5 className={`${Type == "all" ? "border-black border-1 text-xs md:text-md px-4 py-2  rounded-md" : "text-xs md:text-md px-4 py-2 flex flex-col items-center justify-center gap-2  text-nowrap rounded-md"}`} onClick={() => { dispatch(filterbytype("apartment")); Settypehome("all") }}> <img src='/images/residential.png' className='w-12 h-12' />  apartment</h5>
                <h5 className={`${Type == "room" ? "border-black border-1 text-xs md:text-md px-4 py-2  rounded-md" : "text-xs md:text-md px-4 py-2  flex flex-col gap-2 rounded-md"}`} onClick={() => { dispatch(filterbytype("room")), Settypehome("room") }}><img src='/interior-design.png' className='w-14 h-14' />Room</h5>
                <h5 className={`${Type == "flat" ? "border-black border-1 text-xs md:text-md px-4 py-2  rounded-md" : "text-xs md:text-md px-4 py-2  flex flex-col gap-2 rounded-md"}`} onClick={() => { Settypehome("flat"); dispatch(filterbytype("villa")) }}><img src='/images/flats.png' className='w-14 h-14' /> villa</h5>
                <h5 className={`${Type == "house" ? "border-black border-1 text-xs md:text-md px-4 py-2  rounded-md" : "text-xs md:text-md px-4 py-2  rounded-md flex flex-col gap-2"}`} onClick={() => { Settypehome("house"); dispatch(filterbytype("house")) }}><img src='/house.png' className='w-14 h-14' /> house</h5>
              </div>

            </div>

            {/* sec2 */}
            <div className='flex mt-5 flex-col items-center  border-b border-gray-600/10 px-3 py-3'>
              <div className='flex flex-col justify-start w-full '>
                <h3 className='text-md font-semibold '>Price Range</h3>
                <p className='text-xs mt-1 font-light'>Nightly prices including fees and taxes</p>

              </div>
              <div className="w-full  px-3">
                <Slider aria-label="Volume" min={499} value={Value} max={10000} disableSwap onChange={(e, Value) => setValue(Value)} valueLabelDisplay="auto"
                />
                <p className='text-sm text-gray-500'>{Value[0]} rs</p>
                <div>

                </div>
                <div className='flex py-3 justify-between items-center'>
                  <div>
                    <p className='text-xs lg:text-sm mb-2 text-gray-600'>Minimum</p>
                    <h1 className='p-1 lg:p-2 rounded-xl border border-gray-500/15 text-black text-xs lg:text-md'>rs {Value[0]}+</h1>
                  </div>
                  <div>
                    <p className='text-xs lg:text-sm mb-2 text-gray-600'>Maximum</p>
                    <h1 className='p-1 lg:p-2 rounded-xl border border-gray-600/15 text-black text-xs lg:text-md'>rs {Value[1]}+</h1>
                  </div>


                </div>

              </div>

            </div>
            {/* sec 3 */}
            <div className='flex flex-col   border-b border-gray-600/10 px-3 py-3'>
              <div onClick={() => SetarrowSecond(!arrowSecond)} className='flex items-center w-full justify-between '>
                <h3 className='text-md font-semibold '>Rooms and Beds</h3>
                {arrowSecond ? <button> <IoIosArrowUp /></button> : <button> <IoIosArrowDown /></button>}
              </div>

              <div className={`${arrowSecond ? "" : "hidden"}`}>
                <div className={`flex items-center w-full justify-between mt-3 `}>
                  <p className='text-gray-700 text-md'>Bedrooms</p>
                  <div className='flex items-center space-x-1'>
                    <p className='text-sm p-2 rounded-full border-gray-500/15'>-</p>
                    <p className='text-sm'>1</p>
                    <p className='text-sm p-2 rounded-full border-gray-500/15'>+</p>
                  </div>
                </div>
                <div className='flex items-center w-full justify-between mt-3'>
                  <p className='text-gray-700 text-md'>Bed</p>
                  <div className='flex items-center space-x-1'>
                    <p className='text-sm p-2 rounded-full border-gray-500/15'>-</p>
                    <p className='text-sm'>1</p>
                    <p className='text-sm p-2 rounded-full border-gray-500/15'>+</p>
                  </div>
                </div>
                <div className='flex items-center w-full justify-between mt-3'>
                  <p className='text-gray-700 text-md'>Bathrooms</p>
                  <div className='flex items-center space-x-1'>
                    <p className='text-sm p-2 rounded-full border-gray-500/15'>-</p>
                    <p className='text-sm'>1</p>
                    <p className='text-sm p-2 rounded-full border-gray-500/15'>+</p>
                  </div>
                </div>
              </div>


            </div>
            {/* sec 4 */}
            <div className='mt-3 px-3  py-3'>
              <div onClick={() => Setarrowthird(!arrowthird)} className='flex items-center w-full justify-between '>
                <h1 className='text-md font-semibold'>Guest Reviews Score</h1>
                {arrowthird ? <button> <IoIosArrowUp /></button> : <button> <IoIosArrowDown /></button>}
              </div>
              <div className={`mt-3 space-y-3 ${arrowthird ? "" : "hidden"}`}>
                <div className='flex  items-center space-x-1'>
                  <input type="checkbox" className='p-2 bg-black text-white rounded-md' />
                  <Rating name="read-only" sx={{ fontSize: "1rem" }} value={"" || 5} readOnly />
                  <p className='font-semibold text-sm'>5-Star</p>

                </div>

                <div className='flex items-center space-x-1'>
                  <input type="checkbox" className='p-2 bg-black text-white rounded-md' />
                  <Rating name="read-only" sx={{ fontSize: "1rem" }} value={"" || 4} readOnly />
                  <p className='font-semibold text-sm'>4-Star</p>

                </div>
                <div className='flex items-center space-x-1'>
                  <input type="checkbox" className='p-2 bg-black text-white rounded-md' />
                  <Rating name="read-only" sx={{ fontSize: "1rem" }} value={"" || 3} readOnly />
                  <p className='font-semibold text-sm'>3-Star</p>

                </div>
                <div className='flex items-center space-x-1'>
                  <input type="checkbox" className='p-2 bg-black text-white rounded-md' />
                  <Rating name="read-only" sx={{ fontSize: "1rem" }} value={"" || 2} readOnly />
                  <p className='font-semibold text-sm'>2-Star</p>

                </div>
              </div>


            </div>
            {/* sec5 */}
            <div className='mt-3 px-3  py-3'>
              <div onClick={() => SetarrowFourth(!arrowFourth)} className='flex items-center w-full justify-between '>
                <h1 className='text-xl font-semibold'>Amenities</h1>
                {arrowFourth ? <button> <IoIosArrowUp /></button> : <button> <IoIosArrowDown /></button>}
              </div>
              <div className={`mt-3 space-y-2 ${arrowFourth ? "" : "hidden"}`}>
                <p onClick={() => FuncAmenities("ac")} className={`${AmenitiesCheck.includes("ac") ? "border border-black bg-gray-600 text-white" : ""} flex items-center px-4 py-2 text-md rounded-full border w-fit border-gray-500/15`}> <TbAirConditioning className=" mr-2" />air conditioner</p>
                <div className='flex space-x-1'>
                  <p onClick={() => FuncAmenities("wifi")} className={`flex items-center px-3  ${AmenitiesCheck.includes("wifi") ? "border border-black bg-gray-600 text-white" : ""} py-2 text-md rounded-full border text-black w-fit border-gray-500/15`}> <TbAirConditioning className=' mr-2' />Wifi</p>
                  <p onClick={() => FuncAmenities("tv")} className={`flex items-center  ${AmenitiesCheck.includes("tv") ? "border border-black bg-gray-600 text-white" : ""} px-3 py-2 text-md rounded-full text-black border w-fit border-gray-500/15`}> <TbAirConditioning className=' mr-2' />TV</p>
                </div>
                <div>
                  <p onClick={() => FuncAmenities("breakfast")} className={`flex  ${AmenitiesCheck.includes("breakfast") ? "border border-black bg-gray-600 text-white" : ""} items-center text-black px-4 py-2 text-md rounded-full border w-fit border-gray-500/15`}> <TbAirConditioning className=' mr-2' />Break fast included</p>


                </div>
                <div className='flex space-x-1'>
                  <p onClick={() => FuncAmenities("pool")} className={`flex ${AmenitiesCheck.includes("pool") ? "border border-black bg-gray-600 text-white" : ""} items-center px-3 py-2 text-md text-black rounded-full border w-fit border-gray-500/15`}> <TbAirConditioning className=' mr-2' />Pool</p>
                  <p onClick={() => FuncAmenities("gym")} className={`flex  ${AmenitiesCheck.includes("gym") ? "border border-black bg-gray-600 text-white" : ""} items-center px-3 py-2 text-md text-black rounded-full border w-fit border-gray-500/15`}> <TbAirConditioning className=' mr-2' />Gym</p>
                </div>

              </div>
            </div>
          </div>

        </div>

      </motion.div>

    </div>
  )
}

export default Filtermodal
