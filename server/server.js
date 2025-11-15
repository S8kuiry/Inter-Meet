

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import { connectDB } from './lib/db.js';

// initialize app
const app = express()
dotenv.config()

//middleware
app.use(cors())
app.use(express.json())

// mongodb connect  
connectDB()
 
//port
const PORT  = process.env.PORT
app.use('/',(req,res)=>{
    res.send("Happy meeting")
})
app.listen(PORT,()=>{
    console.log("Successfully running on PORT ",PORT) 


})