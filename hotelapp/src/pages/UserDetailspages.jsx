import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useFollow, useGetsingleuser, useGetuserproperty, useunFollow } from '../ApiServices/tanstack/PropertyMethod';
import { ContextDatas } from '../Common/ContextWrapped';


const UserDetailspages = () => {


    const { token, User, Setloginmodal } = ContextDatas()




    const [user, Setuser] = useState({})


    const { host } = useParams()

    const { data } = useGetuserproperty(host)



    useEffect(() => {



        if (!data || data.length === 0) return;


        Setuser(data[0].seller)




    }, [data])



    const { data: userdata } = useGetsingleuser(user.sellerId)


    console.log(userdata);

    const Follow = useFollow(token)

    const followUnfollow = (id) => {
        if (!User?._id || !token || token === "undefined") {
            Setloginmodal(true)
        } else {
            Follow.mutate(id)

        }

    }


    const unfollow = useunFollow(token)



    const UnfollowFunv = (id) => {
        if (!User?._id || !token || token === "undefined") {
            Setloginmodal(true)
        } else {
            unfollow.mutate(id)

        }

    }



    return (
        <>
            <div className="min-h-screen bg-gray-100 p-4">

                <div className="max-w-5xl mx-auto bg-white rounded-xl p-6 shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">


                        <div className="flex items-center gap-6">
                            <img
                                src={typeof user?.picture == "string" ? user?.picture : user?.picture?.url}
                                alt="profile"
                                className=" w-18 h-18 md:w-24 md:h-24 rounded-full border"
                            />

                            <div>
                                <h2 className="text-xl md:text-2xl font-bold">{user?.name}</h2>
                                <p className="text-gray-500">host</p>

                                <div className="flex gap-6 mt-3 text-sm">
                                    <span>
                                        <b>{data?.length}</b> posts
                                    </span>
                                    <span>
                                        <b>{userdata ? userdata?.followers?.length : 0}</b> followers
                                    </span>
                                    <span>
                                        <b>{userdata ? userdata?.following?.length : 0}</b> following
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-between">

                            {
                                User?._id != host && <>{
                                    userdata?.followers?.find((data) => data._id == User?._id) ? <button onClick={() => UnfollowFunv(user?.sellerId)} className='px-4 py-2 rounded-lg bg-neutral-300 text-black text-sm'>unfollow</button> : <button onClick={() => followUnfollow(user.sellerId)} className='px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm'>Follow</button>
                                }
                                </>
                            }
                            <div className="flex gap-4">
                                <button className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 text-sm">
                                    💬 Message
                                </button>

                                <Link to="/" className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-sm">
                                    🏠 Home
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>


                {/* SELL POSTS */}
                <div className="max-w-5xl mx-auto mt-8">
                    <h3 className="text-xl font-semibold mb-4">🏷 All  Posts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {data?.map((post, index) => (
                            <div key={index} className="bg-white rounded-lg shadow">
                                <img
                                    src={post.images[0].url} className="h-40 w-full object-cover rounded-t-lg"
                                />
                                <div className="flex justify-between items-center">
                                    <div className="p-3">
                                        <h4 className="font-semibold">{post.title}</h4>
                                        <p className="text-sm text-gray-600">₹ {post.price}</p>
                                        <p className="text-xs text-gray-500 mt-1">❤️ {post.likes.length} likes</p>
                                    </div>
                                    <div className="p-3 ">
                                        <Link to={`/roomdetail/${post._id}`} className="px-2 py-2 text-white text-sm bg-green-700 rounded-md  pb-2">{post.listingType == "rent" ? "book now" : "for sale"}</Link>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RENT POSTS */}

            </div>
        </>
    )
}

export default UserDetailspages
