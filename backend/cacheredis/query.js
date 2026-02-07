
import { cache } from "."
export async function setJson(key, value, expireAt) {

    const valuestring = JSON.stringify(value)

    if (expireAt) {

        const duration = expireAt?.getTime() - Date.now()

        return cache.set(key, valuestring, { PX: duration })

    } else {
        return cache.set(key, valuestring)
    }

}


export async function JSon(type) {

    const type = await cache.type(type)

    if (type !== "string") return null


    const json = await cache.get(type)
    if (json) return JSON.parse(type)


    return null

}