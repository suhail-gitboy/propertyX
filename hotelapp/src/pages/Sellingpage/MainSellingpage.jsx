import React, { useEffect, useState } from 'react'
import Stepper, { Step } from '../../Utils/UILIBRARY/Stepper';
import PropertyPurposeSelector from './SellorRent';
import PropertyTypeSelector from './PropertyTyeSelection';
import PropertyBasicForm from './Detail';
import PropertyDetailsForm from './Detail';
import LocationPicker from './Mapdetail';
import IamgeUpload from './IamgeUpload';
import { ContextDatas } from '../../Common/ContextWrapped';
import InputBase from '@mui/material/InputBase';
import DetailSucess from '../../Components/modals/DetailSucess';
import { NewpropertyUpload } from '../../ApiServices/Allapi';
import Loading from '../../Components/Loading';
import { LoaderOne } from '../../Utils/UILIBRARY/Loader';


const MainSellingpage = () => {

    const [purpose, setPurpose] = useState("")
    const [propertyType, setPropertyType] = useState("");
    const [step, SetSteps] = useState(1)
    const [location, setLocation] = useState({
        placeName: "",
        latitude: "",
        longitude: "",
    });





    const { popUpinputsuccess, Setpopupinputsuccess, loading, Setloading, User, token, property, setProperty } = ContextDatas()


    useEffect(() => {
        Setloading(false)
    }, [])


    const UploadProperty = async () => {

        Setloading(true)
        const ReqHeaders = {
            "Authorization": `Bearer ${token}`
        }

        const formData = new FormData()

        for (let key in property) {
            if (key !== "images" && key !== "seller" && key !== "location") {
                formData.append(key, property[key])
            }
        }

        // append images ONE BY ONE
        property.images.forEach((file) => {
            formData.append("images", file)
        })

        // objects must be stringified
        formData.append("seller", JSON.stringify(property.seller))
        formData.append("location", JSON.stringify(property.location))



        try {
            const Response = await NewpropertyUpload(formData, ReqHeaders)
            if (Response.status == 200) {
                Setpopupinputsuccess(true)
                Setloading(false)
                Navigate("/")
            } else {
                console.log(Response);
                Setloading(false)
            }
        } catch (error) {
            console.log("error found", error);
            Setloading(false)

        }


    }


    return (
        <div>
            {
                loading && <div className='fixed inset-0 bg-black/25 flex justify-center z-50 items-center min-h-screen'>
                    <div className="flex items-center gap-2">
                        <p className='text-xl text-gray-200 flex gap-4 items-center'> Uploading<LoaderOne /> </p>
                    </div>
                </div>
            }

            <Stepper UploadProperty={UploadProperty} initialStep={step}>
                {/* type */}
                <Step>
                    <PropertyPurposeSelector
                        value={purpose}
                        onChange={setPurpose}
                        setProperty={setProperty}
                        property={property}
                    />
                </Step>
                {/* property type */}
                <Step>


                    <PropertyTypeSelector
                        value={propertyType}
                        onChange={setPropertyType}
                        setProperty={setProperty}
                        property={property}
                    />

                </Step>
                {/* details */}
                <Step>
                    <h1 className="text-3xl font-semibold">Details property</h1>
                    <p className="text-gray-500">price,name,etc</p>
                    <PropertyDetailsForm setProperty={setProperty}
                        property={property} />
                </Step>
                {/* map location */}
                <Step>
                    <h1 className="text-3xl font-semibold">Set Location</h1>
                    <p className="text-gray-500">area, city</p>
                    <LocationPicker setProperty={setProperty}
                        property={property} />
                </Step>
                {/* image upload
                 */}

                <Step>
                    <h1 className="text-3xl font-semibold">Give a Attractive</h1>
                    <p className="text-gray-500">images</p>
                    <IamgeUpload setProperty={setProperty}
                        property={property} />
                </Step>
            </Stepper>

        </div>
    )
}

export default MainSellingpage
