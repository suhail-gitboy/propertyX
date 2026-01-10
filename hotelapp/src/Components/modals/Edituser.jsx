
import React, { useState } from 'react'

import { CiCamera } from "react-icons/ci";
import { motion } from 'framer-motion';
import { FaEye, FaRegUser } from "react-icons/fa";
import { ContextDatas } from '../../Common/ContextWrapped';
import { toast } from 'sonner';
import { UpdateUserdata } from '../../ApiServices/Allapi';



const Edituser = ({ modal, Setmodal, userDetails, SetuserDetails, User }) => {
    const { SetUser, token } = ContextDatas()
    const [VisibleType, SetVisibleType] = useState(false)


    const [Preview, Setpreview] = useState(null)
    const [loading, Setloading] = useState(false)
    const [misMatch, Setmismath] = useState(true)
    const [Uploadimg, Setuploadimg] = useState(null)
    const FuncImageupload = (e) => {
        const File = e.target.files[0]
        Setuploadimg(File)
        const Url = URL.createObjectURL(File)
        Setpreview(Url)


    }


    const FuncPassword = (value) => {
        SetuserDetails({
            ...userDetails, newPassword: value
        })


        userDetails.password === value ? Setmismath(true) : Setmismath(false)
    }


    const ResetFunc = () => {
        SetuserDetails({
            name: User.name,
            picture: User.picture,
            email: User.email,
            phone: ""


        })
        Setpreview("")
    }


    const FuncSubmit = async () => {

        const { name, email, phone } = userDetails


        if (!name) {
            toast.warning("fill the form")
        } else {
            Setloading(true)
            try {
                const Reqbody = new FormData()

                for (let key in userDetails) {
                    if (key !== "picture") {
                        Reqbody.append(key, userDetails[key])
                    } else {
                        Preview ? Reqbody.append("picture", Uploadimg) : Reqbody.append("picture", userDetails.picture.url)
                    }

                }
                console.log(Reqbody);


                const Headers = {
                    "Authorization": `Bearer ${token}`
                }



                const Response = await UpdateUserdata(Reqbody, Headers)
                if (Response.status == 200) {
                    sessionStorage.setItem("user", JSON.stringify(Response.data))
                    SetUser(Response.data)
                    Setloading(false)
                    Setmodal(false)
                } else {
                    console.log(Response);

                }



            } catch (error) {
                console.log(error);

            }

        }

    }

    return (
        <div className='absolute md:fixed inset-0 md:flex justify-center items-center bg-black/40 z-50' >
            <div className="flex justify-end">
                <p className='p-4 ' onClick={() => Setmodal(false)}>close</p>
            </div>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className=" bg-gray-50 p-8 ">
                <div className="max-w-6xl h-4/5 mx-auto overflow-auto bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-center md:gap-6 border-b pb-6 mb-6">
                        <div className="md:relative">
                            <img
                                src={
                                    Preview ? Preview : typeof User.picture == "string" ? User.picture : User.picture.url
                                }
                                alt="avatar"
                                className="w-10 md:w-20 h-10 md:h-20 rounded-full object-cover border-2 border-gray-100"
                            />

                        </div>



                        <label
                            htmlFor="profile"
                            className="ml-auto text-right cursor-pointer flex items-center gap-2 text-sm text-gray-500"
                        >
                            <CiCamera className="text-3xl" />
                            Edit
                        </label>

                        <input
                            onChange={(e) => FuncImageupload(e)}
                            type="file"
                            id="profile"
                            hidden

                        />

                    </div>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Row */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">username</label>
                            <div className="mt-2 flex px-2 w-full justify-between items-center rounded-lg border-gray-200 bg-white  shadow-sm placeholder-gray-400">

                                <FaRegUser className='text-md mr-2' />

                                <input value={userDetails?.name} onChange={(e) => SetuserDetails({ ...userDetails, name: e.target.value })} className="w-full  py-3 focus:outline-none focus:ring-0  " />
                            </div>
                        </div>



                        {/* Email + Phone */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">email</label>
                            {/* <div className="mt-2 relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
               
              </span>
              <input defaultValue="em***an@gmail.com" className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 bg-white shadow-sm placeholder-gray-400" />
            </div> */}
                            <div className="mt-2 flex px-2 w-full justify-between items-center rounded-lg border-gray-200 bg-white  shadow-sm placeholder-gray-400">

                                <FaRegUser className='text-md mr-2' />

                                <input value={userDetails.email} onChange={(e) => SetuserDetails({ ...userDetails, email: e.target.value })} className="w-full  py-3 focus:outline-none focus:ring-0  " />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Phone Number</label>
                            <div className="mt-2 flex items-center">
                                <button className="flex items-center gap-2 pl-3 pr-3 py-2 border border-gray-200 rounded-l-lg bg-white">

                                    <span className="text-sm">(+91)</span>
                                </button>
                                <input value={userDetails.phone} onChange={(e) => SetuserDetails({ ...userDetails, phone: e.target.value })} className="w-full pl-4 pr-4 py-3 rounded-r-lg border border-l-0 border-gray-200 bg-white shadow-sm placeholder-gray-400" />
                            </div>
                        </div>









                        {/* Address - full width */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">new Password</label>
                            <div className="mt-2 flex justify-between w-full px-4 py-3 rounded-lg border border-gray-200 bg-white shadow-sm">
                                <input type={VisibleType ? "text" : "password"} value={userDetails.password} onChange={(e) => SetuserDetails({ ...userDetails, password: e.target.value })} className="  outline-none" />
                                <button type='button' onClick={() => SetVisibleType(!VisibleType)}><FaEye /></button>
                            </div>


                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Confirm password</label>
                            <div className="mt-2 flex justify-between w-full px-4 py-3 rounded-lg border border-gray-200 bg-white shadow-sm">
                                <input type="password" value={userDetails.value} onChange={(e) => FuncPassword(e.target.value)} className="  outline-none" />

                            </div>
                            {!misMatch && <p className="py-1 text-red-500"> confirm password is wrong</p>}
                        </div>

                        {/* Actions */}
                        <div className="md:col-span-2 flex justify-between  gap-4 items-center mt-4">
                            <button onClick={ResetFunc} type="button" className="md:px-6 px-3 py-2 md:py-3 rounded-full border border-gray-300 hover:bg-neutral-300 text-gray-600">Reset</button>

                            <div className="flex gap-2">
                                <button onClick={() => Setmodal(false)} type="button" className="md:px-6 px-3 py-2 md:py-3 rounded-full border hover:bg-neutral-300 border-gray-300 text-gray-600">Discard</button>
                                <button onClick={FuncSubmit} type="button" className="md:px-6 px-3 py-2 md:py-3 rounded-full bg-white border border-blue-600 text-blue-600 font-medium">{loading ? "Saving.." : "Save changes"}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

export default Edituser
