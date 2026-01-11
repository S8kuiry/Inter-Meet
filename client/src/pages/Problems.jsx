import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { ArrowRight, Code2 } from 'lucide-react'
import { PROBLEMS } from '../data/problems' // Import your central data
import { useNavigate } from 'react-router-dom'
import { useActiveSessions } from '../hooks/useSessions'

const Problems = () => {
  // Use Object.entries so we have access to the 'key' (e.g., "two-sum") 
  // and the 'value' (the problem object)
  const [problemData] = useState(Object.entries(PROBLEMS));
  const navigate = useNavigate();


 



  return (
    <>
      <Navbar />
      <div className="w-full min-h-[100vh] bg-black flex flex-col items-center pt-28 pb-20 px-15">
        <div className="w-full max-w-7xl">

          <div className="w-full flex flex-col gap-1">
            <p className='text-gray-300 text-3xl font-bold'>Practice Problems</p>
            <p className='text-sm text-gray-500'>Sharpen your coding skills with these curated problems</p>
          </div>

          <div className="mt-8 w-full flex flex-col gap-1 max-h-[70vh] overflow-y-scroll custom-scrollbar">
            {problemData.map(([key, itm]) => (
              <div 
                key={key}
                onClick={() => navigate(`/problem/${key}`)} // Key is "two-sum", "reverse-string", etc.
                className="cursor-pointer hover:scale-[0.99] transition-all duration-200 relative w-full py-3 px-4 my-2 flex flex-col bg-[#1A1A1A] rounded-lg border border-white/5 hover:border-teal-500/30"
              >
                {/* Solve Icon */}
                <div className="absolute items-center text-teal-500 top-4 right-4 flex gap-1">
                  <p className='text-xs font-bold uppercase'>Solve</p>
                  <ArrowRight className='size-3' />
                </div>

                <div className="flex items-center gap-4 h-full">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-teal-600/10">
                    <Code2 className="text-teal-400 size-4" />
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-lg tracking-tight">
                        {itm.title}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shadow-md
                        ${itm.difficulty === "Easy" ? "bg-green-500/20 text-green-500" : 
                          itm.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-500" : 
                          "bg-red-500/20 text-red-500"}`}>
                        {itm.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-1">
                      <p className='text-xs text-gray-500'>Category: {itm.category}</p>
                    </div>
                  </div>
                </div>

                {/* Fixed the description access - it's itm.description.text */}
                <p className='text-xs mt-3 text-gray-400 mb-2 line-clamp-1'>
                    {itm.description?.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-10 w-full max-w-7xl py-3 px-8 my-2 
                        bg-[#1A1A1A]/80 backdrop-blur-md 
                        border border-white/10 rounded-lg 
                        grid grid-cols-4 gap-6">
          <div className="flex flex-col items-start gap-1 p-4 border-r border-white/10">
            <p className="text-gray-500 text-xs tracking-wide uppercase font-bold">Total</p>
            <p className="text-3xl font-extrabold text-white">{problemData.length}</p>
          </div>
          <div className="flex flex-col items-start gap-1 p-4 border-r border-white/10">
            <p className="text-gray-500 text-xs tracking-wide uppercase font-bold">Easy</p>
            <p className="text-3xl font-extrabold text-green-500">
              {problemData.filter(([_, itm]) => itm.difficulty === "Easy").length}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1 p-4 border-r border-white/10">
            <p className="text-gray-500 text-xs tracking-wide uppercase font-bold">Medium</p>
            <p className="text-3xl font-extrabold text-yellow-500">
              {problemData.filter(([_, itm]) => itm.difficulty === "Medium").length}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1 p-4">
            <p className="text-gray-500 text-xs tracking-wide uppercase font-bold">Hard</p>
            <p className="text-3xl font-extrabold text-red-500">
              {problemData.filter(([_, itm]) => itm.difficulty === "Hard").length}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Problems