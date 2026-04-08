import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from "../assets/Snapshots logo.png"
import { API_URL } from '../config/config'

const Signup = () => {
const [username, setUsername] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [errorMessage, setErrorMessage] = useState("")



const nav = useNavigate()

async function handleSignup(e){
e.preventDefault();
setErrorMessage("")
const userToSignup = {username, email, password}
try {
    const createdUser = await axios.post(`${API_URL}/auth/signup`, userToSignup)

    console.log('User signed up:', createdUser.data)
    nav("login/")
} catch (error) {
    console.log(error)
     const errMsg = error.response.data.message
      setErrorMessage(errMsg)
}
}


  return (
    <div className='bg-black w-screen h-[110vh] flex flex-col items-center border-2 border-amber-600'>
    <img src={Logo} alt="logo" className="h-45 object-contain mt-10 w-45"/>

      <form onSubmit={handleSignup} className=" flex flex-col mt-8 w-[45vw] items-center">
      <h1 className='text-[rgb(228,134,134)] text-lg mb-6'>Sign up to create your own photo albums</h1>
<label className='text-[rgb(228,134,134)]'>
    Username:
    <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} className='border-[#522B37DB] border-2 text-[rgb(228,134,134)] rounded-md ml-3 mb-4 text-lg'/>
</label>
<label className='text-[rgb(228,134,134)] text-lg'>
    Email:
    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className='border-[#522B37DB] border-2 text-[rgb(228,134,134)] rounded-md ml-3 mb-4'/>
</label>
<label className="text-[rgb(228,134,134)] text-lg">
    Password:
    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}className='border-[#522B37DB] border-2 text-[rgb(228,134,134)] rounded-md ml-3 mb-5'/>
</label>
<button className='border-[#522B37DB] border-2 bg-[rgb(228,134,134)] rounded-md w-20 px-2 py-1' type="submit" >Sign up</button> 
      </form>
      <p className="text-[#E83D3D] mt-6 text-[18px]">{errorMessage}</p>
    </div>
  )
}

export default Signup
