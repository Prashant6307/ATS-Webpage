const jwt = require("jsonwebtoken")
const UserModel = require("../models/user")

const userAuth = async (req, res, next) => {
    try {
        console.log("COOKIES:", req.cookies)

        const { token } = req.cookies

        if (!token) {
            console.log("❌ TOKEN NOT FOUND")
            return res.status(401).send("please Login")
        }

        console.log("✅ TOKEN FOUND")

        const decodedObj = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        console.log("✅ JWT VERIFIED:", decodedObj)

        const { id } = decodedObj

        const user = await UserModel.findById(id)

        if (!user) {
            console.log("❌ USER NOT FOUND:", id)
            throw new Error("User not found")
        }

        console.log("✅ USER FOUND:", user.email, user.role)

        req.user = user
        next()

    } catch (err) {
        console.log("❌ AUTH ERROR:", err.message)

        res.status(401).json({
            message: "Error: " + err.message
        })
    }
}

module.exports = { userAuth }