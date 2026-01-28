import { getAuth } from '@clerk/express' // Use getAuth instead of requireAuth
import User from '../models/User.js'

export const protectRoute = async (req, res, next) => {
    try {
        // getAuth is "passive" - it won't force a redirect
        const { userId } = getAuth(req);

        if (!userId) {
            // This returns a clean error that Axios can catch
            return res.status(401).json({ message: "Unauthorized - No Clerk User ID found" });
        }

        // find user in db by clerk id
        const user = await User.findOne({ clerkId: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found in Database" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("Error in Protect Route:", error.message);
        return res.status(500).json({ message: "Internal Server Error in Protect Route" });
    }
};