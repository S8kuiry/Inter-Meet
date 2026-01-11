import React from 'react' // Removed useContext
import Logo from './Logo'
import { ArrowRight, BookDashed, LayoutDashboard } from 'lucide-react'
// Removed AppContext import
import { 
  SignInButton, // Import this to handle login without context
  SignedIn, 
  SignedOut, // Import this to show content only when logged out
  UserButton, 
  useUser 
} from '@clerk/clerk-react'
import { useNavigate, useLocation } from 'react-router-dom' // Import useLocation

const Navbar = () => {
  const location = useLocation() // Safe way to check current URL
  const { user } = useUser()
  const navigate = useNavigate()

  // Helper to check if a tab is active
  const isActive = (path) => location.pathname.includes(path)

  return (
    <div className='w-full fixed top-0 z-30 bg-gray-900/90 border-b border-b-1 border-green-400/70 flex items-center justify-between px-8 py-3' >

      <Logo  size={40} />

      <div className="flex items-center gap-4 ">

        {/* 1. REPLACEMENT FOR APP CONTEXT LOGIN */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className='cursor-pointer active:scale-96 hover:scale-103 transition-all duration-300 px-4 py-3 bg-gradient-to-r rounded-lg from-green-300 to-cyan-400 text-white font-bold flex items-center justify-center gap-2 text-xs'>
              Get Started <ArrowRight className='size-4' />
            </button>
          </SignInButton>
        </SignedOut>

        {/* 2. LOGGED IN NAVIGATION */}
        <SignedIn>
          <div 
            onClick={() => navigate(`/problems/${user?.id}`)} 
            // 3. FIXED THE CRASH HERE: uses isActive() instead of params.split
            className={`${isActive('/problems') ? "text-green-500 border-green-500" : "border-gray-400 text-gray-400"} border cursor-pointer active:scale-96 hover:scale-103 px-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2 text-xs`}
          >
            <BookDashed className='size-4 font-bold' />
            Problems
          </div>
        </SignedIn>

        <SignedIn>
          <div 
            onClick={() => navigate(`/dashboard/${user?.id}`)} 
            className={`${isActive('/dashboard') ? "border border-green-500  text-green-500" : "bg-transparent text-gray-400 border "} cursor-pointer active:scale-96 hover:scale-103 transition-all duration-300 px-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2 text-xs`}
          >
            <LayoutDashboard className='size-4 font-bold' />
            Dashboard
          </div>
        </SignedIn>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}

export default Navbar