import { chatClient, streamClient } from "../lib/stream.js"
import Session from "../models/Session.js"


export async function createSession(req, res) {
   try {
        const { session_name } = req.body
        const userId = req.user._id // DB ID
        const clerkId = req.user.clerkId // Clerk/Stream ID

        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`

        // 1. Create session in DB
        const session = await Session.create({
            session_name, 
            host: userId,
            callId
        })

        // 2. Create stream video call
        // FIX 2: Ensure created_by_id is passed correctly within the data object
        await streamClient.video.call("default", callId).getOrCreate({
            data: {
                created_by_id: clerkId,
                custom: { 
                    session_name, 
                    sessionId: session._id.toString() 
                },
            }
        })

        // 3. Chat messaging
        const channel = chatClient.channel("messaging", callId, {
            name: session_name,
            created_by_id: clerkId,
            members: [clerkId]
        })

        await channel.create()

        // Return the session object so your frontend (data.session._id) works
        return res.status(201).json({ session })

    } catch (error) {
        console.error("Error in createSession Controller:", error.message)
        // Ensure you return an error status (500) so frontend knows it failed
        return res.status(500).json({ message: error.message || "Internal Server Error" })
    }
}



export async function getActiveSessions(_, res) {
    try {
        const sessions = await Session.find(({ status: "active" }))
        .populate("host", "name profileImage email clerkId")
        .populate("participant", "name profileImage email clerkId")

        .sort({ createdAt: -1 }).limit(20)

        return res.status(200).json({ sessions })

    } catch (error) {
        console.log("Error in getActivesSession Controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}



export async function getMyRecentSessions(req, res) {
    try {
        const userId = req.user._id
        // get sessions where user is either host or participant
        const sessions = await Session.find({
            status: "completed",
            $or: [{ host: userId }, { participant: userId }],

        }).sort({ createdAt: -1 })
            .limit(20)

        return res.status(200).json({ sessions })


    } catch (error) {
        console.log("Error in getMyRecentSessions Controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })

    }
}

export async function getSessionByid(req, res) {
    try {
        const { id } = req.params
        const session = await Session.findById(id).populate("host", "name email profileImage clerkId")
            .populate("participant", "name email profileImage clerkId")

        if (!session) {
            return res.status(404).json({ message: "Session Not Found " })
        }

        return res.status(200).json({ session })


    } catch (error) {
        console.log("Error in getSessionByid Controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })

    }
}

export async function joinSession(req, res) {
    try {
        const { id } = req.params
        const userId = req.user._id
        const clerkId = req.user.clerkId

        const session = await Session.findById((id))

        if (!session) { return res.status(404).json({ message: "Session Not Found " }) }

        //check if session is already full 

        if (session.participant) res.status(404).json({ message: "Session is full" })
        session.participant = userId
        await session.save()

        const channel = chatClient.channel("messaging", session.callId)
        await channel.addMembers([clerkId])

        return res.status(200).json({ session })



    } catch (error) {
        console.log("Error in joinSession Controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function endSession(req, res) {
    try {
        const { id } = req.params
        const userId = req.user._id

        const session = await Session.findById(id)

        if (!session) { return res.status(404).json({ message: "Session not found" }) }

        // check if user is host
        if (session.host.toString() !== userId.toString()) {
            return res.json({ message: "Only the host can endthe Session" })
        }

        // check if Session is already completed
        if (session.status === "Completed") {
            return res.json({ message: "Session is already completed " })
        }

        session.status("completed")
        await session.save()

        // delete Dtream Video Call
        const call =  streamClient.video.call("default",session.callId)
        await call.delete({hard:true})

        //delete stream chat channnel
        const channel = chatClient.channel("messaging",session.callId)
        await channel.delete()

        

        return res.json({ message: "Session ended Successfully " })




    } catch (error) {
        console.log("Error in endSession Controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })


    }
}

