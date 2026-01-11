import React from 'react'

const Loading = () => {
  return (
    <div className="w-full flex items-center justify-center  bg-transparent backdrop-blur-sm ">
      <div className="flex space-x-2">
        <span className="w-2 h-2 bg-gray-100 rounded-full animate-[bounceSmooth_1.2s_ease-in-out_infinite] [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-gray-100 rounded-full animate-[bounceSmooth_1.2s_ease-in-out_infinite] [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-gray-100 rounded-full animate-[bounceSmooth_1.2s_ease-in-out_infinite]"></span>
      </div>

      {/* custom keyframes */}
      <style>{`
        @keyframes bounceSmooth {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  )
}

export default Loading