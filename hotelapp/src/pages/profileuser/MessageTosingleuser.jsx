import { Send, User, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { ContextDatas } from '../../Common/ContextWrapped';
import { useMessagehistory, useNewmessage, useStartConverstaion } from '../../ApiServices/tanstack/PropertyMethod';
import { formatDate, timeAgo } from '../../Utils/UILIBRARY/Realtime';
import { toast } from 'sonner';
import { GrGallery } from "react-icons/gr";
const MessageTosingleuser = () => {
    const [recientuser, Setrecipientuser] = useState(null)
    const [conversationid, Setconversationid] = useState(null)
    const [messageshistory, Setmessagehistory] = useState([])

    const { id } = useParams()


    const { token, User } = ContextDatas();

    // when the id come its create new concersation by two id passing both user and recipient from params
    const {
        mutate: startConversation,
        data,
        isSuccess
    } = useStartConverstaion(token);

    useEffect(() => {
        if (id && token) {
            startConversation(id);
        }
    }, [id, token]);


    // when recipient  data and mutual id array comes it store display here profile and name
    useEffect(() => {
        if (data) {
            Setrecipientuser(data.recipientUser);


            Setconversationid(data?.conversation?._id)

        }




    }, [data]);

    // get history when chat id from mutual connectdata comes from there it will send to back and return 
    const { data: messages } = useMessagehistory(data?.conversation?._id, token)
    useEffect(() => {

        Setmessagehistory(messages)
    }, [messages])



    // sendingnewmesssages
    const [messageText, setMessageText] = useState("");


    const sendmessage = useNewmessage(token)


    const handleSend = () => {
        if (!messageText) {
            toast.warning("type something")
        }

        const body = {
            chatId: conversationid,
            senderId: User._id,
            text: messageText
        }

        sendmessage.mutate(body)


        setMessageText("");
    };
    return (
        <div className="w-full relative h-160 flex flex-col">

            {/* HEADER */}
            <h2 className="w-full py-4 px-4 bg-black text-gray-200 text-xl
        flex items-center gap-3 font-semibold sticky top-0 z-10"
            >
                <img
                    src={typeof recientuser?.picture == "string" ? recientuser?.picture : recientuser?.picture.url}
                    className="w-10 h-10 rounded-full object-cover"
                    alt=""
                />
                <span className="relative">
                    <span className="w-2 h-2 bg-green-500 rounded-full absolute -left-3 top-1/2 -translate-y-1/2"></span>
                    {recientuser?.name}
                </span>
            </h2>

            {/* MESSAGES */}
            <div className="flex-1 flex flex-col gap-3 p-6 bg-gray-200 overflow-y-auto">
                {messageshistory?.length > 0 ? (
                    messageshistory?.map((msg) => {
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
    )
}

export default MessageTosingleuser
