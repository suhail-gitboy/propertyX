import axios from "axios"




export const MainapiCall = async (Method, Url, Data, reqHeader) => {

    const reqConfig = {
        method: Method,
        url: Url,
        data: Data,
        headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }


    }

    return await axios(reqConfig).then(res => res).catch(err => err)


}