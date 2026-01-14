import mongoose from "mongoose";




const Schema = new mongoose.Schema({
    members: {
        type: Array
    }

},
    {
        timestamps: true
    },)


Schema.index({ createdAt: 1 });


export const Conversation = mongoose.model("conversation", Schema)
