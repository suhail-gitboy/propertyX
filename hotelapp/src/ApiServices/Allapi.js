
import { darken } from "@mui/material/styles"
import { MainapiCall, SERVERurl } from "./MAINapi.js"


// Authentication

export const Registeration = async (data) => {

    return await MainapiCall("POST", `${SERVERurl}/auth/register`, data)
}

export const Login = async (data) => {

    return await MainapiCall("POST", `${SERVERurl}/auth/Login`, data)
}
export const Refreshapi = async () => {

    return await MainapiCall("GET", `${SERVERurl}/auth/refresh`, {})
}
export const Logoutapi = async () => {

    return await MainapiCall("POST", `${SERVERurl}/auth/logout`, {})
}

export const GoogleAuth = async (data) => {

    return await MainapiCall("POST", `${SERVERurl}/auth/googlelogin`, data)
}

export const GoogleRegister = async (data) => {

    return await MainapiCall("POST", `${SERVERurl}/auth/googleregister`, data)
}



export const RegisterAshost = async (data) => {
    return MainapiCall("POST", `${SERVERurl}/auth/register/host`, data)
}

export const RegisterAshostGoogle = async (data) => {
    return MainapiCall("POST", `${SERVERurl}/auth/google/host`, data)
}


// User


export const UpdateUserdata = async (data, reqheaders) => {
    return MainapiCall("PUT", `${SERVERurl}/user/update/profile`, data, reqheaders)
}



export const NewpropertyUpload = async (data, ReqHeaders) => {
    return MainapiCall("POST", `${SERVERurl}/property/new/property`, data, ReqHeaders)
}


// for admin

export const GetAllpropertyadmin = async () => {
    return MainapiCall("GET", `${SERVERurl}/property/getall`, {})
}
export const GetpropertyUpdate = async (id, data, reqheaders) => {
    return MainapiCall("PUT", `${SERVERurl}/property/update/${id}`, data, reqheaders)
}

// propertymangement adminside

export const GetApproval = async (id, header) => {
    return MainapiCall("PUT", `${SERVERurl}/property/approve/${id}`, {}, header)
}

export const RejectApproval = async (id, header) => {
    return MainapiCall("PUT", `${SERVERurl}/property/reject/${id}`, {}, header)
}

export const RemoveApproval = async (id, header) => {
    return MainapiCall("PUT", `${SERVERurl}/property/remove/${id}`, {}, header)
}

// user property manage

export const Hideproperty = async (id, header) => {
    return MainapiCall("PUT", `${SERVERurl}/property/hide/${id}`, {}, header)
}
export const Deleteproperty = async (id, header) => {
    return MainapiCall("DELETE", `${SERVERurl}/property/delete/${id}`, {}, header)
}








// usermanagement admin

export const Alluserapi = async (header) => {
    return MainapiCall("GET", `${SERVERurl}/user/alluser`, {}, header)
}

export const Singlepropertyapi = async (id) => {
    return MainapiCall("GET", `${SERVERurl}/property/${id}`, {})
}

// add likes comments section

export const AddlikeApi = async (id, ReqHeaders) => {
    return MainapiCall("PUT", `${SERVERurl}/property/like/${id}`, {}, ReqHeaders)
}




// wishlist 


export const AddWishlist = async (id, ReqHeaders) => {
    return MainapiCall("POST", `${SERVERurl}/property/wishlist/${id}`, {}, ReqHeaders)
}
export const GetwishlistApi = async (ReqHeaders) => {
    return MainapiCall("GET", `${SERVERurl}/property/wishlist/get`, {}, ReqHeaders)
}

// for comments

export const AddcommentApi = async (id, body, ReqHeaders) => {
    return MainapiCall("PUT", `${SERVERurl}/property/addcomment/${id}`, body, ReqHeaders)
}

export const UpdatecommentApi = async (id, commentId, body, ReqHeaders) => {
    return MainapiCall("PUT", `${SERVERurl}/property/updatecomment/${id}/${commentId}`, body, ReqHeaders)
}

export const DeletecommentApi = async (id, CommentId, ReqHeaders) => {
    return MainapiCall("PUT", `${SERVERurl}/property/deletecomment/${id}/${CommentId}`,
        {}, ReqHeaders)
}


//for host property


export const HostpropertyApi = async (id) => {
    return MainapiCall("GET", `${SERVERurl}/user/allproperty/${id}`, {})
}

// follow unfollow user


export const GetuserData = async (id) => {
    return MainapiCall("GET", `${SERVERurl}/user/get/${id}`, {})
}

export const FollowhostApi = async (id, headers) => {
    console.log("from main", id);

    return MainapiCall("PUT", `${SERVERurl}/user/follow/${id}`, {}, headers)
}

export const unFollowhostApi = async (id, headers) => {
    return MainapiCall("PUT", `${SERVERurl}/user/unfollow/${id}`, {}, headers)
}

// user Booking

export const checkAvailabilityApi = async (body) => {
    return MainapiCall("POST", `${SERVERurl}/booking/checkavailability`, body)
}


export const NewbookingApi = async (body, headers) => {
    return MainapiCall("POST", `${SERVERurl}/booking/newbooking`, body, headers)
}
export const bookinghistoryApi = async (headers) => {
    return MainapiCall("GET", `${SERVERurl}/booking/allbooking`, {}, headers)
}

export const cancelbookingApi = async (id, headers) => {
    return MainapiCall("PUT", `${SERVERurl}/booking/cancelbooking/${id}`, {}, headers)
}



// bookingconfirmed

export const Confirmbooking = async (id, headers) => {
    return MainapiCall("PUT", `${SERVERurl}/booking/confirmation/${id}`, {}, headers)
}

export const Cancelbookingbyhost = async (id, body, headers) => {
    return MainapiCall("PUT", `${SERVERurl}/booking/cancelbookingbyhost/${id}`, body, headers)
}

// payment

export const NewpaymentApi = async (body, headers) => {
    return MainapiCall("POST", `${SERVERurl}/booking/payment`, body, headers)
}

export const NewStartconversation = async (id, headers) => {
    return MainapiCall("POST", `${SERVERurl}/conversation/${id}`, {}, headers)
}

export const APIGetmessagehistory = async (chatid, headers) => {
    return MainapiCall("GET", `${SERVERurl}/message/${chatid}`, {}, headers)
}

export const APInewmessage = async (body, headers) => {
    return MainapiCall("POST", `${SERVERurl}/message/newmessage`, body, headers)
}

export const AllmessagedHistory = async (id, headers) => {
    return MainapiCall("GET", `${SERVERurl}/conversation/${id}`, {}, headers)
}

export const Alluserdata = async (data, headers) => {
    return MainapiCall("POST", `${SERVERurl}/conversation/alluser/data`, data, headers)
}


// notfiy

export const Allnotifyadmin = async (data) => {
    return MainapiCall("POST", `${SERVERurl}/booking/notifybyadmin`, data)
}

// deletemessage

export const Deleteemessage = async (data) => {
    return MainapiCall("DELETE", `${SERVERurl}/message/delete`, data)
}


export const propertyVector = async (data) => {

    console.log({ query: data });

    return MainapiCall("POST", `${SERVERurl}/property/vector`, { query: data })
}
export const Getfullproperyforinfinite = async (param = 1) => {
    return MainapiCall(
        "GET",
        `${SERVERurl}/property/getfull?per_page=2&page=${param}`
    );
};
