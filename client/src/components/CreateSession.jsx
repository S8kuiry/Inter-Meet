import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  Video, Mic, MicOff, VideoOff, X, Copy, Check, ShieldCheck, Settings2,
  
} from "lucide-react";
import Loading from "./Loading";

const CreateSession = ({
   isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating}) => {

  

 
 
  const [isPrivate, setIsPrivate] = useState(false);
  const [sessionCreated, setSessionCreated] = useState(false);
  const [meetingLink, setMeetingLink] = useState("");
  const [copied, setCopied] = useState(false);
  const handleCreate = ()=>{

  }

  
 
if(!isOpen){ return null}
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-zinc-950 rounded-lg border border-zinc-500 shadow-xl overflow-hidden pb-4">

        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-500">
          <h2 className="text-xs font-bold uppercase text-white tracking-wide">
            {sessionCreated ? "Session Ready" : "Create Session"}
          </h2>

          <button
            onClick={onClose}
            className="cursor-pointer text-zinc-500 hover:text-white p-1.5 rounded-md hover:bg-zinc-900 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* body */}
        <div className="p-6 space-y-6">
          {/* All your code inside stays same */}
          <div className="space-y-5">

            <div className="space-y-1.5">
              <label className="text-xs  font-semibold uppercase tracking-wider text-zinc-500">
                Workspace Name
              </label>
              <div className="relative group">
                <input
                required
                onKeyDown={(e) => {
    if (e.key === "Enter") {
      onCreateRoom();
    }
  }}
                  type="text"
                  value={roomConfig.session_name}
                  onChange={(e) => setRoomConfig({...roomConfig,session_name:e.target.value})}
                  placeholder="Enter session name..."
                  className="my-3 w-full bg-zinc-900 border border-zinc-800 text-white rounded-md px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder:text-zinc-700"
                />
                <div className="absolute right-3 top-6 text-zinc-700 group-focus-within:text-teal-500 transition-colors">
                  <Settings2 className="w-4 h-4" />
                </div>
              </div>
            </div>






            {/* Private Access Toggle 
            <div className="pt-2">
              <label className="flex items-center justify-between p-3 rounded-md bg-zinc-900/40 border border-zinc-800/50 cursor-pointer hover:border-zinc-700 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded bg-zinc-900 text-teal-600 border border-zinc-800 group-hover:border-teal-500/30 transition-colors">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-semibold text-zinc-200">
                      Private Access
                    </span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wide">
                      Waitroom Enabled
                    </span>
                  </div>
                </div>
                <div
                  className={`w-10 h-5 rounded-sm relative transition-colors duration-300 ${isPrivate ? "bg-teal-600" : "bg-zinc-800"
                    }`}
                  onClick={() => setIsPrivate(!isPrivate)}
                >
                  <div
                    className={`absolute top-[2px] w-4 h-4 bg-white rounded-sm transition-all duration-300 shadow-sm ${isPrivate ? "left-[22px]" : "left-[2px]"
                      }`}
                  />
                </div>
              </label>
            </div>*/}

            <button
              onClick={onCreateRoom}
              disabled={isCreating || !roomConfig.session_name.trim()}
             
             
              className="w-full  py-3 flex items-center justify-center pb-3  bg-teal-500 hover:bg-teal-400 text-zinc-950 font-bold uppercase tracking-wide text-sm rounded-md shadow-[0_4px_20px_rgba(20,184,166,0.2)] transition-all active:scale-[0.98] border border-teal-400"
            >
             {isCreating?<Loading/> : "Create Session"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSession;
