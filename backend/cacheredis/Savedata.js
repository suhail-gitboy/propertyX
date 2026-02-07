import { Durationcaching } from "../config/datacredential";
import { Propertymodel } from "../models/Property.model";
import { JSon, setJson } from "./query";
import cache from "."
export const keys = {
    PROPERTY: "PROPERTY",
    BOOKING: "BOOKING",
    MESSAGE: "MESSAGE"
}


// save to it redis

export async function SavePropertycache(property) {




    return setJson(keys.PROPERTY, { data: property }, new Date(Date.now()) + Number(Durationcaching.durationMain))

}

// get from it 
export async function GETdatafromcache(keys) {


    return JSon(keys)

}

export async function Deletefromit(keys) {
    await cache.del(keys)
}