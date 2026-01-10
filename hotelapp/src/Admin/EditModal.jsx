
import React, { useState } from 'react'

import { CiCamera } from "react-icons/ci";
import { motion } from 'framer-motion';
import { FaEye, FaRegUser } from "react-icons/fa";
import { toast } from 'sonner';

import { ContextDatas } from '../Common/ContextWrapped';
import { UpdateUserdata } from '../ApiServices/Allapi';



const EdituserAdmin = ({ modal, Setmodal, userDetails, SetuserDetails, User }) => {
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
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-blue-950 p-8 text-white"
            >
                <div className="max-w-6xl h-4/5 mx-auto overflow-auto bg-blue-900 rounded-2xl shadow-xl p-8">
                    <div className="flex items-center md:gap-6 border-b border-blue-800 pb-6 mb-6">
                        <div className="md:relative">
                            <img
                                src={Preview ? Preview :
                                    typeof User?.picture === "string"
                                        ? User.picture
                                        : User?.picture?.url
                                }
                                alt="avatar"
                                className="w-10 md:w-20 h-10 md:h-20 rounded-full object-cover border-2 border-blue-700"
                            />
                        </div>

                        <label
                            htmlFor="profile"
                            className="ml-auto cursor-pointer flex items-center gap-2 text-sm text-white/80 hover:text-white"
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
                        {/* Username */}
                        <div>
                            <label className="text-sm font-medium text-white/80">Username</label>
                            <div className="mt-2 flex px-3 items-center rounded-lg bg-blue-950 border border-blue-800">
                                <FaRegUser className="mr-2 text-white/60" />
                                <input
                                    value={userDetails?.name}
                                    onChange={(e) =>
                                        SetuserDetails({ ...userDetails, name: e.target.value })
                                    }
                                    className="w-full py-3 bg-transparent text-white placeholder-white/40 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-white/80">Email</label>
                            <div className="mt-2 flex px-3 items-center rounded-lg bg-blue-950 border border-blue-800">
                                <FaRegUser className="mr-2 text-white/60" />
                                <input
                                    value={userDetails.email}
                                    onChange={(e) =>
                                        SetuserDetails({ ...userDetails, email: e.target.value })
                                    }
                                    className="w-full py-3 bg-transparent text-white focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="text-sm font-medium text-white/80">Phone</label>
                            <div className="mt-2 flex">
                                <span className="px-4 py-3 bg-blue-950 border border-blue-800 rounded-l-lg text-white/70">
                                    +91
                                </span>
                                <input
                                    value={userDetails.phone}
                                    onChange={(e) =>
                                        SetuserDetails({ ...userDetails, phone: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-blue-950 border border-l-0 border-blue-800 rounded-r-lg text-white focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="text-sm font-medium text-white/80">
                                New Password
                            </label>
                            <input
                                type='password'
                                value={userDetails.password}
                                onChange={(e) =>
                                    SetuserDetails({ ...userDetails, password: e.target.value })
                                }
                                className="mt-2 w-full px-4 py-3 rounded-lg bg-blue-950 border border-blue-800 text-white focus:outline-none"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="text-sm font-medium text-white/80">
                                Confirm Password
                            </label>
                            <div className="mt-2 flex justify-between w-full px-4 py-3 rounded-lg bg-blue-950 border   shadow-sm">
                                <input type={VisibleType ? "text" : "password"} onChange={(e) => FuncPassword(e.target.value)} className="  outline-none" />
                                <button onClick={() => SetVisibleType(!VisibleType)}><FaEye /></button>
                            </div>

                            {!misMatch && (
                                <p className="mt-1 text-red-400 text-sm">
                                    Confirm password is wrong
                                </p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="md:col-span-2 flex justify-between items-center mt-6">
                            <button
                                onClick={ResetFunc}
                                type="button"
                                className="px-6 py-3 rounded-full border border-white/30 hover:bg-white/10"
                            >
                                Reset
                            </button>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => Setmodal(false)}
                                    type="button"
                                    className="px-6 py-3 rounded-full border border-white/30 hover:bg-white/10"
                                >
                                    Discard
                                </button>

                                <button
                                    onClick={FuncSubmit}
                                    type="button"
                                    className="px-6 py-3 rounded-full bg-white text-blue-950 font-semibold hover:bg-gray-200"
                                >
                                    {loading ? "Saving..." : "Save changes"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </motion.div>

        </div>
    )
}

export default EdituserAdmin
