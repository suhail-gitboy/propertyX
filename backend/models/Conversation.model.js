import mongoose from "mongoose";




const Schema = new mongoose.Schema({
    members: {
        type: Array
    }

},
    {
        timestamps: true
    },)


export const Conversation = mongoose.model("conversation", Schema)
