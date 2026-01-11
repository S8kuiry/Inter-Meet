import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Problems from './pages/Problems'
import Dashboard from './pages/Dashboard'
import ProblemPage from './pages/ProblemPage'
import {ToastContainer} from 'react-toastify'
import SessionPage from './pages/SessionPage'
/*----------- storyset.com pics free---------------- */
const App = () => {
  return (
    <div >
      <ToastContainer position='top-center' theme='dark'/>
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/dashboard/:id' element={<Dashboard/>}/>
        <Route path='/problems/:id' element={<Problems/>}/>
        <Route path='/problem/:problemId' element={<ProblemPage/>}/>
        <Route path='/session/:id' element={<SessionPage/>}></Route>
      </Routes>

    </div>
  )
}

export default App