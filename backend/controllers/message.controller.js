
import { v2 as cloudinary } from "cloudinary";



import { Message } from "../models/Message.model.js";



export const creaateMessage = async (req, res) => {

    const { chatId, senderId, text } = req.body



    const image = req.file ? { url: req.file.path, public_id: req.file.filename } : null


    try {
        const message = await Message.create({
            chatId,
            senderId,
            text,
            image

        })
        console.log(message);

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


export const Deletemessage = async (req, res) => {

    const { messageId, public_id } = req.body


    try {

        if (public_id) {
            await cloudinary.uploader.destroy(public_id)
        }
        await Message.findByIdAndDelete({ _id: messageId })


        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error)

    }
}