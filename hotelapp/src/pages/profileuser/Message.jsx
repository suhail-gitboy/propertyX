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
import { io, Socket } from "socket.io-client"
import { useQueryClient } from '@tanstack/react-query';
import Userprofile from './Userprofiledata';

const Message = () => {
  const { token, User } = ContextDatas()

  const [userProfile, Setuserprofile] = useState(null)
  const [messagebar, Setmessagebar] = useState(false)
  const [chatId, SetchatID] = useState(null)
  const [soket, Setsocket] = useState(null)
  const [recipientuser, Setrecipientid] = useState(null)
  const queryClient = useQueryClient();

  const [allonlineUsers, Setonlineusers] = useState(null)
  const [messagedata, Setmessagedata] = useState(null)


  const bottomRef = useRef(null);

  // its bring ing both mutual id also chatId its _id from conversation and sending recipient data from here 
  const { mutate: startConversation, data: recipientuserdetail } = useStartConverstaion(token);



  const { data: messages } = useMessagehistory(recipientuserdetail?.conversation?._id, token)


  // socket section

  useEffect(() => {

    const Newsocket = io("https://propertyx-xm8w.onrender.com")
    Setsocket(Newsocket)

    return () => { Newsocket.disconnect() }


  }, [User])


  useEffect(() => {
    if (!soket || !User?._id) return;

    const handleOnlineUsers = (res) => {
      Setonlineusers(res);
    };

    soket.emit("newuserjoin", User._id);
    soket.on("getallonlineusers", handleOnlineUsers);

    return () => {
      soket.off("getallonlineusers", handleOnlineUsers);
    };
  }, [soket]);




  useEffect(() => {

    if (soket == null) return;

    soket.emit("sendmessages", messagedata)



  }, [messagedata])

  useEffect(() => {
    console.log("recipient", allonlineUsers);

  }, [allonlineUsers])

  useEffect(() => {

    if (!soket) return


    soket.on("getMessages", (res) => {
      console.log("from socket", res);


      queryClient.setQueryData(["messages", res.chatId], (oldData) => {
        if (!oldData) return [res];

        return [...oldData, res]

      }

      )
    })



    return () => {
      soket.off("getallonlineusers", (res) => {
        Setonlineusers(res)
      })
    }

  }, [soket, queryClient])


  const onlineUsers = allonlineUsers?.some((user) => user.userId == recipientuser)




  const isOnline = onlineUsers


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
    Setrecipientid(recipientuserdetail?.recipientUser._id)
    SetchatID(recipientuserdetail?.conversation?._id)
  }, [recipientuserdetail])




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



    const message = {
      text: messageText,
      chatId,
      senderId: User._id,
      Recipientid: recipientuser,
    };
    Setmessagedata(message)



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
      <aside
        className={`
    fixed top-0 left-0 z-50
    h-screen w-4/5 sm:w-2/5 md:w-[320px]
    bg-white
    border-r border-gray-200
    shadow-lg
    transition-transform duration-300 ease-in-out
    flex flex-col
    ${messagebar ? "translate-x-0" : "-translate-x-full"}
    md:static md:translate-x-0 md:shadow-none
  `}
      >

        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            Chats
          </h3>


          <button
            onClick={() => Setmessagebar(false)}
            className="md:hidden text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
          {Userdetail?.length > 0 ? (
            Userdetail.map((user) => (
              <Messagelist
                key={user._id}
                user={user}
                onlineuser={allonlineUsers}
                startConversation={startConversation}
                Setmessagebar={Setmessagebar}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center mt-6">
              No conversations yet
            </p>
          )}
        </div>
      </aside>


      <div className="w-full relative h-160 flex flex-col">


        {
          userProfile && <h2 className="w-full py-4 px-4 bg-black text-gray-200 text-xl flex items-center gap-3 font-semibold sticky top-0 z-10"
          >
            <img
              src={typeof userProfile?.picture == "string" ? userProfile?.picture : userProfile?.picture.url}
              className="w-10 h-10 rounded-full object-cover"
              alt=""
            />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-medium text-white truncate">
                {userProfile.name}
              </span>

              <span
                className={`text-xs ${isOnline ? "text-green-600" : "text-gray-500"
                  }`}
              >
                {isOnline ? "Active now" : "Offline"}
              </span>
            </div>
          </h2>
        }

        {/* MESSAGES */}
        <div className="flex-1 flex flex-col gap-3 h-120 p-6 bg-gray-200 overflow-y-auto pb-10 ">
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
