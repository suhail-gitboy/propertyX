

import { Propertymodel } from "../models/Property.model.js";
import { sendWhatsApp } from "../services/WatsappService.js";
import dotenv from "dotenv"
import { Wishlist } from "../models/Wishlist.js";
import { v2 as cloudinary } from "cloudinary";
import { Booking } from "../models/Booking.model.js";
import { Aggregate } from "mongoose";
import { getEmbedding, textGenerate } from "../services/Openaiembedding.js";
import { Deletefromit, GETdatafromcache, keys, SavePropertycache } from "../cacheredis/Savedata.js";

dotenv.config()
function cleanText(value) {
    if (value === null || value === undefined) return "";
    if (typeof value === "string") return value;
    if (typeof value === "number") return value.toString();
    if (Array.isArray(value)) return value.join(", ");
    return JSON.stringify(value);
}
export const GEtAllpropertyinfinte = async (req, res) => {



    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.per_page) || 2;
        const skip = (page - 1) * perPage;
        console.log(page);



        const properties = await Propertymodel
            .find({ isActive: "approved" }).select("-embedding")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(perPage + 1)


        const hasMore = properties.length > perPage;
        if (hasMore) properties.pop();

        res.status(200).json({ prop: properties, hasMore });
    } catch (error) {
        console.error("GEtAllpropertyinfinte error:", error);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};



export const GEtAllpropertyinfinte = async (req, res) => {



    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.per_page) || 2;
        const skip = (page - 1) * perPage;
        console.log(page);



        const properties = await Propertymodel
            .find({ isActive: "approved" }).select("-embedding")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(perPage + 1)


        const hasMore = properties.length > perPage;
        if (hasMore) properties.pop();

        res.status(200).json({ prop: properties, hasMore });
    } catch (error) {
        console.error("GEtAllpropertyinfinte error:", error);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};


export const NewpropertyUpload = async (req, res) => {


    const { title, description, propertyType, listingType, price, squareFeet, roomsAvailable, amenities, location } = req.body


    const RoomsAvailableTonumber = Number(roomsAvailable)

    const Images = req?.files?.map((data) => {
        return {
            url: data.path,
            public_id: data.filename
        }
    })




    const User = req.payload
    const locationParsed = JSON.parse(location)


    const parsedSquareFeet =
        squareFeet && squareFeet !== "null"
            ? Number(squareFeet)
            : undefined;

    // Prepare clean text for embedding
    const amenitiesText = Array.isArray(amenities)
        ? amenities.join(", ")
        : cleanText(amenities);
    const textToEmbed = [
        `Title: ${cleanText(title) || ""}`,
        `City: ${cleanText(locationParsed?.city) || ""}`,
        `Price per night: ${cleanText(price) || ""}`,
        `Amenities: ${amenitiesText || ""}`,
        `Description: ${cleanText(description) || ""}`
    ].join(". ");

    let embedding = [];

    try {
        embedding = await getEmbedding(textToEmbed);
        console.log("Embedding length:", embedding.length); // should print 384
    } catch (err) {
        console.error("Embedding failed:", err.message);
    }


    try {
        const Newproperty = await Propertymodel.create({
            title,
            description,
            propertyType,
            listingType,
            price,
            squareFeet: parsedSquareFeet,
            roomsAvailable: RoomsAvailableTonumber,
            amenities: amenities,
            seller: {
                sellerId: User._id,
                name: User.name,
                email: User.email,
                phone: User.phone ? User.phone : null,
                picture: User.picture

            },
            location: {
                address: locationParsed.address,
                city: locationParsed.city,
                pincode: locationParsed.pincode,
                lat: locationParsed.lat,
                lng: locationParsed.lng
            },

            images: Images,
            embedding: embedding


        })
        await Deletefromit(keys.PROPERTY)

        res.status(200).json(Newproperty)
        console.log(Newproperty);


        await sendWhatsApp({
            to: User.phone ? `watsapp:91+${User.phone}` : process.env.ADMIN_WHATSAPP,
            message: `
🏠 *New Property Submitted*

Title: ${title}
Type: ${propertyType}
Listing: ${listingType}
Price: ₹${price}

👤 Host: ${User.name}
📞 Phone: ${User.phone || "Not provided"}

Please review & approve.
link :"http://localhost:5173/admin/product"
  `
        });



    } catch (error) {

        res.status(500).json(error)
        console.log(error);


    }





}


