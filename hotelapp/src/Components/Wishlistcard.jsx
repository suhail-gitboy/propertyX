import React from 'react'
import Button from '../Common/Button'


import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { useAddtowishlist } from '../ApiServices/tanstack/PropertyMethod'
import { ContextDatas } from '../Common/ContextWrapped'


const Wishlistcard = ({ data, key }) => {
  const { token } = ContextDatas()
  const { mutate: Addid } = useAddtowishlist(token)

  const Addtowishlist = (id) => {

    if (token) {
      Addid(id)
    } else {
      toast.warning("login to start exploring")
    }
  }
  // const Dispatch = useDispatch()
  // const deleteFunc = async (id) => {

  //   const response = await GetforDelete(id)
  //   Dispatch(GetWishlist())


  // }
  return (
    <motion.div
      initial={{ x: -20, opacity: 0, scale: 0.9 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: -20, opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }} className='rounded-md p-3' key={key}>
      <img src={data?.property?.images[0]?.url} alt="" className='w-full h-60 object-cover rounded-md' />
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-xl font-semibold mb-2'>{data?.property?.title}</p>
          <p className='font-light text-gray-700 text-md overflow-hidden'>{data?.property?.location?.address}</p>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <Link to={`/roomdetail/${data?.property?._id}`} className="text-blue-600 underline-offset-1 py-2">view</Link>
          <Button onClick={() => Addtowishlist(data?.property?._id)} text={"remove"} />
        </div>
      </div>
    </motion.div>
  )
}

export default Wishlistcard
