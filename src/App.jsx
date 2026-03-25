import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'

function App() {

  return (
    <>
      <h1>hellow world</h1>
      <Routes>
       <Route path="/"  element={<Signup/>}/> 
       <Route path="/login"  element={<Login/>}/> 
       <Route path="/profile"  element={<Profile/>}/> 

      </Routes>
               </>
  )
}

export default App