export const Updateproperty = async (req, res) => {
    try {
        const {
            title,
            description,
            propertyType,
            listingType,
            price,
            squareFeet,
            roomsAvailable,
            amenities,
            location,
            existingImages,
            removedImages
        } = req.body;




        const { id } = req.params;

        const parsedAmenities = amenities ? JSON.parse(amenities) : [];
        const parsedLocation = location ? JSON.parse(location) : {};
        const parsedExistingImages = existingImages
            ? JSON.parse(existingImages)
            : [];
        const parsedRemovedImages = removedImages
            ? JSON.parse(removedImages)
            : [];

        if (parsedRemovedImages.length > 0) {
            for (const public_id of parsedRemovedImages) {
                await cloudinary.uploader.destroy(public_id);
            }
        }
        const newImages = req.files?.map(file => ({
            url: file.path,
            public_id: file.filename
        })) || [];

        const finalImages = [
            ...parsedExistingImages, // already uploaded
            ...newImages             // newly uploaded
        ];
        const updatedProperty = await Propertymodel.findByIdAndUpdate(
            { _id: id }
            ,
            {
                title,
                description,
                propertyType,
                listingType,
                price,
                squareFeet,
                roomsAvailable,
                amenities: parsedAmenities,
                location: {
                    address: parsedLocation.address,
                    city: parsedLocation.city,
                    pincode: parsedLocation.pincode,
                    lat: parsedLocation.lat,
                    lng: parsedLocation.lng
                },
                images: finalImages
            },
            { new: true }
        );

        await Deletefromit(keys.PROPERTY)

        res.status(200).json({
            success: true,
            message: "Property updated successfully",
            data: updatedProperty
        });







    } catch (error) {
        res.status(500).json(error)
    }
}


