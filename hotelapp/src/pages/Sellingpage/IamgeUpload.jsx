import React, { useState } from 'react'
import { ImagePlus } from "lucide-react";
const IamgeUpload = ({ property, setProperty }) => {

    const [Previews, Setpreview] = useState([])



    const FunctionUploadImg = (e) => {
        const File = e.target.files[0]
        // setpreview

        const Images = property.images
        Images.push(File)
        setProperty((prev) => ({ ...prev, images: Images }))
        console.log(File);

        const Makefileurl = URL.createObjectURL(File)


        Setpreview((prev) => [...prev, Makefileurl])
    }




    return (
        <div className='h-auto'>

            {
                Previews.length < 6 ? (<>
                    <label
                        htmlFor="imageUpload"
                        className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-300 p-10 text-center transition hover:border-black hover:bg-gray-50"
                    >
                        <input
                            id="imageUpload"
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => FunctionUploadImg(e)}
                        />

                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                            <ImagePlus size={28} className="text-gray-700" />
                        </div>

                        <div>
                            <p className="font-medium">Upload photos</p>
                            <p className="text-sm text-gray-500">
                                JPG or PNG · up to 10 images
                            </p>
                        </div>
                    </label></>) : (<>
                        your limit has reached</>)
            }

            <div className="py-4 flex h-50 px-4  gap-4">
                {/* input */}

                {

                    Previews.map((img, key) => (
                        <div key={key}><img src={img} className='h-40 w-35 rounded-md' alt="" /></div>
                    ))

                }
            </div>

        </div>
    )
}

export default IamgeUpload
