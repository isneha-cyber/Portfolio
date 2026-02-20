import { useState } from 'react'

import './App.css'
import Navbar from './Components/Navbar'

import Projects from './Components/Projects'
import Footer from './Components/Footer'
import Abilities from './Components/Abilities'
import Hero from './Components/Hero'
import About from './Components/About'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Navbar/>
   <Hero/>
   <About/>
   <Projects/>
   <Abilities/>
   <Footer/>
    </>
  )
}

export default App