export const Listpropertyall = async (req, res) => {


    try {


        let Data = await GETdatafromcache(keys.PROPERTY)
        if (!Data) {
            Data = await Propertymodel.find().sort({ createdAt: -1 }).select("-embedding")



            await SavePropertycache(Data, keys.PROPERTY)
        }



        const topBookedProperties = await Booking.aggregate([

            {
                $match: {
                    bookingStatus: "confirmed"
                }
            },


            {
                $group: {
                    _id: "$propertyId",
                    totalBookings: { $sum: 1 },
                    revenue: { $sum: "$totalPrice" }
                }
            },

            { $sort: { totalBookings: -1 } },


            { $limit: 3 },


            {
                $lookup: {
                    from: "properties",
                    localField: "_id",
                    foreignField: "_id",
                    as: "property"
                }
            },
            { $unwind: "$property" },


            {
                $addFields: {
                    avgRating: {
                        $cond: [
                            { $gt: [{ $size: "$property.comments" }, 0] },
                            { $avg: "$property.comments.rating" },
                            0
                        ]
                    }
                }
            },


            {
                $project: {
                    _id: 0,
                    propertyId: "$property._id",
                    title: "$property.title",
                    image: { $arrayElemAt: ["$property.images", 0] },

                    sellerName: "$property.seller.name",

                    totalBookings: 1,
                    revenue: 1,
                    avgRating: { $round: ["$avgRating", 1] }
                }
            }
        ]);

        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);


        const dominatedbybookings = await Booking.aggregate([
            {
                $match: {
                    createdAt: { $gte: lastWeek },
                    bookingStatus: "confirmed"
                }
            },

            // 🔹 Host lookup
            {
                $lookup: {
                    from: "users",
                    localField: "hostId",
                    foreignField: "_id",
                    as: "host"
                }
            },
            { $unwind: "$host" },


            {
                $lookup: {
                    from: "properties",
                    localField: "propertyId",
                    foreignField: "_id",
                    as: "property"
                }
            },
            { $unwind: "$property" },


            {
                $group: {
                    _id: "$hostId",
                    hostName: { $first: "$host.name" },
                    hostImage: { $first: "$host.picture" },

                    totalBookings: { $sum: 1 },
                    revenue: { $sum: "$totalPrice" },


                    properties: {
                        $addToSet: {
                            propertyId: "$property._id",
                            title: "$property.title",
                            price: "$property.price",
                            picture: "$property.images"
                        }
                    }
                }
            },

            { $sort: { totalBookings: -1 } },
            { $limit: 3 }
        ]);

        const totalbookingoflastweek = await Booking.aggregate([
            {
                $match: {
                    createdAt: { $gte: lastWeek },
                    bookingStatus: "confirmed"

                }


            }, {

                $group: {
                    _id: null,
                    totalbooking: { $sum: 1 },
                    totalrevenue: { $sum: "$totalPrice" }
                }
            }


        ])

        const Topuser = await Booking.aggregate([
            {
                $match: {
                    bookingStatus: "confirmed"
                }
            },


            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },

            {
                $group: {
                    _id: "$userId",
                    totalbooking: { $sum: 1 },
                    username: { $first: "$user.name" },
                    picture: { $first: "$user.picture" }
                }
            },


            { $sort: { totalbooking: -1 } },

            { $limit: 2 }
        ]);




        res.status(200).json({ property: Data, topuser: Topuser, tophosts: topBookedProperties, lastweakbooking: dominatedbybookings, totalrevenue: totalbookingoflastweek })
    } catch (error) {
        console.log(error);

        res.status(500).json(error)
    }
}

