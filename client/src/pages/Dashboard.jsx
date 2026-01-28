import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Video, Users, Zap, ArrowRight, Trophy, Code2, Crown, Circle } from 'lucide-react';
import PastSessions from '../components/PastSessions';
import { AppContext } from '../context/AppContext';
import CreateSession from '../components/CreateSession';
import { useSession } from '@clerk/clerk-react';
import { useActiveSessions, useCreateSession, useMyRecentSessions } from '../hooks/useSessions';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react'

const pastSessions = [
    {
        date: "2025-02-10",
        session_name: "Web Development Basics",
        participants: 42,
        startTime: new Date("2025-02-10 10:00 AM"),
        endTime: new Date("2025-02-10 11:30 AM")
    },
    {
        date: "2025-02-12",
        session_name: "Data Structures in C++",
        participants: 35,
        startTime: new Date("2025-02-12 2:00 PM"),
        endTime: new Date("2025-02-12 3:15 PM")
    },
    {
        date: "2025-02-14",
        session_name: "Python for Machine Learning",
        participants: 48,
        startTime: new Date("2025-02-14 4:00 PM"),
        endTime: new Date("2025-02-14 5:30 PM")
    },
    {
        date: "2025-02-15",
        session_name: "Networking Fundamentals",
        participants: 29,
        startTime: new Date("2025-02-15 9:00 AM"),
        endTime: new Date("2025-02-15 10:45 AM")
    },
    {
        date: "2025-02-17",
        session_name: "Database Management Workshop",
        participants: 53,
        startTime: new Date("2025-02-17 1:00 PM"),
        endTime: new Date("2025-02-17 2:30 PM")
    },
    {
        date: "2025-02-18",
        session_name: "Cloud Computing Essentials",
        participants: 40,
        startTime: new Date("2025-02-18 11:00 AM"),
        endTime: new Date("2025-02-18 12:20 PM")
    },
    {
        date: "2025-02-19",
        session_name: "Advanced Java Concepts",
        participants: 33,
        startTime: new Date("2025-02-19 3:00 PM"),
        endTime: new Date("2025-02-19 4:30 PM")
    }
];



