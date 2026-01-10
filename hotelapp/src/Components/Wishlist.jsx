import React, { useContext, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router'
import Wishlistcard from './Wishlistcard'


import { AnimatePresence, motion } from 'framer-motion'
import { useGetallwishlist } from '../ApiServices/tanstack/PropertyMethod'
import { ContextDatas } from '../Common/ContextWrapped'

const Wishlist = () => {
  const { token } = ContextDatas()
  const { data } = useGetallwishlist(token)



  return (
    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className='p-6 px-5 bg-gray-50'>
      <div className='flex justify-between mb-10'>
        <div>
          <h1 className='text-2xl font-semibold mt-1'>Wishlists</h1>
          <p className='text-sm font-light text-gray-600'>Explore and save your favorite Destinations here</p>
        </div>
        <Link to="/search" className="px-2 md:py-2 border text-xs border-black/5 roounded-md flex items-center space-x-1"><FaPlus /> Add more</Link>

      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-160 md:h-[50vw] overflow-y-auto no-scrollbar gap-3'>
        {
          data?.length > 0 ? data?.map((data, id) => (
            <AnimatePresence>
              <Wishlistcard data={data} key={id} />
            </AnimatePresence>

          )) : <p className='text-center py-4 text-2xl '> you have no wishlist</p>
        }

      </div>
    </motion.div>
  )
}

export default Wishlist
