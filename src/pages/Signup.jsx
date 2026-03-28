import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
const [username, setUsername] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [message, setMessage] = useState(null)

const nav = useNavigate()

async function handleSignup(e){
e.preventDefault();
const userToSignup = {username, email, password}
try {
    const createdUser = await axios.post("http://localhost:5005/auth/signup", userToSignup)

    console.log('User signed up:', createdUser.data)
    nav("login/")
} catch (error) {
    console.log(error)
}
}
// front end regex validation 


  return (
    <div className='bg-black h-screen w-screen'>
      <form onSubmit={handleSignup} className=" flex flex-col h-screen justify-center" >
      <h1 className='text-white mb-7'>Sign up to create your own photo albums</h1>
<label className='text-white'>
    Username:
    <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} className='border-2 border-pink-600 ml-3 mb-4'/>
</label>
<label className='text-white'>
    Email:
    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className='border-2 border-pink-600 ml-3 mb-4'/>
</label>
<label className="text-white">
    Password:
    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}className='border-2 border-pink-600 ml-3 mb-4'/>
</label>
<button className='text-white border-2 w-20 px-2 py-1' type="submit" >Sign up</button> 
      </form>
    </div>
  )
}

export default Signup
