import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Usermodel } from "../models/User.model.js";
import dotenv from "dotenv"
dotenv.config()




export const RegisterController = async (req, res) => {
    const { name, email, password } = req.body





    const CheckemailExist = await Usermodel.findOne({ email: email })

    if (CheckemailExist) {
        return res.status(400).json("user already exist");


    }

    try {

        const Hashepassword = await bcrypt.hash(password, 10)
        const User = await Usermodel.create({
            name,
            email,
            password: Hashepassword,




        })

        res.status(200).json({ User: User })


    } catch (error) {
        console.log(error);

        res.status(500).json(error)
    }


}






export const LoginController = async (req, res) => {


    const { email, password } = req.body

    const CheckemailExist = await Usermodel.findOne({ email: email })


    if (!CheckemailExist) {
        return res.status(404).json("user doesnt exist")
    }

    const CamparePassword = await bcrypt.compare(password, CheckemailExist.password)

    if (!CamparePassword) {
        return res.status(404).json("wrong password")
    }


    try {
        const Makeobject = CheckemailExist.toObject()
        delete Makeobject.password


        const Token = jwt.sign({ email: CheckemailExist.email, _id: CheckemailExist._id, picture: CheckemailExist.picture, role: CheckemailExist.role, name: CheckemailExist.name }, process.env.SECRET_KEY, { expiresIn: "4h" })
        return res.status(200).json({ user: Makeobject, Token })
    } catch (error) {
        console.log(error);

        return res.status(500).json("invaild", error)
    }

}




export const GoogleLoginController = async (req, res) => {


    const { username, email, password, picture } = req.body



    const user = await Usermodel.findOne({ email: email })
    if (user) {

        const Token = jwt.sign({ email: user.email, _id: user._id, picture: user.picture, role: user.role, name: user.name }, process.env.SECRET_KEY, { expiresIn: "4h" })
        res.status(200).json({ user: user, Token })
        console.log(user);
    } else {
        const New = await Usermodel.create({
            name: username,
            email,
            password,
            picture: {
                path: picture,
                public_id: null
            }



        })

        const Makeobject = New.toObject()
        delete Makeobject.password
        const Token = jwt.sign({ email: New.email, _id: New._id, picture: New.picture, role: New.role, name: New.name }, process.env.SECRET_KEY, { expiresIn: "4h" })
        res.status(200).json({ user: Makeobject, Token })

    }

}

export const GoogleRegisterController = async (req, res) => {


    const { username, email, password, picture } = req.body



    const user = await Usermodel.findOne({ email: email })
    if (user) {
        user.role = "user"
        await user.save()

        const Token = jwt.sign({ email: user.email, _id: user._id, picture: user.picture, role: user.role, name: user.name }, process.env.SECRET_KEY, { expiresIn: "4h" })
        res.status(200).json({ user: user, Token })

    } else {
        const New = await Usermodel.create({
            name: username,
            email,
            password,
            role: "user",
            picture: {
                path: picture,
                public_id: null
            }



        })

        const Makeobject = New.toObject()
        delete Makeobject.password
        const Token = jwt.sign({ email: New.email, _id: New._id, picture: New.picture, role: New.role, name: New.name }, process.env.SECRET_KEY, { expiresIn: "4h" })
        res.status(200).json({ user: Makeobject, Token })

    }

}

export const RegisterASHostController = async (req, res) => {
    const { name, email, password, phone } = req.body






    const CheckemailExist = await Usermodel.findOne({ email: email })

    if (CheckemailExist) {
        return res.status(400).json("user already exist");


    }

    try {

        const Hashepassword = await bcrypt.hash(password, 10)
        const User = await Usermodel.create({
            name,
            email,
            password: Hashepassword,
            role: "host",
            phone: phone



        })

        res.status(200).json({ User: User })


    } catch (error) {
        console.log(error);

        res.status(500).json(error)
    }


}

export const GoogleLoginHostController = async (req, res) => {


    const { username, email, password, picture } = req.body


    const user = await Usermodel.findOne({ email: email })
    if (user) {
        user.role = "host"
        await user.save()

        const Token = jwt.sign({ email: user.email, _id: user._id, picture: user.picture, role: user.role, name: user.name }, process.env.SECRET_KEY, { expiresIn: "4h" })
        res.status(200).json({ user: user, Token })
        console.log(user);
    } else {
        const New = await Usermodel.create({
            name: username,
            email,
            password,
            picture,
            role: "host"



        })

        const Token = jwt.sign({ email: New.email, _id: New._id, picture: New.picture, role: New.role, name: New.name }, process.env.SECRET_KEY, { expiresIn: "4h" })
        res.status(200).json({ user: New, Token })

    }

}

