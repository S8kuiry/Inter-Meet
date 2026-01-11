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
        // Allow requests with no origin (like mobile apps, Postman, or curl)
        if (!origin) return callback(null, true);
        
        // This effectively allows "all" origins while still supporting credentials
        callback(null, true); 
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
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
