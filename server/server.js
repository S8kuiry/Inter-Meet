import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import { connectDB } from './lib/db.js';
import { serve } from "inngest/express";
import { inngest, functions } from './lib/inngest.js';
import { clerkMiddleware } from '@clerk/express'
import { protectRoute } from './middleware/protectRoute.js';
import chatRoutes from './routes/chatRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';


// initialize app
const app = express()
dotenv.config()

//middleware
app.use(cors({
    origin: function (origin, callback) {
        // This allows EVERY origin to connect, 
        // which is what you want for "no filtering"
        callback(null, true); 
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    // Added 'X-Requested-With' and 'Accept' to be extra safe
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
}));   



app.use(express.json())
app.use(clerkMiddleware())

// mongodb connect
connectDB()

// Inngest route
app.use("/api/inngest", serve({ client: inngest, functions }));
// api routes
app.use('/api/chat',chatRoutes)
// session routes
app.use('/api/sessions',sessionRoutes)

// health check
app.get('/', (req, res) => {
    res.send("Happy meeting")
})

app.get('/video-call',protectRoute,(req,res)=>{
    res.send("video-call")
})
//port
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Successfully running on PORT ", PORT)
})
