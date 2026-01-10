import React from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router'

const Sellingproperties = () => {

  const hotel = [
    {
      title: 'Seaside Serenity Hotel',
      location: 'Goa, India',
      status: 'pending',
      coverImage:
        'https://images.unsplash.com/photo-1501117716987-c8e5f3b6b3c2?auto=format&fit=crop&w=800&q=60'
    },
    {
      title: 'Seaside Serenity Hotel',
      location: 'Goa, India',
      status: 'pending',
      coverImage:
        'https://images.unsplash.com/photo-1501117716987-c8e5f3b6b3c2?auto=format&fit=crop&w=800&q=60'
    }, {
      title: 'Seaside Serenity Hotel',
      location: 'Goa, India',
      status: 'pending',
      coverImage:
        'https://images.unsplash.com/photo-1501117716987-c8e5f3b6b3c2?auto=format&fit=crop&w=800&q=60'
    }, {
      title: 'Seaside Serenity Hotel',
      location: 'Goa, India',
      status: 'pending',
      coverImage:
        'https://images.unsplash.com/photo-1501117716987-c8e5f3b6b3c2?auto=format&fit=crop&w=800&q=60'
    }
  ]
  hotel.filter((data) => data.status == "pending")
  const Pendingdata = []
  return (
    <div className='p-5 md:p-7'>
      <div className="mt-4 text-xs text-gray-500">
        Note: Listings in <span className="font-semibold">Pending Approval</span> are not shown publicly until approved by an administrator.
      </div>

      {
        Pendingdata.length > 0 ? (
          Pendingdata.map((hotel, id) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20">
              <div className=" bg-white border rounded-xl shadow-sm overflow-hidden p-3  gap-3">
                {/* Image */}
                <div className='flex justify-between items-center w-full'>
                  <div className="w-24 h-24 rounded-lg overflow-hidden ">
                    <img
                      src={hotel.coverImage}
                      alt={hotel.title}
                      className="w-full h-full object-cover"
                    />
                  </div>


                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-semibold line-clamp-1">{hotel.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-1">{hotel.location}</p>


                      {/* Status Badge */}
                      <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">
                        Pending
                      </span>
                    </div>



                  </div>
                </div>
                <div className='flex items-center space-x-2 justify-end gap-2'>

                  <button className='px-4 py-2 rounded-md bg-red-100 text-red-400  text-sm'>cancel</button>
                  <button className='px-4 py-2 rounded-md bg-green-100 text-green-500  text-sm'>update</button>

                </div>
              </div>
            </div>
          ))

        ) : (

          <div className=' flex justify-center h-screen items-center bg-blue-50'>
            <div className=' bg-linear-to-r from-blue-600 via-blue-500 to-blue-900 rounded-md text-white p-8 rounded-md'>
              <p className='text-center py-3'>you havent published your property yet</p>
              <div className='flex justify-center'>
                <Link to="/selling" className="mt-3 px-3 py-2 rounded-md text-blue-600 bg-white flex items-center  ">publish<FaHome className='ml-2' /> </Link>
              </div>


            </div>
          </div>
        )
      }

    </div>

  )
}

export default Sellingproperties
