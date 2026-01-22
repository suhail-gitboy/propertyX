import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { FaBuilding, FaTelegram } from 'react-icons/fa'
import { FaHotel, FaLightbulb } from 'react-icons/fa6'
import { useNewsuggestions } from '../../ApiServices/tanstack/PropertyMethod'
import { LoaderFive, LoaderOne, LoaderThree, LoaderTwo } from '../../Utils/UILIBRARY/Loader'
import { Link } from 'react-router'
const Alassitance = () => {


  const [input, Setinput] = useState("")
  const [messages, Setmessages] = useState([])
  const { mutate: send, isPending, data } = useNewsuggestions()
  const mssgeRef = useRef()

  useEffect(() => {

    if (data?.summary == undefined || data?.results == undefined) return


    Setmessages([...messages, { ai: true, summary: data?.summary, result: data?.results }])
  }, [data])
  const Suggest = (value) => {
    Setmessages([...messages, { ai: false, txt: value }])
    send({ query: value })

  }

  useEffect(() => {
    mssgeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isPending]);

  const cleanAIText = (text = "") => {
    return text
      // remove markdown bullets & stars
      .replace(/[*#`~>-]/g, "")

      // remove extra quotes
      .replace(/["“”]/g, "")

      // normalize multiple blank lines
      .replace(/\n{3,}/g, "\n\n")

      // trim whitespace
      .trim();
  };
  console.log(messages);



  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className='m-5 border border-gray-700/20 p-5'>

      <h1 className='py-3 text-xl md:text-3xl text-blue-600 font-semibold'>hi there!</h1>


      <p className='p-3 w-3/5 md:w-2/4 rounded-lg bg-gray-100 text-black text-xs py-3'>welcome to <span className='font-bold text-xl bg-linear-to-br from-blue-600  to-yellow-300  bg-clip-text text-transparent '>propertyX</span> i'm your virtual assistant how can i assist you today?please choose one these questions to interact with me</p>
      {
        !messages.length > 0 && <div className='grid grid-cols-2 gap-3 mt-10'>
          <div className='p-3 border border-gray-700/20 rounded-md' onClick={() => Suggest("can you recommend some hotels in thrissur?")}>
            <h1 className='text-blue-600 flex items-center space-x-1'><FaHotel />hotels</h1>
            <p className='text-sm text-gray-700 ' >can you recommend some hotels in kerala?</p>
          </div>
          <div className='p-3 border border-gray-700/20 rounded-md' onClick={() => Suggest("are there any appartment near downtown kochi?")}>
            <h1 className='text-blue-600 flex items-center space-x-1' ><FaBuilding />Appartment&Homes</h1>
            <p className='text-sm text-gray-700 ' >are there any appartment near downtown kochi?
            </p>
          </div>
          <div className='p-3 border border-gray-700/20 rounded-md' onClick={() => Suggest("how to prevent motion sickness during travelinng?")}>
            <h1 className='text-rose-600 flex items-center space-x-1'><FaLightbulb />Luxury</h1>
            <p className='text-sm text-gray-700 ' >find luxury hotels?
            </p>
          </div>
          <div className='p-3 border border-gray-700/20 rounded-md' onClick={() => Suggest("find me luxurios hotels?")}>
            <h1 className='text-violet-600 flex items-center space-x-1'><FaBuilding />activities</h1>
            <p className='text-sm text-gray-700 '>what activities can i enjoy in kerala?
            </p>
          </div>

        </div>
      }


      <div className="w-full h-95 overflow-y-auto px-4 py-3 mt-3">
        {messages.length > 0 && (
          <div className="flex flex-col gap-3">
            {messages.map((data, index) => (
              <div
                key={index}
                className={`flex w-full ${data.ai ? "justify-start" : "justify-end"
                  }`}
              >

                {data.ai ? <div className='p-3 space-y-2 bg-blue-900 max-w-[75%]'>
                  <p className='  px-3 py-2  text-white text-xs leading-relaxed tracking-wide rounded-xl whitespace-pre-line'>
                    {cleanAIText(data.summary)}
                  </p>
                  {
                    data?.result && <div className="flex flex-col gap-3 mt-4">
                      {data?.result?.map((item) => (
                        <Link
                          key={item.property_id}
                          to={`/roomdetail/${item.property_id}`}
                          className="group"
                        >
                          <div className="flex gap-4 p-4 rounded-xl hover:bg-gray-700 transition shadow-md">

                            {/* Image */}
                            <div className="w-24 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-600">
                              {item.image ? (
                                <img
                                  src={item.image?.url}
                                  alt={item.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-300">
                                  No Image
                                </div>
                              )}
                            </div>

                            {/* Text */}
                            <div className="flex flex-col justify-center">
                              <h3 className="text-white font-medium text-sm">
                                {item.title}
                              </h3>
                              <p className="text-gray-400 text-xs mt-1">
                                📍 {item.location}
                              </p>
                            </div>

                          </div>
                        </Link>
                      ))}
                    </div>
                  }


                </div> : <p className='text-xs p-3 text-white bg-gray-700 rounded-xl '> {data.txt}</p>}

              </div>
            ))}

            {/* Loader */}
            {isPending && (
              <div className="flex justify-start">
                <LoaderOne />
              </div>
            )}
            <div ref={mssgeRef} />
          </div>
        )}
      </div>

      <div className='mt-5 px-4 flex justify-between items-center py-2 rounded-full w-full border border-blue-600 shadow-2xs shadow-blue-600'>
        <input type="text" value={input} onChange={(e) => Setinput(e.target.value)} placeholder='can you recomment the best hotels in kerala ' className='w-full focus:outline-0 focus:ring-0 text-gray-600' />
        <FaTelegram onClick={() => { Setmessages([...messages, { ai: false, txt: input }]); send({ query: input }), Setinput("") }} className={`${input.trim() ? "text-blue-600 text-3xl" : "text-gray-300"}`} />
      </div>
    </motion.div>
  )
}

export default Alassitance
