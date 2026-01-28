import { CheckIcon, Code2Icon, UsersIcon, VideoIcon, Zap } from 'lucide-react'
import React from 'react'

const Hero = () => {
  return (
    <>
      <div className='pt-[110px] max-w-8xl w-full flex flex-col md:flex-row flex-wrap items-center justify-center px-6 sm:px-10 md:px-20 overflow-y-scroll w-[100vw]'>

        {/*---- left ---------- */}
        <div className="w-full md:w-[50%] flex flex-col items-start text-center md:text-left">
          {/*-------- real time collaboration ---------- */}
          <div className="px-3 py-1 text-xs sm:text-sm flex items-center justify-center gap-2 bg-green-600 rounded-full mb-4 self-center md:self-start">
            <Zap className='size-4 text-black font-semibold' />
            <p className='font-semibold'>Real-time Collaboration</p>
          </div>

          {/*---------- header --------------- */}
          <p className='text-5xl sm:text-5xl md:text-7xl text-white mt-3 font-bold leading-tight'>
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-500'>Code Together,</span><br />
            Learn Together
          </p>

          {/*-------- description ------------- */}
          <p className="text-sm  leading-relaxed max-w-xl text-gray-400 mt-7 text-base sm:text-lg self-center md:self-start">
            The ultimate platform for collaborative coding interviews and pair programming.
            Connect face-to-face, code in real-time, and ace your technical interviews.
          </p>

          {/* FEATURE PILLS */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 text-white mt-7">
            <div className="flex gap-1 border border-gray-400 rounded-full px-3 text-sm py-1 items-center badge badge-lg badge-outline">
              <CheckIcon className="size-4 text-green-500 text-success" />
              Live Video Chat
            </div>
            <div className="flex gap-1 border border-gray-400 rounded-full px-3 text-sm py-1 items-center badge badge-lg badge-outline">
              <CheckIcon className="size-4 text-green-500 text-success" />
              Code Editor
            </div>
            <div className="flex gap-1 border border-gray-400 rounded-full px-3 text-sm py-1 items-center badge badge-lg badge-outline">
              <CheckIcon className="size-4 text-green-500 text-success" />
              Multi-Language
            </div>
          </div>

          {/* STATS */}
          <div className="flex flex-wrap bg-base-100 shadow-lg mt-10 sm:mt-7 w-full max-w-md self-center md:self-start rounded-lg overflow-hidden">
            <div className="stat w-1/3 bg-gray-900/90 py-4 px-3 text-center">
              <div className="stat-value text-green-500 font-bold text-2xl sm:text-4xl">10K+</div>
              <div className="stat-title text-gray-400 text-[10px] sm:text-xs mt-2">Active Users</div>
            </div>
            <div className="stat w-1/3 bg-gray-900/90 py-4 px-3 text-center border-l border-gray-700 border-dashed border-r">
              <div className="stat-value text-teal-500 font-bold text-2xl sm:text-4xl">50K+</div>
              <div className="stat-title text-gray-400 text-[10px] sm:text-xs mt-2">Sessions</div>
            </div>
            <div className="stat w-1/3 bg-gray-900/90 py-4 px-3 text-center">
              <div className="stat-value text-teal-500 font-bold text-2xl sm:text-4xl">99.9%</div>
              <div className="stat-title text-gray-400 text-[10px] sm:text-xs mt-2">Uptime</div>
            </div>
          </div>


        </div>

        {/*------ right --------- */}

        <div className="w-full md:w-[50%] flex justify-center mt-10 md:mt-0">
          <img src='/hero.png' className='w-[90%] sm:w-[80%] md:w-[80%]' />
        </div>

      </div>




      {/*-------- features grid  ----------- */}
      <div className="max-w-7xl mx-auto px-4 py-20 flex sm:flex-wrap md:flex-row flex-col gap-8  justify-center md:justify-between">
       {/* Feature 1 */}
<div className="w-[380px] px-3 py-5 rounded-lg bg-gray-900/80 shadow-xl border border-gray-800 hover:scale-[1.02] transition-all duration-300">
  <div className="flex flex-col justify-center items-center card-body items-center text-center">

    {/* Icon Box */}
    <div className="size-14 bg-gradient-to-br from-green-400/20 to-cyan-400/20 rounded-2xl
      flex items-center justify-center mb-4 shadow-inner">
      <VideoIcon className="size-8 text-cyan-400" />
    </div>

    {/* Title */}
    <h3 className="card-title text-white font-semibold text-lg">
      HD Video Call
    </h3>

    {/* Description */}
    <p className="text-gray-400 text-sm mt-2 leading-relaxed">
      Crystal clear video and audio for seamless communication during interviews.
    </p>

  </div>
</div>



       {/* Feature 2 */}
<div className="w-[380px] px-3 py-5 rounded-lg bg-gray-900/80 shadow-xl border border-gray-800 hover:scale-[1.02] transition-all duration-300">
  <div className="flex flex-col justify-center items-center text-center">

    {/* Icon Box */}
    <div className="size-14 bg-gradient-to-br from-green-400/20 to-cyan-400/20 rounded-2xl
      flex items-center justify-center mb-4 shadow-inner">
      <Code2Icon className="size-8 text-cyan-400" />
    </div>

    {/* Title */}
    <h3 className="text-white font-semibold text-lg">
      Live Code Editor
    </h3>

    {/* Description */}
    <p className="text-gray-400 text-sm mt-2 leading-relaxed">
      Collaborate in real-time with syntax highlighting and multiple language support.
    </p>

  </div>
</div>


{/* Feature 3 */}
<div className="w-[380px] px-3 py-5 rounded-lg bg-gray-900/80 shadow-xl border border-gray-800 hover:scale-[1.02] transition-all duration-300">
  <div className="flex flex-col justify-center items-center text-center">

    {/* Icon Box */}
    <div className="size-14 bg-gradient-to-br from-green-400/20 to-cyan-400/20 rounded-2xl
      flex items-center justify-center mb-4 shadow-inner">
      <UsersIcon className="size-8 text-cyan-400" />
    </div>

    {/* Title */}
    <h3 className="text-white font-semibold text-lg">
      Easy Collaboration
    </h3>

    {/* Description */}
    <p className="text-gray-400 text-sm mt-2 leading-relaxed">
      Share your screen, discuss solutions, and learn from each other in real-time.
    </p>

  </div>
</div>



      </div>


    </>
  )
}

export default Hero