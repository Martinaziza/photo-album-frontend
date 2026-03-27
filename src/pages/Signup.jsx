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
    <div>
      <h1>Sign up!</h1>
      <form onSubmit={handleSignup} className="flex flex-col" >
<label>
    Username:
    <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} className='border-2 border-pink-600'/>
</label>
<label>
    Email:
    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className='border-2 border-pink-600'/>
</label>
<label>
    Password:
    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}className='border-2 border-pink-600'/>
</label>
<button type="submit" >Sign up</button> 
      </form>
    </div>
  )
}

export default Signup
