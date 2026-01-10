import React from 'react'
import { timeAgo } from '../Utils/UILIBRARY/Realtime'

const Reviews = ({ index, review }) => {
    return (
        <div key={index} className="space-y-3">

            <div className="flex items-center gap-3">
                <img
                    src={review.picture.url}
                    alt={review.name}
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <p className="font-medium">{review.name}</p>
                    <p className="text-sm text-gray-500">{timeAgo(review.createdAt)}</p>
                </div>
            </div>

            <p className="text-sm text-gray-500">
                ⭐⭐⭐⭐⭐ · {review.date} · {review.stay}
            </p>

            <p className="text-gray-800 leading-relaxed line-clamp-3">
                {review.text}
            </p>


        </div>
    )
}

export default Reviews
