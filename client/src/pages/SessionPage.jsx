import { useUser } from '@clerk/clerk-react';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEndSession, useJoinSession, useSessionById } from '../hooks/useSessions';
import SessionProblem from '../components/SessionProblem';
import { Mic2Icon, MicIcon, MicOff, VideoIcon, VideoOffIcon } from 'lucide-react';

const SessionPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useUser();

    //video caaling states
    const [videoOpen, setVideoOpen] = useState(false)
    const [micState, setMicState] = useState(false)


    // Layout State (Percentages)
    const [leftWidth, setLeftWidth] = useState(25);  // Panel 1 width
    const [midWidth, setMidWidth] = useState(50);   // Panel 2 width
    // Panel 3 width is implicitly (100 - left - mid)

    const isResizingLeft = useRef(false);
    const isResizingRight = useRef(false);

    const { data: sessionData, isLoading: loadingSession } = useSessionById(id);
    const session = sessionData?.session;
    const isHost = session?.host?.clerkId === user?.id;

    // Resizing Logic
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isResizingLeft.current) {
                const newLeftWidth = (e.clientX / window.innerWidth) * 100;
                if (newLeftWidth > 15 && newLeftWidth < 40) setLeftWidth(newLeftWidth);
            }
            if (isResizingRight.current) {
                // Calculate from the right side for the third panel
                const newMidWidth = ((e.clientX / window.innerWidth) * 100) - leftWidth;
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

    return (
        <div className='w-full h-screen bg-black text-gray-200 flex overflow-hidden p-2 gap-1'>

            {/* COLUMN 1: Problem Description */}
            <div
                style={{ width: `${leftWidth}%` }}
                className="h-full bg-[#111] border border-white/5 rounded-xl overflow-y-auto custom-scrollbar"
            >
                <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-500">Problem</h2>
                </div>
                <div className="p-6">
                    <SessionProblem />
                </div>
            </div>


            {/* RESIZER 1 */}
            <div
                className="w-1 group cursor-col-resize flex items-center justify-center transition-all hover:bg-cyan-500/30 rounded-full"
                onMouseDown={() => { isResizingLeft.current = true; document.body.style.cursor = 'col-resize'; }}
            >
                <div className="h-8 w-[2px] bg-white/10 group-hover:bg-cyan-500 transition-colors" />
            </div>

            {/* COLUMN 2: Code Editor */}
            <div
                style={{ width: `${midWidth}%` }}
                className="h-full bg-[#111] border border-white/5 rounded-xl flex flex-col overflow-hidden"
            >
                <div className="p-4 border-b border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.03]">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-medium">{session?.host?.username || 'Host'} (Host)</span>
                    </div>
                    <button className="text-[10px] bg-cyan-600/10 text-cyan-400 px-2 py-1 rounded border border-cyan-600/20">
                        Meeting
                    </button>
                </div>
                {/*--------------- video box sectoion ---------------- */}
                <div className="flex-1"></div>

               {/*--------------- bottom area for containing Mic and Other Icons ------------------*/}
<div className="p-3 border-t border-white/5 flex flex-col items-center gap-3 bg-[#111]">
    
  

    {/* 2. MEDIA CONTROLS */}
    <div className="flex justify-center items-center w-full">
        <div 
            onClick={() => setMicState(!micState)} 
            className={`rounded-xl p-3 mx-2 active:scale-95 transition-all duration-300 cursor-pointer border ${
                micState ? 'bg-gray-800 border-white/5' : 'bg-red-500/20 border-red-500/50'
            }`}
        >
            {micState ? <MicIcon className="text-white size-5" /> : <MicOff className="text-red-500 size-5" />}
        </div>

        <div 
            onClick={() => setVideoOpen(!videoOpen)} 
            className={`rounded-xl p-3 mx-2 active:scale-95 transition-all duration-300 cursor-pointer border ${
                videoOpen ? 'bg-gray-800 border-white/5' : 'bg-red-500/20 border-red-500/50'
            }`}
        >
            {videoOpen ? <VideoIcon className="text-white size-5" /> : <VideoOffIcon className="text-red-500 size-5" />}
        </div>
        
        {/* End Call Button */}
        <div className="bg-red-600 rounded-xl p-3 mx-2 active:scale-95 transition-all duration-300 cursor-pointer hover:bg-red-700">
            <MicOff className="text-white size-5 rotate-[135deg]" />
        </div>
    </div>
</div>

            </div>

            {/* RESIZER 2 */}
            <div
                className="w-1 group cursor-col-resize flex items-center justify-center transition-all hover:bg-cyan-500/30 rounded-full"
                onMouseDown={() => { isResizingRight.current = true; document.body.style.cursor = 'col-resize'; }}
            >
                <div className="h-8 w-[2px] bg-white/10 group-hover:bg-cyan-500 transition-colors" />
            </div>

            {/* COLUMN 3: Session & Participants */}
            <div
                style={{ width: `${100 - leftWidth - midWidth}%` }}
                className="h-full bg-[#111] border border-white/5 rounded-xl overflow-hidden flex flex-col"
            >
                <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-white">Chat Section</h2>
                </div>
                <div className="p-4 space-y-4">

                    {/* Participants List */}
                </div>
            </div>

        </div>
    );
};

export default SessionPage;