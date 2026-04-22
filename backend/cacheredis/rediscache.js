
import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();
let pass = null
let redisurl
pass == null ? redisurl = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` : redisurl = `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`


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