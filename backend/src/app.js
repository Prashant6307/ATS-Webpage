const express = require('express')
const connectDB = require('./config/database')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const cors = require("cors")
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const app = express()
app.use(helmet())
app.set("trust proxy", 1);

dotenv.config()

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}))
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    message: {
        success: false,
        message: 'Too many requests. Please try again later.'
    }
})
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: 'Too many authentication attempts. Please try again later.'
    }
})


app.use(express.json())
app.use(cookieParser())
app.use(apiLimiter)

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const eventRouter = require('./routes/event')
const registrationRouter = require('./routes/registration')
const adminRouter = require('./routes/admin')
const announcementRouter = require('./routes/announcement')
const projectRouter = require('./routes/project')
const galleryRouter = require('./routes/gallery')
const resourceRouter = require('./routes/resource')
const teamRouter = require('./routes/team')
const projectSubmissionRouter = require('./routes/projectSubmission')
const contactRouter = require('./routes/contact')
const uploadRouter = require('./routes/upload')
const { notFound, errorHandler } = require('./middleware/errorHandler')


app.use('/auth', authLimiter, authRouter)
app.use('/user', userRouter)
app.use('/events', eventRouter)
app.use('/registrations', registrationRouter)
app.use('/admin', adminRouter)
app.use('/announcements', announcementRouter)
app.use('/projects', projectRouter)
app.use('/gallery', galleryRouter)
app.use('/resources', resourceRouter)
app.use('/team', teamRouter)
app.use('/project-submissions', projectSubmissionRouter)
app.use('/contact', contactRouter)
app.use('/upload', uploadRouter)



app.use(notFound)
app.use(errorHandler)

connectDB().then(() => {
    console.log("Database connected successfully")

    app.listen(process.env.PORT || 3000, () => {
        console.log(
            `Server started on port ${process.env.PORT || 3000}`
        )
    })
})