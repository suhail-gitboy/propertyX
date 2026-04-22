import React from "react"


const CardSkeleton = () => (
    <div className="w-full  mx-auto animate-pulse">
        <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100">
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-200" />
        </div>
        <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between">
                <div className="h-3 bg-gray-100 rounded w-2/3" />
                <div className="h-3 bg-gray-100 rounded w-16" />
            </div>
            <div className="h-3 bg-gray-100 rounded w-1/2" />
            <div className="h-3 bg-gray-100 rounded w-1/3" />
            <div className="flex items-center justify-between pt-1">
                <div className="h-3 bg-gray-100 rounded w-1/4" />
                <div className="h-3 bg-gray-100 rounded w-8" />
            </div>
        </div>
    </div>
)

const CardSkeletonGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => <CardSkeleton key={i} />)}
    </div>
)

export default CardSkeletonGrid