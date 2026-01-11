import {StreamChat} from 'stream-chat'
import {StreamClient} from '@stream-io/node-sdk'
import dotenv from 'dotenv'

dotenv.config()

const apiKey =  process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.log("STREAM_API_KEY  or  STREAM_API_SECRET is missing ")
}

export const streamClient = new StreamClient(apiKey,apiSecret)// will be used for video calls

export const  chatClient  = StreamChat.getInstance(apiKey,apiSecret) // this is for chat features

export const  upsertStreamUser =  async(userData)=>{

    try {
        await chatClient.upsertUsers([userData])
        return userData

    } catch (error) {
        console.error("Error upserting Stream user:",error)        
    }
   
}


export const deleteStreamUser = async(userId)=>{
    try {
        await chatClient.deleteUser(userId)
        console.log("Stream user deleted successfully",userId)
    } catch (error) {
        console.error("Error upserting Stream user:",error)        

        
    }
}