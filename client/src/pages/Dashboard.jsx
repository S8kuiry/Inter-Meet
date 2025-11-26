import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Video, Users, Zap, ArrowRight, Trophy, Code2, Crown } from 'lucide-react';
import PastSessions from '../components/PastSessions';
import { AppContext } from '../context/AppContext';
import CreateSession from '../components/CreateSession';


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
    const {createSession,setCreateSession} = useContext(AppContext)
    return (
        <>
            {/* Navbar */}
            <Navbar />
            {/* Create Session */}
          { createSession &&  <CreateSession/>
}
            <div className="w-full min-h-[100vh] bg-black flex flex-col items-center pt-28 pb-20 px-15">
                {/* Dashboard Header */}

                <div className="w-full max-w-7xl flex items-center justify-between  ">
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
                                Welcome Back, John!
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

                    <div onClick={()=>setCreateSession(!createSession)} className="cursor-pointer active:scale-96 hover:scale-103 transition-all duration-300 px-4 py-3 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg  text-white font-bold
        flex items-center justify-center gap-2 text-xs">
                        <Zap className='size-4 font-bold' />

                        Create Session

                        <ArrowRight className='size-4 font-bold' />
                    </div>
                </div>

                <div className="w-full flex flex-wrap items-center justify-between  mt-10  ">

                    {/*----------- left ------------ */}
                    <div className="flex flex-col w-[45%] py-4 px-3 gap-6  ">



                        {/* -------- Active sessions -------- */}
                        <div className="relative w-full p-4 rounded-lg bg-gradient-to-br 
    border border-green-400/30 bg-gray-700/30
    shadow-xl backdrop-blur-md flex items-start justify-between">

                            {/* Live badge */}
                            <div className="absolute top-3 right-3 flex items-center gap-2 
        bg-green-500 shadow-lg px-3 py-1.5 rounded-full">
                                <div className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></div>
                                <p className="text-white text-xs font-semibold tracking-wide">Live</p>
                            </div>

                            {/* Left section (icon + text) */}
                            <div className="flex flex-col gap-1">
                                {/* Icon container */}
                                <div className="w-max p-4 rounded-xl bg-green-400/20 
            shadow-md flex items-center justify-center">
                                    <Users className="text-green-400" strokeWidth={2.2} size={28} />
                                </div>

                                {/* Count */}
                                <h1 className="text-white font-bold text-4xl leading-tight mt-2 ">1</h1>
                                <p className="text-gray-400 text-sm">Active Sessions</p>
                            </div>
                        </div>



                        {/* -------- Total sessions -------- */}
                        <div className="relative w-full p-4 rounded-lg bg-gradient-to-br 
    border border-green-400/30 bg-gray-700/30
    shadow-xl backdrop-blur-md flex items-start justify-between">



                            {/* Left section (icon + text) */}
                            <div className="flex flex-col gap-1">
                                {/* Icon container */}
                                <div className="w-max p-4 rounded-xl bg-green-400/20 
            shadow-md flex items-center justify-center">
                                    <Trophy className="text-green-400" strokeWidth={2.2} size={28} />
                                </div>

                                {/* Count */}
                                <h1 className="text-white font-bold text-4xl leading-tight mt-2">1</h1>
                                <p className="text-gray-400 text-sm">Total Sessions</p>
                            </div>
                        </div>

                    </div>
                    {/*---------- right ------------- */}


                    {/* -------- All sessions -------- */}
                    <div className="relative w-[50%] h-[46vh] p-4 px-6 rounded-lg bg-gradient-to-br 
    border border-green-400/30 bg-gray-700/30
    shadow-xl backdrop-blur-md">


                        {/*---------- live session badge -------------------- */}
                        <div className="absolute top-5 left-5 font-bold flex items-center text-lg gap-3">
                            {/* Icon container */}
                            <div className="w-max p-2 rounded-xl bg-teal-400
            shadow-md flex items-center justify-center">
                                <Zap className="text-white" strokeWidth={2.2} size={24} />
                            </div>

                            <p className='text-white text-2xl'>Live Sessions</p>




                        </div>

                        {/*------------- session info ----------- */}
                        <div className="w-full h-[80%] flex flex-col mt-15 overflow-y-scroll  ">


                            {/* ---------- Session Card ---------- */}
                            {Array(10).fill("").map(() => (
                                <div className="w-full h-24 bg-black mb-4
    rounded-xl  p-4 flex items-center justify-between 
    transition-all duration-300">

                                    {/* ---------- Left Section ---------- */}
                                    <div className="flex items-center gap-4 h-full">

                                        {/* Icon Box */}
                                        <div className="w-12 h-12 rounded-lg 
            flex items-center justify-center bg-green-600">
                                            <Code2 className="text-white size-5" />
                                        </div>

                                        {/* Text Content */}
                                        <div className="flex flex-col justify-center">

                                            {/* Title + Tag */}
                                            <div className="flex items-center gap-2">
                                                <span className="text-white font-semibold text-lg tracking-tight">
                                                    Two Sum
                                                </span>
                                                <span className="text-black text-xs font-bold px-3 py-0.5 rounded-full 
                    bg-gradient-to-r from-green-400 to-teal-400 shadow-md">
                                                    Easy
                                                </span>
                                            </div>

                                            {/* Meta Info */}
                                            <div className="flex items-center gap-3 mt-1 text-gray-300">

                                                <div className="flex items-center gap-1">
                                                    <Crown className="size-4 text-yellow-400 drop-shadow" />
                                                    <p className="text-xs">Burak Omez</p>
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    <Users className="size-4 text-gray-300" />
                                                    <p className="text-xs">1/2</p>
                                                </div>

                                                <div className="text-black text-xs font-bold px-3 py-0.5 rounded-full 
                    bg-green-600 shadow-sm">
                                                    OPEN
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    {/* ---------- Right Section (Rejoin Button) ---------- */}
                                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold
        bg-green-600 text-black shadow-lg 
        hover:scale-105 active:scale-95 transition-all duration-200">
                                        Rejoin
                                        <ArrowRight className="size-4" />
                                    </button>
                                </div>))}



                        </div>






                    </div>




                </div>
                
                {/*--------------- past sessions ----------------- */}
                <PastSessions data={pastSessions}/>








            </div>
        </>
    );
};

export default Dashboard;
