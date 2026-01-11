import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { ContextDatas } from '../../Common/ContextWrapped';
import { useAllmessaged, useGetalluserdata, useMessagehistory, useNewmessage, useStartConverstaion } from '../../ApiServices/tanstack/PropertyMethod';
import Loading from '../../Components/Loading';
import { toast } from 'sonner';
import { GrGallery } from "react-icons/gr";
import { Send } from 'lucide-react';
import { timeAgo } from '../../Utils/UILIBRARY/Realtime';
import { FaHamburger } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import { TiMessages } from "react-icons/ti";
import { IoIosClose } from "react-icons/io";
import Messagelist from '../../Components/Messagelists';


const Message = () => {
  const { token, User } = ContextDatas()

  const [userProfile, Setuserprofile] = useState(null)
  const [messagebar, Setmessagebar] = useState(false)
  const [chatId, SetchatID] = useState(null)
  const bottomRef = useRef(null);



  // its bring ing both mutual id also chatId its _id from conversation and sending recipient data from here 
  const { mutate: startConversation, data: recipientuserdetail } = useStartConverstaion(token);




  const { data } = useAllmessaged(User._id, token)



  const Data = useMemo(() => {
    if (!data || !User?._id) return [];

    return [...new Set(
      data?.map(item => item?.members?.find(id => id !== User._id))
        .filter(Boolean)
    )];
  }, [data, User?._id]);





  const { data: Userdetail } = useGetalluserdata(Data, token)
  useEffect(() => {
    Setuserprofile(recipientuserdetail?.recipientUser)
    SetchatID(recipientuserdetail?.conversation?._id)
  }, [recipientuserdetail])



  const { data: messages } = useMessagehistory(recipientuserdetail?.conversation?._id, token)




  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);



  const [messageText, setMessageText] = useState("");


  const sendmessage = useNewmessage(token)


  const handleSend = () => {
    if (!messageText) {
      toast.warning("type something")
    }

    const body = {
      chatId: chatId,
      senderId: User._id,
      text: messageText
    }

    sendmessage.mutate(body)


    setMessageText("");
  };


  if (!Userdetail) {
    return <div className='min-h-screen bg-black/40 fixed inset-0 flex justify-center items-center'><Loading /></div>
  }

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className='md:flex gap-2'>
      <div className="md:hidden flex justify-end p-2">
        <button>{messagebar ? < IoIosClose
          onClick={() => Setmessagebar(!messagebar)} className={` transition-transform duration-200 ${messagebar == false ? "rotate-180" : ""}`} /> : < TiMessages onClick={() => Setmessagebar(!messagebar)} />}</button>

      </div>
      <aside className={`w-3/4 h-screen z-50 bg-teal-500 -left-20 transition-transform duration-150 fixed sm:w-2/5 md:h-auto  p-4 ${messagebar ? "translate-x-0 left-0" : "-translate-x-full"} md:static md:translate-x-0 gap-2 flex-col  items-center`}>
        <h3 className="py-3 text-2xl font-bold">
          Your Chat history
        </h3>

        {/* left */}
        {
          Userdetail.map((user, key) => (
            <Messagelist startConversation={startConversation} user={user} key={user._id} />
          ))
        }
      </aside>
      {/* right */}
      <div className="w-full relative h-190 flex flex-col">

        {/* HEADER */}
        {
          userProfile && <h2 className="w-full py-4 px-4 bg-black text-gray-200 text-xl flex items-center gap-3 font-semibold sticky top-0 z-10"
          >
            <img
              src={typeof userProfile?.picture == "string" ? userProfile?.picture : userProfile?.picture.url}
              className="w-10 h-10 rounded-full object-cover"
              alt=""
            />
            <span className="relative">
              <span className="w-2 h-2 bg-green-500 rounded-full absolute -left-3 top-1/2 -translate-y-1/2"></span>
              {userProfile?.name}
            </span>
          </h2>
        }

        {/* MESSAGES */}
        <div className="flex-1 flex flex-col gap-3 p-6 bg-gray-200 overflow-y-auto">
          {messages?.length > 0 ? (
            messages?.map((msg) => {
              const isMe = msg.senderId == User._id

              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm
                            ${isMe
                        ? "bg-black text-white rounded-br-sm"
                        : "bg-white text-gray-800 rounded-bl-sm"
                      }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <div
                      className={`mt-1 text-[11px] text-right
                              ${isMe ? "text-gray-300" : "text-gray-400"}`}
                    >
                      {(timeAgo(msg.createdAt))}
                    </div>

                  </div>

                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 mt-10">
              You haven’t started a conversation
            </p>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="sticky bottom-0 bg-white border-t px-4 py-3">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 text-sm rounded-full border
                      focus:outline-none focus:ring-2 focus:ring-black/20"
            />

            <div className="flex gap-4 items-center">
              <label htmlFor="imageUpload">
                <GrGallery className='text-black text-2xl' />
                <input type="file" hidden id='imageUpload' />
              </label>


              <button
                type='button'
                onClick={handleSend}

                className={`p-3 rounded-full transition
                      ${messageText.trim()
                    ? "bg-black text-white hover:bg-gray-900"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>



    </motion.div>
  )
}

export default Message
