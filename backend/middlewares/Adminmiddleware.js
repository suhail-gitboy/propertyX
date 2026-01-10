import jwt from "jsonwebtoken";

export const Adminmiddlware = (req, res, next) => {


    const Token = req.headers?.authorization?.split(" ")[1]


    if (Token) {
        const Decoded = jwt.verify(Token, process.env.SECRET_KEY)
        req.payload = Decoded
        try {
            if (Decoded.role == "admin") {
                next()
            } else {
                res.status(404).json("unauthorized user")
            }

        } catch (error) {
            res.status(404).json("invalid token")

        }
    }


    else {
        res.status(404).json("token not found")
    }

}