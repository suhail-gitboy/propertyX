// import { createClient } from "redis"
// import { redis } from "../config/datacredential.js"
// import dotenv from "dotenv"

// dotenv.config()

// const redisurl = `redis://:${redis.password}@${redis.host}:${redis.port}`


// const redisClient = createClient({ url: redisurl })


// redisClient.on("connect", () => {
//     console.log("🟡 Redis: connecting...");
// });

// redisClient.on("ready", () => {
//     console.log("🟢 Redis: ready to use");
// });

// redisClient.on("error", (err) => {
//     console.error("🔴 Redis error:", err.message);
// });

// redisClient.on("reconnecting", () => {
//     console.log("🟠 Redis: reconnecting...");
// });

// redisClient.on("end", () => {
//     console.log("⚫ Redis: connection closed");
// });

// /* ---------- Connect ---------- */
// redisClient.connect().catch((err) => {
//     console.error("❌ Redis connection failed:", err);
// });


// // async function connect() {

// //     try {

// //         await redisClient.connect()
// //     } catch (error) {
// //         console.log("connection failed retrying in 5s");

// //         setTimeout(connect, 5000);


// //     }

// // }

// // connect()
// // async function connect() {
// //     try {
// //         await redisClient.connect()
// //         console.log("🟢 Redis connected")
// //     } catch (error) {
// //         console.log("connection failed retrying in 5s")
// //         setTimeout(connect, 5000)
// //     }
// // }

// // connect()

// process.on("SIGINT", async () => {
//     await redisClient.disconnect()
// })

// export default redisClient
import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisurl = `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

const redisClient = createClient({ url: redisurl });

redisClient.on("connect", () => console.log("🟡 Redis: connecting..."));
redisClient.on("ready", () => console.log("🟢 Redis: ready"));
redisClient.on("error", (err) => console.error("🔴 Redis error:", err.message));
redisClient.on("reconnecting", () => console.log("🟠 Redis: reconnecting..."));
redisClient.on("end", () => console.log("⚫ Redis: connection closed"));

async function connect() {
    try {
        await redisClient.connect();
        console.log("🟢 Redis connected");
    } catch (error) {
        console.log("❌ Redis connection failed, retrying in 5s");
        setTimeout(connect, 5000);
    }
}

connect();

process.on("SIGINT", async () => {
    await redisClient.disconnect();
});

export default redisClient;