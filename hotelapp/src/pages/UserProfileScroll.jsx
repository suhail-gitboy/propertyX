import React from 'react'
import PropertyCard from '../Components/MediaScroll'
const properties = [
    {
        title: "Luxury Villa",
        sellerName: "Ameer Suhail",
        sellerPhoto: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994", "https://images.unsplash.com/photo-1568605114967-8130f3a36994", "https://images.unsplash.com/photo-1568605114967-8130f3a36994", "https://images.unsplash.com/photo-1568605114967-8130f3a36994"],
        likes: 120,
        comments: [
            { commentedUserId: "u1", commentText: "Amazing place 🔥" },
            { commentedUserId: "u2", commentText: "Worth the price" }
        ]
    },

    {
        title: "Beach House",
        sellerName: "Ameer Suhail",
        sellerPhoto: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        images: ["https://images.unsplash.com/photo-1507089947368-19c1da9775ae"],
        likes: 210,
        comments: [{ commentedUserId: "u6", commentText: "Dream home 😍" }]
    }
];
const userProfileScroll = () => {
    return (
        <div>
            <div className="flex justify-end">
                <Link className="text-3xl text-blue-700 "><Fahome /></Link>
            </div>
            <div className='pt-40 px-4  pb-10 w-full  '>
                <div className="mx-auto md:w-4/5  min-h-screen">
                    {/* feed */}
                    <PropertyCard property={properties} />
                </div>

            </div>
        </div>
    )
}

export default userProfileScroll
