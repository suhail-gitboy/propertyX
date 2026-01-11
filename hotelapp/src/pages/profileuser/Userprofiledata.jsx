import React, { useEffect, useState } from 'react'
import { CiCamera } from "react-icons/ci";
import { motion } from 'framer-motion';
import { FaRegUser } from "react-icons/fa";
import { ContextDatas } from '../../Common/ContextWrapped';
import Detailpage from '../Detailpage';
import Edituser from '../../Components/modals/Edituser';
import { data, Link } from 'react-router';
import { useGetbookings, useGetsingleuser } from '../../ApiServices/tanstack/PropertyMethod';

const Userprofile = () => {


  const { SetUser, User, token } = ContextDatas()
  const { data: userdata } = useGetsingleuser(User?._id)

  console.log(userdata);


  const [modeledit, Setmodal] = useState(false)
  const [userDetails, SetuserDetails] = useState({
    name: "",
    email: "",
    picture: "",
    password: "",
    phone: "",
    newPassword: ""


  })

  useEffect(() => {
    SetuserDetails({
      name: User?.name,
      email: User?.email,
      picture: User?.picture,
      phone: User?.phone
    })

  }, [User])

  const { data } = useGetbookings(token)
  console.log(data);

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="min-h-screen bg-gray-50 p-8 ">



      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {
          User?.role == "user" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">

              {/* Followers */}


              {/* Following */}
              <div className="rounded-2xl bg-blue-800 p-5 shadow-lg shadow-slate-300/40 text-white">
                <p className="text-xs uppercase tracking-wider text-slate-300">
                  Following
                </p>
                <h3 className="mt-2 text-3xl font-semibold">
                  {userdata?.following?.length || 0}
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Profiles you follow
                </p>
              </div>

              {/* Active Bookings */}
              <div className="rounded-2xl bg-emerald-600 p-5 shadow-lg shadow-emerald-200/50 text-white">
                <p className="text-xs uppercase tracking-wider text-emerald-100">
                  Active Bookings
                </p>
                <h3 className="mt-2 text-3xl font-semibold">
                  {data?.filter((item) => item?.bookingStatus === "confirmed").length || 0}
                </h3>
                <p className="mt-1 text-xs text-emerald-200">
                  Ongoing reservations
                </p>
              </div>


              <div className="rounded-2xl bg-yellow-500 p-5 shadow-lg shadow-amber-200/50 text-white">
                <p className="text-xs uppercase tracking-wider text-amber-100">
                  Pending Requests
                </p>
                <h3 className="mt-2 text-3xl font-semibold">
                  {data?.filter((item) => item.bookingStatus === "pending").length || 0}
                </h3>
                <p className="mt-1 text-xs text-amber-200">
                  Awaiting confirmation
                </p>
              </div>
              <div className="rounded-2xl bg-rose-400 p-5 shadow-lg shadow-rose-400/25 text-white">
                <p className="text-xs uppercase tracking-wider text-white">
                  cancelled Bookings
                </p>
                <h3 className="mt-2 text-3xl font-semibold">
                  {data?.filter((item) => item.bookingStatus === "cancelled").length || 0}
                </h3>
                <p className="mt-1 text-xs text-white">
                  Awaiting confirmation
                </p>
              </div>

            </div>
          )
        }





        <div className="flex items-center md:gap-6 border-b pb-6 mb-6">
          <div className="md:relative">
            <img
              src={
                typeof User?.picture === "string"
                  ? User.picture
                  : User?.picture?.url
              }
              alt="avatar"
              className="w-10 md:w-20 h-10 md:h-20 rounded-full object-cover border-2 border-gray-100"
            />

          </div>

          <div className='hidden md:flex flex-col'>
            <h2 className="text-lg md:text-2xl font-semibold">{User?.name}</h2>
            <p className="text-xs md:text-sm text-gray-500">{User?.email}.</p>
          </div>

          <div className="ml-auto text-right">
            <button onClick={() => Setmodal(true)} className="text-sm text-gray-500 flex items-center gap-2">
              <CiCamera className='text-3xl' />
              Edit
            </button>
          </div>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Row */}
          <div>
            <label className="text-sm font-medium text-gray-700">username</label>
            <div className="mt-2 flex px-2 w-full justify-between items-center rounded-lg border-gray-200 bg-white  shadow-sm placeholder-gray-400">

              <FaRegUser className='text-md mr-2' />

              <input value={userDetails?.name} className="w-full  py-3 focus:outline-none focus:ring-0  " />
            </div>
          </div>



          <div>
            <label className="text-sm font-medium text-gray-700">email</label>

            <div className="mt-2 flex px-2 w-full justify-between items-center rounded-lg border-gray-200 bg-white  shadow-sm placeholder-gray-400">

              <FaRegUser className='text-md mr-2' />

              <input value={userDetails.email} className="w-full  py-3 focus:outline-none focus:ring-0  " />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <div className="mt-2 flex items-center">
              <button className="flex items-center gap-2 pl-3 pr-3 py-2 border border-gray-200 rounded-l-lg bg-white">

                <span className="text-sm">(+91)</span>
              </button>
              <input value={userDetails.phone} className="w-full pl-4 pr-4 py-3 rounded-r-lg border border-l-0 border-gray-200 bg-white shadow-sm placeholder-gray-400" />
            </div>
          </div>











        </form>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* FOLLOWERS */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-inner">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Followers
            </h3>

            {userdata?.followers?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                <p className="text-sm font-medium">You have no followers yet</p>
                <p className="text-xs mt-1">Share your profile to gain visibility</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userdata?.followers?.map((follower) => (
                  <div
                    key={follower._id}
                    className="flex items-center justify-between bg-white rounded-2xl px-5 py-4 shadow-md hover:shadow-lg transition"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={follower?.picture?.url}
                        alt={follower?.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {follower?.name}
                        </p>
                        <p className="text-xs text-gray-500">Follows you</p>
                      </div>
                    </div>

                    <Link
                      to={`/host/${follower._id}/profile`}
                      className="text-sm px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FOLLOWING */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-inner">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Following
            </h3>

            {userdata?.following?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                <p className="text-sm font-medium">You’re not following anyone</p>
                <p className="text-xs mt-1">Explore profiles to start following</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userdata?.following?.map((person) => (
                  <div
                    key={person._id}
                    className="flex items-center justify-between bg-white rounded-2xl px-5 py-4 shadow-md hover:shadow-lg transition"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={person?.picture?.url}
                        alt={person?.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {person?.name}
                        </p>
                        <p className="text-xs text-gray-500">You follow</p>
                      </div>
                    </div>

                    <Link
                      to={`/host/${person._id}/profile`}
                      className="text-sm px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
      {modeledit && <Edituser userDetails={userDetails} SetuserDetails={SetuserDetails} User={User} Setmodal={Setmodal} />}
    </motion.div>
  )
}

export default Userprofile