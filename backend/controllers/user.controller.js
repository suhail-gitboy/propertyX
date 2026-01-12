import { Usermodel } from "../models/User.model.js";
import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary";
import { Propertymodel } from "../models/Property.model.js";


export const UpdateUserprofile = async (req, res) => {
    try {
        const { name, password, phone } = req.body;
        const userId = req.payload._id;

        // 1️⃣ Find user
        const user = await Usermodel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 2️⃣ Handle image update
        if (req.file) {

            if (user.picture?.public_id) {
                await cloudinary.uploader.destroy(user.picture.public_id);
            }

            user.picture = {
                url: req.file.path,
                public_id: req.file.filename,
            };
        }

        if (name) user.name = name;
        if (phone) user.phone = phone;

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }


        const updatedUser = await user.save();


        const userObj = updatedUser.toObject();
        delete userObj.password;

        res.status(200).json(userObj);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Profile update failed" });
    }
};



export const Totalusers = async (req, res) => {
    const adminemail = req.payload.email


    try {
        const Users = await Usermodel.find({ email: { $ne: adminemail } }).sort({ createdAt: -1 })

        res.status(200).json(Users)


    } catch (error) {
        res.status(500).json(error)
    }
}


export const UserANDtheirproperty = async (req, res) => {
    const { id } = req.params



    try {
        const Datas = await Propertymodel.find({ "seller.sellerId": id })
        res.status(200).json(Datas)
    } catch (error) {
        res.status(500).json(error)
    }

}

export const FollowUser = async (req, res) => {

    const currentUser = req.payload._id

    // followingusers id
    const { id } = req.params


    try {

        await Usermodel.findByIdAndUpdate({ _id: id }, { $addToSet: { followers: currentUser } })

        await Usermodel.findByIdAndUpdate({ _id: currentUser }, { $addToSet: { following: id } })

        res.status(200).json({ message: "Followed successfully" });

    } catch (error) {
        res.status(500).json(error)

    }
}

export const UnfollowUser = async (req, res) => {
    const currentUser = req.payload._id

    // followingusers id
    const { id } = req.params

    try {

        await Usermodel.findByIdAndUpdate({ _id: id }, { $pull: { followers: currentUser } })

        await Usermodel.findByIdAndUpdate({ _id: currentUser }, { $pull: { following: id } })

        res.status(200).json({ message: "Followed successfully" });

    } catch (error) {
        res.status(500).json(error)

    }



}

export const GETsingleuser = async (req, res) => {
    const { id } = req.params


    try {

        const User = await Usermodel.findOne({ _id: id }).populate({
            path: "followers",
            select: "name picture "
        }).populate({
            path: "following",
            select: "name picture "
        })


        return res.status(200).json(User)
    } catch (error) {
        return res.status(500).json(error)
    }
}

