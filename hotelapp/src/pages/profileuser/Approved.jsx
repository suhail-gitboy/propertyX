import React from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router'

const Approved = () => {

  const Approveddata = []
  //  hotel.filter((data) => data.status === 'approved')

  return (
    <div className='p-5 md:p-7'>
      <div className='mt-4 text-xs text-gray-500'>
        Note: Listings are <span className='font-semibold text-green-500'>successfully approved</span> by the admin. Your properties are now live and available for rent.
      </div>

      {
        Approveddata.length == 0 &&
        <div className=' flex justify-center h-screen items-center bg-blue-50'>
          <div className=' bg-linear-to-r from-blue-600 via-blue-500 to-blue-900 rounded-md text-white p-8 rounded-md'>
            <p className='text-center py-3'>you havent published your property yet</p>
            <div className='flex justify-center'>
              <Link to="/selling" className="mt-3 px-3 py-2 rounded-md text-blue-600 bg-white flex items-center  ">publish<FaHome className='ml-2' /> </Link>
            </div>


          </div>
        </div>

      }

      {Approveddata.length > 0 && (
        Approveddata.map((hotel, id) => (
          <div key className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10'>
            <div

              className='bg-white border rounded-xl shadow-sm p-4 flex flex-col gap-4'
            >
              <div className='flex justify-between items-center w-full'>
                <div className='w-24 h-24 rounded-lg overflow-hidden'>
                  <img
                    src={hotel.coverImage}
                    alt={hotel.title}
                    className='w-full h-full object-cover'
                  />
                </div>

                {/* Details */}
                <div className='flex-1 ml-3'>
                  <h3 className='text-base font-semibold line-clamp-1'>{hotel.title}</h3>
                  <p className='text-xs text-gray-500 line-clamp-1'>{hotel.location}</p>

                  {/* Status Badge */}
                  <span className='inline-block mt-2 px-2 py-1 text-[11px] rounded-full bg-green-200 text-green-700 font-medium'>
                    Approved
                  </span>
                </div>
              </div>

              {/* Stats Bar */}
              <div className='grid grid-cols-3 gap-2 text-center'>
                {/* Wishlist */}
                <div className='bg-pink-50 p-2 rounded-lg border'>
                  <p className='text-sm font-semibold'>{hotel.wishlistCount}</p>
                  <p className='text-[10px] text-gray-500'>Wishlisted</p>
                </div>

                {/* Views */}
                <div className='bg-blue-50 p-2 rounded-lg border'>
                  <p className='text-sm font-semibold'>{hotel.views}</p>
                  <p className='text-[10px] text-gray-500'>Views</p>
                </div>

                {/* Bookings */}
                <div className='bg-green-50 p-2 rounded-lg border'>
                  <p className='text-sm font-semibold'>{hotel.bookings}</p>
                  <p className='text-[10px] text-gray-500'>Bookings</p>
                </div>
              </div>

              {/* Action Button */}
              <div className='flex justify-end'>
                <button className='px-4 py-2 rounded-md bg-red-100 text-red-500 text-sm'>
                  Remove
                </button>
              </div>
            </div>
          </div>

        ))
      )}

    </div>
  )
}

export default Approved
