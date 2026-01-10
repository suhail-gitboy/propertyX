import React, { useEffect, useState } from 'react'
import { GetBookingData } from '../redux/BookingSlice'
import { useDispatch, useSelector } from 'react-redux'
import { motion, warnOnce } from 'framer-motion'
import { GetDeleteBoooking } from '../ApiServices/crud/Deleteapi'
import { Link } from 'react-router'
import Formupdate from './modals/Formupdate'

import { Update } from '../ApiServices/crud/Update'
import { ContextDatas } from '../Common/ContextWrapped'
import Swal from 'sweetalert2'
import BookedRoomCard from './Bookingcard'
import { useGetbookings } from '../ApiServices/tanstack/PropertyMethod'
const Bookinglist = () => {
  const sampleImage = '/mnt/data/IMG_7246ACDF-FB44-45E0-A583-ABD058AA4BD8.jpeg'
  const [Modal, Setmodal] = useState(false)
  const [Id, Setid] = useState(null)
  const Dispatch = useDispatch()
  const { Booking, Setbooking } = ContextDatas()
  useEffect(() => {
    Dispatch(GetBookingData())
  }, [])






  const [dataA, Setdata] = useState()
  console.log(dataA);

  const Updatedata = async () => {
    const Updated = {
      ...dataA,
      Foradd: {
        ...dataA.Foradd,
        checkin: Booking.checkin,
        checkout: Booking.checkout,
        adult: Booking.adult,
        total: Booking.total,
        priceTotal: Booking.priceTotal

      }
    }
    Setdata(Updated)
    const Respnse = await Update(Updated)
    console.log(Respnse);
    Swal.fire({
      title: "updated ",
      text: `changed your booking details`,
      icon: "success"
    });



    Setmodal(false)
    Dispatch(GetBookingData())

  }
  const { token } = ContextDatas()
  const { data } = useGetbookings(token)
  console.log(data);

  return (
    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className='p-4 bg-gray-50'>

      {Modal && <Formupdate Setmodal={Setmodal} Updatedata={Updatedata} />}
      {/* map */}


      <section className="max-w-4xl mx-auto p-4 sm:p-6">
        <header className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Active Reservations</h2>
          <p className="text-sm text-gray-500">View and manage your current bookings here</p>
        </header>


        <div className="h-190 overflow-auto">
          {data?.length <= 0 ? <div className="flex justify-center items-center mt-10">
            <div>
              <img src="./../../public/images/empty.png" className='w-40 h-40' alt="" />
              <p className='text-lg text-gray-400'>you haven't booked any stays yet </p>
            </div>
          </div> : (
            <div className='p-4 grid grid-cols-1 md:grid-cols-2 gap-5  '>
              {data?.map(booking => (
                <BookedRoomCard key={booking.id} booking={booking} />
              ))}
            </div>

          )}
        </div>

      </section>



    </motion.div>
  )
}

export default Bookinglist
