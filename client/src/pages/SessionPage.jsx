import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { StreamVideo, StreamCall } from '@stream-io/video-react-sdk'; // Ensure this is installed
import { 
    LogOut, 
    MessageSquareDot, 
    MoreVertical, 
    PhoneOffIcon 
} from 'lucide-react';

import { useEndSession, useJoinSession, useSessionById } from '../hooks/useSessions';
import useStreamClient from '../hooks/useStreamClient';
import SessionProblem from '../components/SessionProblem';
import Loading from '../components/Loading';
import VideoCallUI from '../components/VideoCallUI'; // Ensure you have this component
import ChatCallUI from '../components/ChatCallUI';

const SessionPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user, isLoaded: userLoaded } = useUser();

    // 1. Fetch Session Data
    const { 
        data: sessionData, 
        isLoading: loadingSession, 
        refetch 
    } = useSessionById(id);

    const session = sessionData?.session;
    const joinSessionMutation = useJoinSession();
    const endSessionMutation = useEndSession();

    // 2. Permission Logic
    const isHost = session?.host?.clerkId === user?.id;
    const isParticipant = session?.participant?.clerkId === user?.id;

    // 3. Layout State
    const [leftWidth, setLeftWidth] = useState(25);
    const [midWidth, setMidWidth] = useState(50);
    const [chatOpen, setChatOpen] = useState(false);
    const isResizingLeft = useRef(false);
    const isResizingRight = useRef(false);

    // 4. AUTO-JOIN LOGIC 
    // If the user is not the host and not yet a participant, join them automatically.
    useEffect(() => {
        if (loadingSession || !session || !user) return;
        
        if (!isHost && !isParticipant && session.status === "active") {
            console.log("Auto-joining session...");
            joinSessionMutation.mutate(id, { 
                onSuccess: () => {
                    console.log("Joined successfully, refetching session data...");
                    refetch(); 
                } 
            });
        }
    }, [session, user, loadingSession, isHost, isParticipant, id]);

    // 5. SESSION COMPLETION LOGIC
    useEffect(() => {
        if (session?.status === "completed") {
            navigate(`/dashboard/${user?.id}`);
        }
    }, [session?.status, navigate, user?.id]);

    // 6. INITIALIZE STREAM (Video & Chat)
    // This hook now receives the latest isParticipant/isHost status
    const { 
        call, 
        channel, 
        chatClient, 
        isInitializingCall, 
        streamClient 
    } = useStreamClient(session, loadingSession, isParticipant, isHost);

    // 7. Resizing Logic
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isResizingLeft.current) {
                const newLeftWidth = (e.clientX / window.innerWidth) * 100;
                if (newLeftWidth > 15 && newLeftWidth < 40) setLeftWidth(newLeftWidth);
            }
            if (isResizingRight.current) {
                const currentPosPercent = (e.clientX / window.innerWidth) * 100;
                const newMidWidth = currentPosPercent - leftWidth;
                if (newMidWidth > 30 && (leftWidth + newMidWidth) < 85) setMidWidth(newMidWidth);
            }
        };

        const stopResizing = () => {
            isResizingLeft.current = false;
            isResizingRight.current = false;
            document.body.style.cursor = 'default';
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', stopResizing);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [leftWidth]);

    /// handle end session 

    const handleEndSession = () => {
        if (!id) return;
        if (window.confirm("End session? All participants will be disconnected.")) {
            // Safety check: ensure the mutation exists before calling mutate
            endSessionMutation?.mutate(id, { 
                onSuccess: () => navigate(`/dashboard/${user?.id}`) 
            });
        }
    };

    if (!userLoaded || loadingSession) return <Loading />;

    return (
        <div className='w-full h-screen bg-black text-gray-200 flex overflow-hidden p-2 gap-1'>
            
            {/* COLUMN 1: Problem Description */}
            <div style={{ width: `${leftWidth}%` }} className="h-full bg-[#111] border border-white/5 rounded-xl overflow-y-auto custom-scrollbar">
                <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-500">Problem</h2>
                    <div className="relative group p-2">
                        <MoreVertical className='size-5 text-gray-400 cursor-pointer hover:text-white' />
                        <div className="hidden group-hover:block absolute right-0 top-full w-32 bg-[#1a1a1a] border border-white/10 rounded-md shadow-xl z-50">
                            <p onClick={() => navigate(`/dashboard/${user.id}`)} className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer">Dashboard</p>
                                                        <p onClick={() => navigate(`/problems/${user.id}`)} className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer">Problems</p>

                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <SessionProblem />
                </div>
            </div>

            {/* RESIZER 1 */}
            <div className="w-1 cursor-col-resize hover:bg-cyan-500/30 transition-all" 
                 onMouseDown={() => { isResizingLeft.current = true; document.body.style.cursor = 'col-resize'; }} />

            {/* COLUMN 2: Video / Call Area */}
            <div style={{ width: chatOpen ? `${midWidth}%` : `${100 - leftWidth}%` }} className="h-full bg-[#111] border border-white/5 rounded-xl flex flex-col overflow-hidden">
                <div className="p-4 border-b border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-3 p-2 rounded-sm bg-white/[0.03]">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-medium">{isHost ? "You (Host)" : "Session Active"}</span>
                        </div>
                        {isHost && (
                            <div onClick={handleEndSession} className="flex items-center gap-2 p-2 rounded-sm bg-red-700/90 cursor-pointer hover:bg-red-600 transition-all">
                                <LogOut className='size-3' />
                                <span className='text-xs font-medium'>End Session</span>
                            </div>
                        )}
                    </div>
                    <div onClick={() => setChatOpen(!chatOpen)} className={`flex items-center gap-2 text-[13px] px-2 py-1 rounded border border-cyan-600/20 cursor-pointer transition-all ${chatOpen ? "bg-green-600/10 text-green-400" : "bg-gray-600/10 text-gray-400"}`}>
                        <MessageSquareDot className='w-4 h-4' />
                        <span>Chat</span>
                    </div>
                </div>

                <div className="flex-1 bg-black p-4 overflow-hidden relative">
                    {isInitializingCall ? (
                        <div className="h-full flex flex-col items-center justify-center">
                            <Loading />
                            <p className="text-lg pt-4 text-gray-400">Connecting to call...</p>
                        </div>
                    ) : (!streamClient || !call) ? (
                        <div className="h-full flex items-center justify-center">
                            <div className="text-center">
                                <PhoneOffIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold">Waiting for Permission</h2>
                                <p className="text-gray-500">You must be a participant to join the call.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full overflow-y-scroll">
                            <StreamVideo client={streamClient}>
                                <StreamCall call={call}>
                                    <VideoCallUI user={user} chatClient={chatClient} channel={channel} />
                                </StreamCall>
                            </StreamVideo>
                        </div>
                    )}
                </div>
            </div>

            {/* RESIZER 2 */}
            {chatOpen && <div className="w-1 cursor-col-resize hover:bg-cyan-500/30 transition-all" 
                             onMouseDown={() => { isResizingRight.current = true; document.body.style.cursor = 'col-resize'; }} />}

            {/* COLUMN 3: Chat Panel */}
            {chatOpen && (
                <div style={{ width: `${100 - leftWidth - midWidth}%` }} className="h-full bg-[#111] border border-white/5 rounded-xl overflow-hidden flex flex-col">
                   {/* <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-white">Live Chat</h2>
                    </div>*/}
                    <div className="flex-1 overflow-y-scroll h-full">

                       <ChatCallUI chatClient={chatClient} channel={channel} setChatOpen={setChatOpen} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SessionPage;