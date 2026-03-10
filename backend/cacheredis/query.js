

import redisClient from "./rediscache.js"
export async function setJson(key, value, expireAt) {

    const valuestring = JSON.stringify(value)

    if (expireAt) {



        return redisClient.set(key, valuestring, { PX: expireAt })

    } else {
        return cache.set(key, valuestring)
    }

}


export async function JSon(type) {

    const typeOfdata = await redisClient.type(type)

    if (typeOfdata !== "string") return null


    const json = await redisClient.get(type)
    if (json) return JSON.parse(json)


    return null

}