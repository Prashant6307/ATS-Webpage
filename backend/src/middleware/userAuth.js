const jwt = require("jsonwebtoken")
const UserModel = require("../models/user")

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies
        
        

        if (!token) {
            return res.status(401).send("please Login")
        }

        const decodedObj = jwt.verify(token, process.env.JWT_SECRET)

        const { id } = decodedObj

        const user = await UserModel.findById(id)

        if (!user) {
            throw new Error("User not found")
        }
        req.user = user
        next()

    } catch (err) {
        res.status(401).json({
            message: "Error: " + err.message
        })
    }
}

module.exports = { userAuth }