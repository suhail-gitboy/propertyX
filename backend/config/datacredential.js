import dotenv from "dotenv"
dotenv.config()
export const redis = {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || "password"
}

export const Durationcaching = {
    durationMain: "600000"
}