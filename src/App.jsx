import { useState } from 'react'

import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import WorksPage from './Pages/WorksPage'
import Workdetail from './Pages/Workdetail'
import Cursor from './Components/Cursor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Cursor/>
   <Navbar/>
   <Routes>
 <Route path="/" element={<HomePage/>} /> 
 <Route path="/about" element={<AboutPage/>} />
 <Route path="/works" element={<WorksPage/>} />
 <Route path="/workdetail" element={<Workdetail/>} />
   </Routes>
   <Footer/>
   </BrowserRouter>
    </>
  )
}

export default App
