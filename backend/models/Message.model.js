import mongoose from "mongoose";




const Schema = new mongoose.Schema({
    chatId: {
        type: String
    },
    senderId: {
        type: String
    },
    text: {
        type: String
    }

},
    {
        timestamps: true
    },)


export const Message = mongoose.model("Message", Schema)
