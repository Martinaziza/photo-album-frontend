import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import AlbumDetails from "./pages/AlbumDetails"

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
       <Route path="/"  element={<Signup/>}/> 
       <Route path="/login"  element={<Login/>}/> 
      
       <Route path="/profile"  element={
       <ProtectedRoute>

       <Profile/> 
       </ProtectedRoute>
       }
       />
       <Route path="profile/album/:albumId" element={<AlbumDetails/>}/>
      </Routes>
               </>
  )
}

export default App
