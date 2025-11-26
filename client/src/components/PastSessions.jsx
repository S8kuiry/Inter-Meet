import { Clock1Icon, Presentation, Timer, Users } from 'lucide-react'
import React from 'react'
import moment from "moment"
const PastSessions = ({ data }) => {
    return (
        <div className='relative  my-6 max-w-[91vw] md:ml-3 w-full p-4 px-6 rounded-lg bg-gradient-to-br 
    border border-green-400/30 bg-gray-700/30
    shadow-xl backdrop-blur-md h-auto min-h-[40vh]'>

            {/* Left section (icon + text) */}
            <div className="flex  items-center gap-3">
                {/* Icon container */}
                <div className="w-max p-2 rounded-xl bg-teal-400
            shadow-md flex items-center justify-center">
                    <Timer className="text-white" strokeWidth={2.2} size={25} />
                </div>

                {/* Count */}
                <h1 className="text-white font-bold text-2xl leading-tight">Your Past Sessions</h1>
            </div>


            {/*-------------------- past sessions section --------------------- */}
            <div className="w-full flex flex-wrap mt-10  py-6 ">
                {data.map((itm, index) => (
                    <div className="relative w-[400px] rounded-lg bg-black h-[200px] mx-2 my-2 flex flex-col pt-6 px-4 gap-2">

                        {/* Left section (icon + text) */}
                        <div className="flex  items-center gap-3">
                            {/* Icon container */}
                            <div className="w-max p-2 rounded-xl bg-teal-400
            shadow-md flex items-center justify-center">
                                <Presentation className="text-white" strokeWidth={2.2} size={20} />
                            </div>

                            {/* Count */}
                            <h1 className="text-white font-bold text-xl leading-tight">{itm.session_name}</h1>
                        </div>

{/*------------ time section ---------------- */}
                        <div className="flex items-center gap-2 text-sm mt-4">
                            <Clock1Icon className='text-gray-400 size-4'/>
                            <p className='text-gray-400 text-sm'>{moment(itm.endTime).fromNow()}</p>
                        </div>

                        {/*------------ participants section ---------------- */}
                        <div className="flex items-center gap-2 text-sm ">
                            <Users className='text-gray-400 size-4'/>
                            <p className='text-gray-400 text-sm'> {itm.participants} Participants</p>
                        </div>

                        {/*------------- status section ---------------- */}
                        <div className="text-gray-400 w-full flex items-center  justify-between absolute bottom-0 inset-x-0 px-4 text-xs py-6">
                            <p>Completed</p>
                            <p>{itm.endTime.toLocaleString()}</p>

                        </div>

                    </div>
                ))}

            </div>


        </div>
    )
}

export default PastSessions