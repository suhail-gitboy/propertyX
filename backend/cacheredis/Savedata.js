import { Durationcaching } from "../config/datacredential.js";

import { JSon, setJson } from "./query.js";
import redisClient from "./rediscache.js";
export const keys = {
    PROPERTY: "PROPERTY",
    SCROLLABLE: "SCROLLABLE",
    BOOKING: "BOOKING",
    MESSAGE: "MESSAGE",
    USER: "USER"
}


// save to it redis

export async function SavePropertycache(property, keys) {




    return setJson(keys, property, Number(Durationcaching.durationMain))

}

// get from it 
export async function GETdatafromcache(keys) {


    return JSon(keys)

}

export async function Deletefromit(keys) {
    await redisClient.del(keys)
}