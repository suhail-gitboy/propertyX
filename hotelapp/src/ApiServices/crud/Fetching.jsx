import Wishlist from "../../Components/Wishlist"
import { MainapiCall } from "../MAINapi"

import { Wishlisturl } from "../url"


export const Fetchingdata = async () => {

    return await MainapiCall(Wishlisturl, "POST", null)

}