import { createClient } from "redis";

const redisClient = createClient({
    socket: {
        host: "127.0.0.1",
        port: 6379
    }
});

redisClient.on("connect", () => console.log("🟡 Redis: connecting..."));
redisClient.on("ready", () => console.log("🟢 Redis: ready"));
redisClient.on("error", err => console.error("🔴 Redis error:", err));
redisClient.on("reconnecting", () => console.log("🟠 Redis: reconnecting"));
redisClient.on("end", () => console.log("⚫ Redis: closed"));

export async function connectRedis() {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
}

export default redisClient;
