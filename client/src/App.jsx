import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Problems from './pages/Problems'
import Dashboard from './pages/Dashboard'

/*----------- storyset.com pics free---------------- */
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/dashboard/:id' element={<Dashboard/>}/>
        <Route path='/problems/:id' element={<Problems/>}/>
      </Routes>

    </div>
  )
}

export default App