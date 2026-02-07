import dotenv from "dotenv"
dotenv.config()
export const redis = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD || "password"
}

export const Durationcaching = {
    durationMain: "600000"
}