import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { FaBuilding, FaTelegram } from 'react-icons/fa'
import { FaHotel, FaLightbulb } from 'react-icons/fa6'

const Alassitance = () => {

  const [message, Setmessage] = useState("")
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className='m-5 border border-gray-700/20 p-5'>

      <h1 className='py-3 text-xl md:text-3xl text-blue-600 font-semibold'>hi there!</h1>


      <p className='p-3 w-3/5 md:w-2/4 rounded-lg bg-gray-100 text-black text-xs py-3'>welcome to mytrip i'm your virtual assistant how can i assist you today?please choose one these questions to interact with me</p>
      <div className='grid grid-cols-2 gap-3 mt-10'>
        <div className='p-3 border border-gray-700/20 rounded-md' onClick={() => Setmessage("can you recommend some hotels in kerala?")}>
          <h1 className='text-blue-600 flex items-center space-x-1'><FaHotel />hotels</h1>
          <p className='text-sm text-gray-700 ' >can you recommend some hotels in kerala?</p>
        </div>
        <div className='p-3 border border-gray-700/20 rounded-md' onClick={() => Setmessage("are there any appartment near downtown kochi?")}>
          <h1 className='text-blue-600 flex items-center space-x-1' ><FaBuilding />Appartment&Homes</h1>
          <p className='text-sm text-gray-700 ' >are there any appartment near downtown kochi?
          </p>
        </div>
        <div className='p-3 border border-gray-700/20 rounded-md' onClick={() => Setmessage("how to prevent motion sickness during travelinng?")}>
          <h1 className='text-rose-600 flex items-center space-x-1'><FaLightbulb />Inspiration</h1>
          <p className='text-sm text-gray-700 ' >how to prevent motion sickness during travelinng?
          </p>
        </div>
        <div className='p-3 border border-gray-700/20 rounded-md' onClick={() => Setmessage("what activities can i enjoy in kerala?")}>
          <h1 className='text-violet-600 flex items-center space-x-1'><FaBuilding />Attractions</h1>
          <p className='text-sm text-gray-700 '>what activities can i enjoy in kerala?
          </p>
        </div>

      </div>


      <div className='flex w-full justify-end mt-3 py-4'>
        {
          message.length > 0 && <><div className="chat chat-end">
            <div className="chat-bubble">{message}</div>
          </div>
          </>

        }

      </div>
      <div className='mt-5 px-4 flex justify-between items-center py-2 rounded-full w-full border border-blue-600 shadow-2xs shadow-blue-600'>
        <input type="text" placeholder='can you recomment the best hotels in kerala ' className='w-full focus:outline-0 focus:ring-0 text-gray-600' />
        <FaTelegram className='text-blue-600 text-3xl' />
      </div>
    </motion.div>
  )
}

export default Alassitance
