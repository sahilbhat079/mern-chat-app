import { Toaster } from 'react-hot-toast'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import { Routes,Route, Navigate } from 'react-router-dom'
import {useAuthHook } from './context/authcontext'

function App() {
  const {Authuser}=useAuthHook();
  return (
    <>
     <div className='p-4 h-screen flex items-center justify-center'> 
      <Routes>
        <Route path="/"   element={Authuser ? <Home/>:<Navigate to={"/login"}/>}/>        
        <Route path="/login"  element={Authuser? <Navigate to ='/' />:<Login/>}/>        
        <Route path="/signup" element={Authuser?<Navigate to ='/' />:<Signup/>} />        
      </Routes>
      <Toaster/>
      {/* <Login></Login> */}
      {/* <Signup></Signup> */}
     </div>
    </>
  )
}

export default App
