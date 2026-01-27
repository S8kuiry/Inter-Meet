import React from 'react'
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import {useNavigate} from 'react-router-dom'
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";
import { Loader2Icon, MessageSquareIcon, UsersIcon, XIcon } from "lucide-react";


const VideoCallUI = ({user}) => {
  const navigate = useNavigate()
  const {useCallCallingState,useParticipantCount} = useCallStateHooks()
  const callingState = useCallCallingState()
  const participantCount = useParticipantCount()


  return (
     <div className="h-full flex gap-3 relative str-video overflow-y-scroll">
      <div className="flex-1 flex flex-col gap-3 ">
        {/* Participants count badge and Chat Toggle */}
        <div className="flex items-center justify-between gap-2 bg-base-100 p-3 rounded-lg shadow">
          <div className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5 text-primary" />
            <span className="font-semibold">
              {participantCount} {participantCount === 1 ? "participant" : "participants"}
            </span>
          </div>
         
        </div>

       {/* 2. Video Area: flex-1 and min-h-0 allows it to scroll internally */}
      <div className="flex-1 min-h-0 relative bg-base-300 rounded-xl overflow-y-auto custom-scrollbar">
        {/* We wrap SpeakerLayout in a div with a minimum height to ensure 
            it actually creates a scrollable area if there are many participants */}
        <div className="min-h-full w-full">
          <SpeakerLayout participantsBarPosition="bottom" />
        </div>
      </div>

        <div className="bg-base-100 p-1 rounded-lg shadow flex justify-center">
          <CallControls onLeave={() => navigate(`/dashboard/${user.id}`)} />
        </div>
      </div>

     
    </div>
  )
}

export default VideoCallUI