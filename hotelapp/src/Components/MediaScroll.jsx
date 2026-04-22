import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import {
    Heart,
    MessageCircle,
    Send,
    Bookmark,
    MapPin
    , Ruler, IndianRupee, Home
} from "lucide-react";
import { Link } from "react-router-dom";

import Carousalimg from "./Carousalimg";
import { useADDcoment, useAddlike, useAddtowishlist, useDeletecoment, useStartConverstaion, useUpdatecoment } from "../ApiServices/tanstack/PropertyMethod";
import { ContextDatas } from "../Common/ContextWrapped";
import Likemodal from "./modals/Likemodal";
import { toast } from "sonner";
import { timeAgo } from "../Utils/UILIBRARY/Realtime";
import { AnimatePresence, easeIn, motion } from "framer-motion";

const PropertyCard = ({ property, key }) => {
    const { token, User, RecipientId, setRecipientId, Setloginmodal } = ContextDatas()
    const [showComment, setShowComment] = useState(false);
    const [showKey, setKey] = useState(null);
    const [value, setValue] = useState(null)
    const [likemodal, setlikemodal] = useState(false)
    const [ndex, setndax] = useState(null)
    const [edit, setedit] = useState(false)
    const [editButton, seteditbutton] = useState(false)
    const [KeyproperyKey, setkeyproperty] = useState(null)
    const [CommentId, setCommentid] = useState(null)






    const [review, Setreview] = useState({
        text: "",
        rating: 0
    })
    const { data: likeResponse,
        mutate: addLike } = useAddlike(token)

    const LikeButton = (id) => {

        if (token) {
            addLike(id)
        } else {
            Setloginmodal(true)
        }

    }
    const { mutate: Addid } = useAddtowishlist(token)

    const Addtowishlist = (id) => {

        if (token) {
            Addid(id)
        } else {
            Setloginmodal(true)
        }

    }

    const Mutateforcomment = useADDcoment(token)


    const Uploadcomment = (id) => {

        if (!token) {
            toast.warning("login to start exploring")

        } else if (!review.text) {
            toast.warning("fill the form")

        } else {
            Mutateforcomment.mutate({ id, body: review })
            Setreview({
                rating: 0,
                text: ""
            })


        }

    }

    //   update comment

    const UpdateComment = useUpdatecoment(token)



    const { mutate: StartConversation } = useStartConverstaion(token)

    const Updatecommentfunc = (id) => {

        if (!token) {
            toast.warning("login to start exploring")

        } else if (!review.text) {
            toast.warning("fill the form")

        } else {
            UpdateComment.mutate({ id, CommentId, body: review })


            setedit(false)
            seteditbutton(false)
            setCommentid(null)
            Setreview({
                review: "",
                rating: ""
            })

        }

    }


    const DeleteComment = useDeletecoment(token)


    const Deletecommentfunc = (id) => {

        if (!token) {
            toast.warning("login to start exploring")


        } else {
            DeleteComment.mutate({ id, CommentId })


            setedit(false)

            setCommentid(null)
            Setreview({
                review: "",
                rating: ""
            })

        }

    }




    return (

        <motion.div key={property._id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, ease: easeIn }} className="bg-white rounded-xl shadow shadow-xl mb-6 w-full mx-auto">

            <Link to={`/host/${property.seller.sellerId}/profile`} className="flex items-center gap-3 p-4">
                <img
                    src={property.seller.picture.url}
                    className="w-10 h-10 rounded-full"
                    alt=""
                />
                <div>
                    <h4 className="font-semibold text-sm">
                        {property.seller.name || "Seller"}
                    </h4>
                    <p className="text-xs text-gray-500">{property.title}</p>
                </div>
            </Link>


            <Carousalimg carouselId={property._id} images={property.images} />

            <div>
                <div className="px-4 mt-3 flex gap-2 flex-wrap">
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                        {property.listingType === "rent" ? "For Rent" : "For Sale"}
                    </span>

                    <span className="px-3 py-1 text-xs rounded-full bg-gray-100 flex items-center gap-1">
                        <Home className="w-3 h-3" /> {property.propertyType}
                    </span>

                    {property.squareFeet && (
                        <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700 flex items-center gap-1">
                            <Ruler className="w-3 h-3" /> {property.squareFeet} sqft
                        </span>
                    )}
                </div>


                <div className="px-4 mt-2">
                    <h3 className="font-semibold">{property.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                        {property.description}
                    </p>
                </div>


                <div className="px-4 mt-2 flex items-center gap-1 font-semibold">
                    <IndianRupee className="w-4 h-4 text-green-600" />
                    {property.price.toLocaleString()}
                </div>
            </div>


            <div className="relative">     {likemodal && ndex == key && <Likemodal property={property} setmodal={setlikemodal} />}</div>



            <div className="flex items-center justify-between px-4 py-3">
                <div className="px-4 text-sm text-gray-600 flex gap-4">
                    <div className="flex items-center gap-2">
                        <span onClick={() => LikeButton(property._id)} className="flex items-center gap-1">
                            {property?.likes?.some((data) => data?.email == User?.email) ? <FaHeart className="w-4 h-4 text-red-600" /> : <Heart className="w-4 h-4 text-red-500" />}   {property.likes.length}
                        </span>
                        <div onClick={() => { setlikemodal(true), setndax(key) }}>
                            <p >see people</p>
                        </div>
                    </div>
                    <span className="flex items-center gap-1">
                        <MessageCircle onClick={() => { setShowComment(!showComment); setKey(key) }} className="w-4 h-4" />{" "}
                        {property.comments?.length || 0}
                    </span>
                </div>

                <Bookmark onClick={() => Addtowishlist(property._id)} className="w-6 h-6 cursor-pointer hover:text-yellow-500" />
            </div>



            {showKey == key && showComment && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 240 }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: easeIn }} className="px-4 py-3 flex flex-col h-60 overflow-auto bg-black space-y-4">
                    {
                        property.comments.map((data, idkey) => (
                            <div className="px-4 py-2 flex items-start justify-between">

                                <div className="gap-3">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={
                                                data.picture.url
                                            }
                                            className="w-8 h-8 rounded-full object-cover"
                                            alt=""
                                        />

                                        <div className="text-sm flex gap-2">
                                            <span className="font-semibold text-white mr-2">
                                                {data.name}
                                            </span>
                                            <div className="flex flex-col">
                                                <p className="text-white font-light">
                                                    {data.text}
                                                </p>

                                                {/* META */}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1 flex gap-3">
                                        <p>{timeAgo(data.createdAt)}</p>
                                        <Rating readOnly size="small" value={data.rating} />


                                    </div>

                                </div>

                                ¸

                                <div className="flex gap-2 justify-between items-center relative">
                                    <button >
                                        <Heart className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500 mt-1" />

                                    </button>
                                    {
                                        data?.userId == User?._id && <button className="text-white text-2xl mb-3" onClick={() => { setedit(!edit); setkeyproperty(idkey); setCommentid(data._id) }}>...</button>

                                    }
                                    {
                                        edit && idkey == KeyproperyKey && <motion.div initial={{
                                            opacity: 0
                                        }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: easeIn }} className="flex flex-col gap-2 bg-black">
                                            <button onClick={() => { seteditbutton(true); Setreview({ text: data.text, rating: data.rating }) }} className="bg-neutral-500 text-sm rounded-md px-4 py-2 text-white">edit</button>
                                            <button onClick={() => Deletecommentfunc(property._id)} className="bg-neutral-500 rounded-md text-sm px-4 py-2 text-white">delete</button>

                                        </motion.div>
                                    }

                                </div>
                            </div>
                        ))
                    }
                </motion.div>
            )}


            {/* COMMENT INPUT */}
            {showKey == key && showComment && (
                <div className="px-4 py-3 flex items-center justify-between">
                    <div>
                        <input
                            type="text"
                            value={review.text}
                            onChange={(e) => Setreview({ ...review, text: e.target.value })}
                            placeholder="Add a comment..."
                            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none"
                        />
                        <div className="flex items-center gap-4 p-4">
                            <p className="text-xl font-semibold text-neutral-500 ">give rating</p>
                            <Rating
                                value={review.rating}
                                precision={0.5}
                                onChange={(e, newValue) => Setreview({ ...review, rating: newValue })}
                            />
                        </div>
                    </div>
                    {
                        !editButton ? <button type="button" onClick={() => Uploadcomment(property._id)} className="px-4 py-2 bg-gray-700 text-white text-xs rounded-md">Send</button> : <button type="button" onClick={() => Updatecommentfunc(property._id)} className="px-4 py-2 bg-gray-700 text-white text-xs rounded-md">update</button>
                    }

                </div>
            )}

            {/* BOTTOM ACTIONS */}
            <div className="flex justify-between items-center px-4 py-3 border-t border-black/10">
                <Link to={`/roomdetail/${property._id}`} className="flex items-center gap-1 text-xs px-3 py-2 rounded-full border border-blue-800/10 hover:bg-gray-100">
                    <MapPin className="w-4 h-4 text-teal-500 text-2xl" />
                    View Details
                </Link>
                {
                    User?._id !== property.seller.sellerId &&
                    <Link to={`/profile/message/${property.seller.sellerId}`} className="flex items-center gap-1 text-xs px-4 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700">
                        <Send className="w-4 h-4" />
                        Message
                    </Link>
                }
            </div>

        </motion.div>

    );
};

export default PropertyCard;