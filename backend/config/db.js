import mongoose from "mongoose";

import dotenv from "dotenv"

dotenv.config()

const ConnectionLink = process.env.databaseurl


mongoose.connect(ConnectionLink).then((res) => console.log("mongoose connected")
).catch((err) => {
    console.log(err);

})
