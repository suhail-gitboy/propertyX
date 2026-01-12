




import { Message } from "../models/Message.model.js";



export const creaateMessage = async (req, res) => {

    const { chatId, senderId, text } = req.body


    try {
        const message = await Message.create({
            chatId,
            senderId,
            text

        })

        res.status(200).json(message)
    } catch (error) {

        res.status(500).json(error)

    }

}


export const Getmessages = async (req, res) => {


    const { chatId } = req.params


    try {
        const Data = await Message.find({
            chatId: chatId
        })


        res.status(200).json(Data)

    } catch (error) {
        res.json(error)

    }

}