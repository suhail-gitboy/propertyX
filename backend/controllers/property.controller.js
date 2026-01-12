

import { Propertymodel } from "../models/Property.model.js";
import { sendWhatsApp } from "../services/WatsappService.js";
import dotenv from "dotenv"
import { Wishlist } from "../models/Wishlist.js";
import { v2 as cloudinary } from "cloudinary";
dotenv.config()
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

    try {
        const Newproperty = await Propertymodel.create({
            title,
            description,
            propertyType,
            listingType,
            price,
            squareFeet: parsedSquareFeet,
            roomsAvailable: RoomsAvailableTonumber,
            amenities,
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

            images: Images


        })


        res.status(200).json(Newproperty)
        console.log(Newproperty);


        await sendWhatsApp({
            to: process.env.ADMIN_WHATSAPP,
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

    const Data = await Propertymodel.find().sort({ createdAt: -1 })

    try {
        res.status(200).json(Data)
    } catch (error) {
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

