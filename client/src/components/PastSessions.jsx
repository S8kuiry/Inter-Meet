import { Clock, Presentation, Timer, Users, CheckCircle2 } from 'lucide-react';
import React from 'react';
import moment from "moment";
import {formatDistanceToNow} from 'date-fns'

const PastSessions = ({ data = [] }) => {
    return (
        <div className='my-8 mx-auto w-full max-w-8xl p-6 md:p-8 rounded-xl
            border border-white/10 bg-gray-900/40
            shadow-2xl backdrop-blur-xl'>

            {/* Header Section */}
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-teal-500/20 border border-teal-500/30
                    shadow-lg flex items-center justify-center">
                    <Timer className="text-teal-400" strokeWidth={2} size={22} />
                </div>
                <div>
                    <h1 className="text-white font-bold text-2xl md:text-2xl tracking-tight">
                        Your Past Sessions
                    </h1>
                    <p className="text-gray-400 text-sm">Review your previous collaborative history</p>
                </div>
            </div>

            {/* Sessions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.length > 0 ? (
                    data.map((itm, index) => (
                        <div 
                            key={index}
                            className="group relative overflow-hidden rounded-lg bg-[#111] border border-white/5 
                                hover:border-teal-500/40 transition-all duration-300 hover:-translate-y-1
                                flex flex-col p-5 shadow-lg"
                        >
                            {/* Decorative background glow on hover */}
                            <div className="absolute -inset-px bg-gradient-to-r from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                {/* Header: Icon + Title */}
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400">
                                            <Presentation size={18} />
                                        </div>
                                        <h2 className="text-white font-semibold text-lg line-clamp-1">
                                            {itm.session_name || "Untitled Session"}
                                        </h2>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-500/5 px-2 py-1 rounded-md border border-teal-500/10">
                                        <CheckCircle2 size={10} />
                                        Completed
                                    </div>
                                </div>

                                {/* Stats Section */}
                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Clock className='size-4 text-teal-500/70'/>
                                        <p className='text-sm'>{formatDistanceToNow(new Date(itm.createdAt),{
                                            addSuffix:true
                                        })}</p>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Users className='size-4 text-teal-500/70'/>
                                        <p className='text-sm font-medium'>
                                            {itm.participants?.length || itm.participants || 0} Participants
                                        </p>
                                    </div>
                                </div>

                                {/* Footer: Exact Date */}
                                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                                        Finished On
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {moment(itm.endTime).format('MMM DD, YYYY • h:mm A')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-2xl">
                        <p className="text-gray-500 italic">No past sessions found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PastSessions;