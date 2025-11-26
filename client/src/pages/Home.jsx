import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import { LogIn } from 'lucide-react'
import { AppContext } from '../context/AppContext'
import Login from '../components/Login'

const Home = () => {
  const {login} = useContext(AppContext)
  return (
    <>
    {/*--------- nav sec =------------ */}
            <Navbar/>
            {/*-------- login -------- */}
     {   login && <Login/>}


    <div className='fixed inset-0 overflow-y-scroll 
    bg-black '>

        {/*-------- hero section ------- */}
        <Hero/>
        
    </div>
    </>
  )
}

export default Home