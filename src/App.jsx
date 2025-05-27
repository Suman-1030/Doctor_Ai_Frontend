import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Landingpage from './Components/Landingpage'
import PrivacyPolicy from './Components/PrivacyPolicy'
import TermsOfUse from './Components/TermsOfUse'
import Contact from './Components/Contact'
import About from './Components/About'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landingpage/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/PrivacyPolicy' element={<PrivacyPolicy/>}/>
        <Route path='/TermsOfUse' element={<TermsOfUse/>}/>
        <Route path='/Contact' element={<Contact/>}/>

      </Routes>
    </div>
  )
}

export default App
