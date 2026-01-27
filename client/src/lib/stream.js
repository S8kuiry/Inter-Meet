
import {StreamVideoClient} from '@stream-io/video-react-sdk'


const apiKey = import.meta.env.STREAM_API_KEY;

let client = null
export const initializeStreamClient = async(user,token)=>{
    // if client exists within the same user instead of creating again return it
    if(client && client?.user?.id === user.id) return client;


    client = new StreamVideoClient({
        apiKey,
        user,
        token
    })
    return client

}


// disconnect the stream client
export const disconnectStreamClient = async() =>{
    if(client){
        try {
            await client.disconnectUser();
            client = null

        } catch (error) {
            console.error("Error Disconnecting Stream Clinet",error)
            
        }
    }
}