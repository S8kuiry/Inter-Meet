import React from 'react'
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Loader2Icon, MessageSquareIcon, UsersIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Channel, Chat, MessageInput, MessageList, Thread, Window } from "stream-chat-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";

const ChatCallUI = ({ chatClient, channel,setChatOpen}) => {
     const [isChatOpen, setIsChatOpen] = useState(false);
    
  return (
     <div className="h-full flex gap-3 relative str-video">
    
      {/* CHAT SECTION */}

      {chatClient && channel && (
        <div
          className={`flex flex-col rounded-lg shadow overflow-hidden bg-[#272a30] transition-all duration-300 ease-in-out ${
             "w-full opacity-100" 
          }`}
        >
          
            <>
              <div className="bg-[#1c1e22] py-4 border-b border-[#3a3d44] flex items-center justify-between px-4">
               
                        <h2 className="text-xs font-bold uppercase tracking-widest text-white">Live Chat</h2>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Close chat"
                >
                  <XIcon onClick={()=>setChatOpen(false)} className="size-4 cursor-pointer" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden stream-chat-dark">
                <Chat client={chatClient} theme="str-chat__theme-dark">
                  <Channel channel={channel}>
                    <Window>
                      <MessageList />
                      <MessageInput />
                    </Window>
                    <Thread />
                  </Channel>
                </Chat>
              </div>
            </>
          
        </div>
      )}
    </div>
  )
}

export default ChatCallUI