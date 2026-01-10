import { MainapiCall } from "../MAINapi"
import { BookedUrl, Wishlisturl } from "../url"


export const Addapi = async (data) => {

    return await MainapiCall(Wishlisturl, "POST", data)

}

export const AddApiBooking = async (data) => {
    return await MainapiCall(BookedUrl, "POST", data)
}