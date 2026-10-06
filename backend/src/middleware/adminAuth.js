const adminAuth = (req, res, next) => {
    try {
        console.log("🔐 ADMIN AUTH CHECK")
        console.log("USER:", req.user)
        console.log("ROLE:", req.user?.role)

        if (!req.user) {
            console.log("❌ NO USER")
            return res.status(401).json({
                success: false,
                message: "Please login"
            })
        }

        if (req.user.role !== "admin") {
            console.log("❌ NOT ADMIN:", req.user.role)
            return res.status(403).json({
                success: false,
                message: "Admin access required"
            })
        }

        console.log("✅ ADMIN AUTH PASSED")

        next()

    } catch (error) {
        console.log("❌ ADMIN AUTH ERROR:", error.message)

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { adminAuth }