const Dashboard = () => {
    const [createSession, setCreateSession] = useState(false)
    const naviagte = useNavigate()
    const { user } = useUser()

    // 1. Fetching My Active Sessions -------------------
    const {
        data: activeData,
        isLoading: isActiveLoading,
        error: activeError
    } = useActiveSessions();

    const sessionsToDisplay = activeData?.sessions || [];

    // 2. Fetching My Recent Sessions ----------------------
    const {
        data: recentData,
        isLoading: isRecentLoading,
        error: recentError
    } = useMyRecentSessions();

    // 3. create session fucntion -----------------
    const createSessionMutation = useCreateSession();
    const [roomConfig, setRoomConfig] = useState({ session_name: "" })
    const handleCreateRoom = () => {
        if (!roomConfig.session_name) return

        createSessionMutation.mutate({
            session_name: roomConfig.session_name
        }, {
            onSuccess: (data) => {
                console.log("Backend Response:", data); // Check your browser console!
                setCreateSession(false);

                // Most backends return the object directly or nested differently. 
                // Try one of these based on what your console shows:
                // Explicitly target the session object returned by your controller
    const sessionId = data?.session?._id;

                if (sessionId) {
                    naviagte(`/session/${sessionId}`);
                } else {
                    console.error("Could not find ID in response", data);
                }
            }
        })
    }

    const recentSessions = recentData?.sessions || [];

    // checking whether i am a host or a participant 
    const isUserInSession = (session) => {
        if (!user.id) {
            return false
        }
        return session.host?.clerkId === user.id || session.participant.clerkId === user.id
    }
    return (
        <>
            {/* Navbar */}
            <Navbar />
            {/* Create Session */}
            <CreateSession
                isOpen={createSession}
                onClose={() => setCreateSession(false)}
                onCreateRoom={handleCreateRoom}
                roomConfig={roomConfig}
                setRoomConfig={setRoomConfig}
                isCreating={createSessionMutation.isPending}
            />

            <div className="w-[100vw] min-h-[100vh] bg-black flex flex-col items-center pt-28 pb-20 px-15">
                {/* Dashboard Header */}

                <div className="w-full max-w-8xl flex items-center justify-between  ">
                    <div className="flex items-center gap-3">
                        {/* Icon Circle-------------- */}
                        <motion.div
                            className="rounded-full p-3 flex items-center justify-center shadow-lg"
                            style={{
                                width: 60,
                                height: 60,
                                background: 'linear-gradient(135deg, #00C48C 0%, #00E0FF 55%, #8AF6C7 100%)',
                                boxShadow: '0 8px 18px rgba(0,132,96,0.18), inset 0 -6px 18px rgba(0,0,0,0.06)',
                            }}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                                <Video strokeWidth={2.2} size={30} className="text-white" />
                                <Users
                                    strokeWidth={2}
                                    size={20}
                                    className="text-white absolute bottom-0 right-0"
                                    style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))' }}
                                />
                            </div>
                        </motion.div>

                        {/* Text block */}
                        <motion.div
                            className="flex flex-col leading-tight"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.12, duration: 0.45 }}
                        >
                            {/* Title */}
                            <div
                                className=" text-4xl font-bold"
                                style={{
                                    backgroundImage: 'linear-gradient(90deg, #00FFA3 0%, #00C4FF 60%, #00FFCC 100%)',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    letterSpacing: '0.01em',
                                }}
                            >
                                Welcome Back, {user?.firstName}!
                            </div>

                            {/* Tagline */}
                            <div
                                className="mt-1 text-sm"
                                style={{
                                    color: 'rgba(220,220,224,0.92)',
                                    textShadow: '0 1px 0 rgba(255,255,255,0.04), 0 2px 8px rgba(0,0,0,0.18)',
                                    lineHeight: 1.2,
                                }}
                            >
                                Ready to level up your coding skills?
                            </div>
                        </motion.div>

                    </div>




                    {/*------------ right ------------------ */}

                    <div onClick={() => setCreateSession(true)} className="cursor-pointer active:scale-96 hover:scale-103 transition-all duration-300 px-4 py-3 bg-teal-500/70 rounded-sm  text-white font-bold
                                flex items-center justify-center gap-2 text-xs">
                        <Zap className='size-4 font-bold' />

                        Create Session

                        <ArrowRight className='size-4 font-bold' />
                    </div>
                </div>

                <div className="w-[85vw] flex flex-wrap items-center justify-between  mt-10   ">

                    {/*----------- left ------------ */}
                    <div className="flex flex-col w-[46%] py-4   gap-6 items-start ">



                        {/* -------- Active sessions -------- */}
                        <div className="relative w-full p-4 rounded-lg bg-gradient-to-br 
                                border border-teal-400/30 bg-gray-900/40
                                 shadow-xl backdrop-blur-md flex items-start justify-between">

                            {/* Live badge */}
                            <div className="absolute top-3 right-3 flex items-center gap-2 
                                 bg-teal-500 shadow-lg px-3 py-1.5 rounded-full">
                                <div className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></div>
                                <p className="text-white text-xs font-semibold tracking-wide">Live</p>
                            </div>

                            {/* Left section (icon + text) */}
                            <div className="flex flex-col gap-1">
                                {/* Icon container */}
                                <div className="w-max p-4 rounded-xl bg-teal-400/20 
                                shadow-md flex items-center justify-center">
                                    <Users className="text-teal-400" strokeWidth={2.2} size={28} />
                                </div>

                                {/* Count */}
                                <h1 className="text-white font-bold text-4xl leading-tight mt-2 ">
                                    {sessionsToDisplay.length}
                                </h1>
                                <p className="text-gray-400 text-sm">Active Sessions</p>
                            </div>
                        </div>



                        {/* -------- Total sessions -------- */}
                        <div className="relative w-full p-4 rounded-lg bg-gradient-to-br 
                             border border-green-400/30 bg-gray-900/40
                                shadow-xl backdrop-blur-md flex items-start justify-between">



                            {/* Left section (icon + text) */}
                            <div className="flex flex-col gap-1">
                                {/* Icon container */}
                                <div className="w-max p-4 rounded-xl bg-teal-400/20 
                                 shadow-md flex items-center justify-center">
                                    <Trophy className="text-teal-400" strokeWidth={2.2} size={28} />
                                </div>

                                {/* Count */}
                                <h1 className="text-white font-bold text-4xl leading-tight mt-2">
                                    {sessionsToDisplay.length + recentSessions.length}
                                </h1>
                                <p className="text-gray-400 text-sm">Total Sessions</p>
                            </div>
                        </div>

                    </div>
                    {/*---------- right ------------- */}


                    {/* -------- All sessions -------- */}
                    <div className="relative w-[50%] h-[46vh] p-4 px-6 rounded-lg bg-gradient-to-br 
                             border border-green-400/30 bg-gray-900/40
                                shadow-xl backdrop-blur-md">


                        {/*---------- live session badge -------------------- */}
                        <div className="absolute top-5 left-5 font-bold flex items-center text-lg gap-3">
                            {/* Icon container */}
                            <div className="w-max p-2 rounded-sm bg-teal-400
            shadow-md flex items-center justify-center">
                                <Zap className="text-white" strokeWidth={2.2} size={22} />
                            </div>

                            <p className='text-white text-2xl'>Live Sessions</p>




                        </div>

                        {/*------------- session info ----------- */}
                        <div className="w-full h-[80%] flex flex-col mt-15 overflow-y-scroll  ">


                            {/*---------------------------------- live session display ------------------------------------- */}

                            {/* ---------- Session Card ---------- */}
                            {sessionsToDisplay.length > 0 ? sessionsToDisplay.map((itm, index) => (
                                <div
                                    key={itm._id || index}
                                    className="my-2 group w-full h-20 bg-[#111]/60 backdrop-blur-md border border-white/5 
                       hover:border-gray-500/30 rounded-sm p-4 flex items-center justify-between 
                       transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.05)]"
                                >
                                    {/* ---------- Left Section ---------- */}
                                    <div className="flex items-center gap-4 h-full">

                                        {/* Icon Box with Glow */}
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-sm flex items-center justify-center 
                                  bg-gradient-to-br from-teal-500 to-cyan-700 shadow-lg shadow-green-900/20">
                                                <Code2 className="text-black size-6" strokeWidth={2.5} />
                                            </div>
                                            {/* Live Indicator Dot */}
                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#111] animate-pulse" />
                                        </div>

                                        {/* Text Content */}
                                        <div className="flex flex-col justify-center">
                                            <div className="flex items-center gap-3">
                                                <span className="text-white font-bold text-lg tracking-tight group-hover:text-green-400 transition-colors">
                                                    {itm.session_name || "Two Sum"}
                                                </span>
                                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-green-500/10 border border-green-500/20">
                                                    <span className="relative flex h-2 w-2">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                    </span>
                                                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Live</span>
                                                </div>
                                            </div>

                                            {/* Meta Info */}
                                            <div className="flex items-center gap-4 mt-1.5">
                                                <div className="flex items-center gap-1.5 text-gray-400">
                                                    <Crown className="size-3.5 text-yellow-500/70" />
                                                    <p className="text-xs font-medium">{itm.host?.name || "Anonymous"}</p>
                                                </div>

                                                <div className="flex items-center gap-1.5 text-gray-400">
                                                    <Users className="size-3.5" />
                                                    <p className="text-xs font-medium">{itm.participants?.length || 1}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ---------- Right Section (Action) ---------- */}
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => naviagte(`/session/${itm._id}`)}
                                            className="group/btn flex items-center gap-2 px-2 py-2 rounded-sm text-xs font-bold
                             bg-teal-500 text-black hover:bg-teal-400 shadow-lg shadow-teal-500/10
                             active:scale-95 transition-all duration-200"
                                        >
                                            Rejoin
                                            <ArrowRight className="size-3 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            )) : (


                                <div className="w-full flex flex-col items-center justify-center py-14 px-6 text-center">

                                    {/* Animated Icon Container */}
                                    <div className="relative mb-10">
                                        {/* Outer Pulsing Halo */}
                                        <div className="absolute inset-0 bg-teal-500/20 rounded-full animate-ping scale-125 opacity-20" />
                                        <div className="absolute inset-0 bg-teal-500/10 rounded-full animate-pulse scale-100" />

                                        {/* Main Circle */}
                                        <div className="relative w-18 h-18 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center border-4 border-white/10 shadow-[0_0_30px_rgba(20,184,166,0.3)]">
                                            <Video className="text-white size-10 drop-shadow-md" />
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="space-y-3">
                                        <h3 className="text-2xl font-bold tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                                            No Sessions active now
                                        </h3>
                                        <p className="text-gray-400 text-sm max-w-[280px] mx-auto leading-relaxed font-medium">
                                            When someone starts a session, it will appear here for you to join instantly.
                                        </p>
                                    </div>

                                    {/* Subtle Background Glow for the whole area */}
                                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.05)_0%,transparent_70%)]" />
                                </div>
                            )}




                        </div>

                    </div>




                </div>

                {/*--------------- past sessions ----------------- */}
                <div className="w-[85vw] flex items-center justify-center">
                    <PastSessions data={recentSessions} />

                </div>








            </div>
        </>
    );
};

export default Dashboard;
