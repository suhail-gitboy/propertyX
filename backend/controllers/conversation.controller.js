import { Conversation } from "../models/Conversation.model.js";
import { Usermodel } from "../models/User.model.js";


export const Conversationstart = async (req, res) => {


    const userId = req.payload._id;

    const { recipientId } = req.params;

    console.log("reached", userId, recipientId);


    const recipientUser = await Usermodel.findById({ _id: recipientId })
    const CheckifAlready = await Conversation.findOne({ members: { $all: [userId, recipientId] } })
    try {
        if (CheckifAlready) {
            return res.status(200).json({ conversation: CheckifAlready, recipientUser: recipientUser })
        }

        const NewConversation = await Conversation.create({
            members: [userId, recipientId]
        })
        res.status(200).json({ conversation: NewConversation, recipientUser: recipientUser })



    } catch (error) {
        res.status(500).json({ message: "Server error" });

    }
}


export const Getallmessagedpeople = async (req, res) => {

    const { id } = req.params

    try {
        const Result = await Conversation.find({ members: { $in: [id] } })
        res.status(200).json(Result)

    } catch (error) {
        res.status(500).json(error)
    }

}


export const Getalluserdata = async (req, res) => {

    const { data } = req.body



    try {

        const Alluserdata = await Usermodel.find({ _id: { $in: data } })
        console.log(Alluserdata);

        res.status(200).json(Alluserdata)

    } catch (error) {
        res.status(500).json(error)
    }

}