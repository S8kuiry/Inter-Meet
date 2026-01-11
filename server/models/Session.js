import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
    session_name:{
        type:String,
        required:true
    }
    ,
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    participant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null

    },
    status:{
        type:String,
        enum:["active","completed"],
        default:"active"

    }
    ,
    // strea, video call Id
    callId:{
        type:String,
        default:""
    }

},{timestamps:true})

const Session = mongoose.model('session',sessionSchema)
export default Session