export const Approval = async (req, res) => {
    const { id } = req.params
    console.log(id);

    const Data = await Propertymodel.findByIdAndUpdate({ _id: id }, {
        isActive: "approved"
    })

    try {
        console.log(Data);

        res.status(200).json(Data)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const RejectApproval = async (req, res) => {
    const { id } = req.params
    console.log(id);

    const Data = await Propertymodel.findByIdAndUpdate({ _id: id }, {
        isActive: "rejected"
    })

    try {
        console.log(Data);

        res.status(200).json(Data)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const RemoveApproved = async (req, res) => {
    const { id } = req.params
    console.log(id);

    const Data = await Propertymodel.findByIdAndUpdate({ _id: id }, {
        isActive: "pending"
    })

    try {
        console.log(Data);

        res.status(200).json(Data)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const SingleProperty = async (req, res) => {
    const { id } = req.params
    try {
        const Data = await Propertymodel.findOne({ _id: id })



        res.status(200).json(Data)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const Addlike = async (req, res) => {
    try {
        const user = req.payload              // from auth middleware
        const _id = req.params.id             // property id

        // 1️⃣ Check if already liked
        const alreadyLiked = await Propertymodel.findOne({
            _id,
            "likes.userId": { $in: [user._id] }
        })

        // 2️⃣ Toggle like
        const property = await Propertymodel.findByIdAndUpdate(
            _id,
            alreadyLiked
                ? { $pull: { likes: { userId: user._id } } } // 🔴 unlike
                : {
                    $addToSet: {
                        likes: {
                            userId: user._id,
                            name: user.name,
                            email: user.email
                        }
                    }
                }, // 🟢 like
            { new: true }
        )

        res.status(200).json({
            liked: !alreadyLiked,
            likesCount: property.likes.length,
            likes: property.likes
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



export const Addtowishlist = async (req, res) => {

    const email = req.payload.email
    const { id } = req.params

    if (!id) {
        console.log("Property ID is required");

        return res.status(400).json({ message: "Property ID is required" });
    }

    const Exist = await Wishlist.findOne({
        userEmail: email,
        property: id
    })

    if (Exist) {
        const Deleted = await Wishlist.deleteOne({ _id: Exist._id })


        return res.status(200).json("deleted")
    }
    const wishlist = await Wishlist.create({
        userEmail: email,
        property: id

    })
    const Populated = await wishlist.populate({
        path: "property",
        select: "title seller"

    })
    console.log(Populated);

    res.status(201).json(Populated);

}

export const GetpropertySaved = async (req, res) => {

    const email = req.payload.email

    try {

        const Find = await Wishlist.find({ userEmail: email }).populate({
            path: "property",
            select: "title price listingtype images location isAvailable"
        }).sort({ updatedAt: -1 })

        res.status(200).json(Find)

    } catch (error) {
        res.status(500).json(error)

    }
}



// add update delete comment

export const Addcomment = async (req, res) => {

    const { text, rating } = req.body
    const user = req.payload
    const { id } = req.params




    const Comment = {
        userId: user._id,
        name: user.name,
        text: text,
        rating: rating ? rating : null,
        picture: {
            url: typeof user.picture == "string" ? user.picture : user.picture.url,
            public_id: user.picture?.public_id || null
        }

    }
    try {
        const Newcomment = await Propertymodel.findByIdAndUpdate({ _id: id }, {
            $push: { comments: Comment }
        },
            { new: true })
        res.status(200).json(Newcomment.comments)

    } catch (error) {
        res.status(500).json(error)

    }



}
export const Updatecomment = async (req, res) => {
    const { text, rating } = req.body
    const user = req.payload
    const { id, commentId } = req.params


    try {
        const Update = await Propertymodel.findOneAndUpdate({ _id: id, "comments._id": commentId }, {
            $set: {
                "comments.$.text": text,
                "comments.$.rating": rating,
            }
        }, {
            new: true
        })
        console.log(Update);

        res.status(200).json(Update.comments)

    } catch (error) {
        res.status(500).json(error)
    }
}
export const Deletecomment = async (req, res) => {

    const user = req.payload
    const { id, commentId } = req.params
    console.log(id, commentId);


    try {
        const propertyUpdate = await Propertymodel.findOneAndUpdate(
            { _id: id, "comments._id": commentId },
            {
                $pull: {
                    comments: { _id: commentId }
                }
            },
            { new: true }
        );

        if (!propertyUpdate) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json(propertyUpdate.comments);

    } catch (error) {
        res.status(500).json(error);
    }

}


export const Hideproperty = async (req, res) => {
    const { id } = req.params
    console.log(id);





    try {

        const Checkif = await Propertymodel.findById({ _id: id })


        Checkif.isAvailable = !Checkif.isAvailable;
        await Checkif.save();







        res.status(200).json(Checkif.isAvailable)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const removeproperty = async (req, res) => {
    const { id } = req.params
    console.log(id);

    const Data = await Propertymodel.findByIdAndDelete({ _id: id })

    try {
        console.log(Data);

        res.status(200).json(Data)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const Vectorindex = async (req, res) => {
    const { query } = req.body;
    try {

        console.log(query)

        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const queryEmbedding = await getEmbedding(query);

        const results = await Propertymodel.aggregate([
            {
                $vectorSearch: {
                    index: "vector_index",
                    path: "embedding",
                    queryVector: queryEmbedding,
                    numCandidates: 100,
                    limit: 5
                }
            },
            {
                $project: {
                    property_id: "$_id",     // rename _id
                    title: 1,
                    location: "$location.city",
                    rating: 1,


                    image: { $arrayElemAt: ["$images", 0] },


                    score: { $meta: "vectorSearchScore" },

                    _id: 0
                }
            },


        ]);

        const summary = await textGenerate(results, query)



        res.status(200).json({ results: results, summary: summary });

    } catch (error) {
        console.error("Vector search failed:", error);
        res.status(500).json({ message: "Vector search failed" });
    }



}
