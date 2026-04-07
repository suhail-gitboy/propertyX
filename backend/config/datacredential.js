import dotenv from "dotenv"
dotenv.config()
export const redis = {
    host: "localhost",
    port: process.env.REDIS_PORT || 6379,

}

export const Durationcaching = {
    durationMain: "600000"
}