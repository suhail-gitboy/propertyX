import jwt from "jsonwebtoken"


export const AuthmiddleWare = (req, res, next) => {



    const Token = req.headers?.authorization?.split(" ")[1]

    if (Token) {
        try {


            const Verfied = jwt.verify(Token, process.env.SECRET_KEY)

            req.payload = Verfied


            next()
        } catch (error) {
            res.json("invalid token")
        }
    } else {
        res.status(401).json("Auhtorization failed server error")

    }
}