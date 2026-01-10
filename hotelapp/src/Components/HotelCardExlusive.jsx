import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router'

const HotelCardExlusive = ({ data }) => {

  return (
    <motion.div
      className='mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3'>
      {
        data.map((data, inf) => (
          <Link to="/search">
            <motion.div initial={{ opacity: 0.5, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              key={inf} className='relative  hover:scale-102 transition-transform duration-300'>
              <img src={data.img} className='w-full h-50 md:h-70 rounded-lg' alt="" />
              <div className='text-white absolute bottom-2 left-2'>
                <h1 className='md:text-xl font-bold'>{data.location}</h1>
                <p className='text-md font-md'>From <span className='text-md text-yellow-300'>{data.starting}</span></p>
                <p className='text-xs hidden md:flex text-gray-200 font-extralight'>{data.quotes}</p>
              </div>
            </motion.div></Link>
        ))
      }

    </motion.div>

  )
}

export default HotelCardExlusive
