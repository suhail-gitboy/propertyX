import React from 'react'

const ImagesHotal = ({ images, Setmodalimage }) => {
    return (
        <div className='fixed inset-0  bg-black/65 flex flex-col justify-center items-center  z-50 '>
            <div className="flex justify-end items-end w-full">
                <p className='text-white font-semibold py-3 text-2xl p-6' onClick={() => Setmodalimage(false)}>close</p>
            </div>
            <div className="w-4/6 mt-20  h-screen overflow-auto ">
                {
                    images.map((data, key) => (
                        <div className='p-4 my-2'>
                            <img src={data.url} alt="" className='w-full h-100' />
                        </div>

                    ))
                }
            </div>

        </div>
    )
}

export default ImagesHotal
