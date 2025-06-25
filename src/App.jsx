import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/signin', '/signup'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div>
      <ScrollToTop />
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
      {shouldShowNavbar && <Footer />}
    </div>
  )
}

export default App
