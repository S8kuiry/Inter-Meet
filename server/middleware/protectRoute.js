import { requireAuth } from '@clerk/express'
import User from '../models/User.js'


export const protectRoute = [
    requireAuth(),
    async (req, res, next) => {
        try {
            const auth = req.auth()
            const clerkId = auth.userId

            if (!clerkId) {
                return res.status(400).json({ message: "Unauthorized - Invalid Token" })
            }

            // find user in db by clerk id
            const user = await User.findOne({ clerkId })

            if (!user){ return res.json({ message: "User not found" })}
            req.user = user

            next()


        } catch (error) {
            console.error("Error in Protect Route ",error.message)
            return res.json({message:"Error in Protect Route || Inter Server Error"})

        }
    }
]

