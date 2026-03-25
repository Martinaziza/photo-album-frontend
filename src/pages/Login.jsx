import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")

const nav = useNavigate()

async function handleLogin(e) {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5005/auth/login", {username, password});

    if (res.data && res.data.authToken) {
       
       localStorage.setItem("authToken", res.data.authToken);
       
       const check = localStorage.getItem("authToken");
       
       if (check) {
         nav("/profile");
       } else {
         alert("CRITICAL: LocalStorage refused to save the token!");
       }
    }
  } catch (err) {
    console.log("Login failed:", err);
  }
}
// front end regex validation 


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col" >
<label>
    Username:
    <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} className='border-2 border-pink-600'/>
</label>
<label>
    Password:
    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}className='border-2 border-pink-600'/>
</label>
<button type="submit" >Login</button> 
      </form>
    </div>
  )
}

export default Login
