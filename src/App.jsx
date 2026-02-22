import { useState } from 'react'

import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
   <Navbar/>
   <Routes>
 <Route path="/" element={<HomePage/>} /> 
 <Route path="/about" element={<AboutPage/>} />
   </Routes>
   <Footer/>
   </BrowserRouter>
    </>
  )
}

export default App
