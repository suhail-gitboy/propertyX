import { MainapiCall } from "../MAINapi"
export const Update = async (data) => {


    const Response = await MainapiCall(`http://localhost:3000/userbooked/${data.id}`, "PUT", data)

    return Response
}