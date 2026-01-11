import { chatClient } from "../lib/stream.js"



// getstream token function
export const getStreamToken = async (req,res)=>{
    try {
        //using cerk id for stream not mongodb id
        const token = chatClient.createToken(req.user.clerkId)
        return res.status(200).json({
            token,
            userId : req.user.clerkId,
            userName : req.user.name,
            userImage : req.user.image

        })
        
    } catch (error) {

        return res.status(500).json({message:"Internal Server Error"})
        
    }
}