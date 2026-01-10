
import { MainapiCall } from "../MAINapi"
import { Wishlisturl } from "../url"

export const GetforDelete = async (id) => {

    await MainapiCall(`http://localhost:3000/wishlist/${id}`, "DELETE", null)

}

export const GetDeleteBoooking = async (id) => {
    await MainapiCall(`http://localhost:3000/userbooked/${id}`, "DELETE", null)
}