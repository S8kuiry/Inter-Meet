import { useState, useEffect, useRef } from "react";
import { StreamChat } from "stream-chat";
import { StreamVideoClient } from "@stream-io/video-react-sdk"; // Ensure this is imported
import toast from "react-hot-toast";
import { sessionApi } from "../api/sessions";

const useStreamClient = (session, loadingSession, isParticipant, isHost) => {
    const [streamClient, setStreamClient] = useState(null);
    const [call, setCall] = useState(null);
    const [chatClient, setChatClient] = useState(null);
    const [channel, setChannel] = useState(null);
    const [isInitializingCall, setIsInitializingCall] = useState(true);

    // Using refs to prevent duplicate connection attempts during re-renders
    const connectingRef = useRef(false);

    useEffect(() => {
        // Guard: Don't run if loading or if we already have a client
        if (loadingSession || !session?.callId || connectingRef.current) return;

        // Guard: Permissions
        if (!isHost && !isParticipant) {
            setIsInitializingCall(false);
            return;
        }

        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        if (!apiKey) {
            console.error("VITE_STREAM_API_KEY is missing from .env");
            setIsInitializingCall(false);
            return;
        }

        let videoClientInstance = null;
        let chatClientInstance = null;
        let activeCall = null;

        const initStream = async () => {
            connectingRef.current = true;
            setIsInitializingCall(true);

            try {
                const { token, userId, userName, userImage } = await sessionApi.getStreamToken();

                // 1. INITIALIZE VIDEO
                videoClientInstance = new StreamVideoClient({
                    apiKey,
                    user: { id: userId, name: userName, image: userImage },
                    token,
                });

                activeCall = videoClientInstance.call("default", session.callId);
                await activeCall.join({ create: true });
                
                setStreamClient(videoClientInstance);
                setCall(activeCall);

                // 2. INITIALIZE CHAT
                chatClientInstance = StreamChat.getInstance(apiKey);
                
                // Only connect if not already connected
                if (chatClientInstance.userID !== userId) {
                    await chatClientInstance.connectUser(
                        { id: userId, name: userName, image: userImage },
                        token
                    );
                }

                const chatChannel = chatClientInstance.channel("messaging", session.callId);
                await chatChannel.watch();
                
                setChatClient(chatClientInstance);
                setChannel(chatChannel);

            } catch (error) {
                console.error("Stream Connection Error:", error);
                toast.error("Connection failed. Please refresh.");
            } finally {
                setIsInitializingCall(false);
                connectingRef.current = false;
            }
        };

        initStream();

        // CLEANUP: Kill connections when component unmounts
        return () => {
            const cleanup = async () => {
                if (activeCall) await activeCall.leave().catch(console.error);
                if (videoClientInstance) await videoClientInstance.disconnectUser().catch(console.error);
                if (chatClientInstance) await chatClientInstance.disconnectUser().catch(console.error);
                
                setStreamClient(null);
                setCall(null);
                setChatClient(null);
                setChannel(null);
            };
            cleanup();
        };
    }, [session?.callId, loadingSession, isHost, isParticipant]);

    return { streamClient, call, chatClient, channel, isInitializingCall };
};

export default useStreamClient;