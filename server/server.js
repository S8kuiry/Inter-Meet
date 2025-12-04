import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import { connectDB } from './lib/db.js';
import { serve } from "inngest/express";
import { inngest, functions } from './lib/inngest.js';

// initialize app
const app = express()
dotenv.config()

//middleware
app.use(cors())
app.use(express.json())

// mongodb connect
connectDB()

// Inngest route
app.use("/api/inngest", serve({ client: inngest, functions }));

// health check
app.use('/', (req, res) => {
    res.send("Happy meeting")
})
 
//port
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Successfully running on PORT ", PORT)
})
