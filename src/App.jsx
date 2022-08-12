



import { useState } from 'react'
import reactLogo from './assets/react.svg'
import 'bootswatch/dist/sketchy/bootstrap.min.css' 
import './App.css'




import ProtectedRoutes from './components/ProtectedRoutes'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux/es/exports'
import { Home, Login, Purchases, ProductDetail } from './pages'
import { NavBar, LoadingScreen } from './components'
import CreateUser from './components/CreateUser'

function App() {
  const loading = useSelector( state => state.loading)
  
  return (
    <div className="App">
      
      {
        loading && <LoadingScreen/>
      }
        
      <HashRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createUser" element={<CreateUser />} />
            
          <Route element={<ProtectedRoutes />}>
            <Route path="/purchases" element={<Purchases />} />
          </Route>
          
        </Routes>
    </HashRouter>



    </div>
  )
}

export default App
