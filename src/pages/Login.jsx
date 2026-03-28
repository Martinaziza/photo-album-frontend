import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const Login = () => {
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const {authenticateUser} = useContext(AuthContext)
const nav = useNavigate()

 async function handleLogin(e) {
    e.preventDefault();
    //create an object with all the data
    try {
      const res = await axios.post("http://localhost:5005/auth/login", {
        username,
        password,
      });

      console.log("logged in!", res);
      localStorage.setItem("authToken", res.data.authToken);
      //call the authenticate function from the auth context to set the three states
      await authenticateUser();
      nav("/profile");
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='h-screen bg-black w-screen'>
      <form onSubmit={handleLogin} className="flex flex-col justify-center bg-black h-screen" >
<label className="text-white">
    Username:
    <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} className='border-2 border-pink-600 ml-3 mb-4'/>
</label>
<label className="text-white">
    Password:
    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}className='border-2 border-pink-600 ml-3 mb-3'/>
</label>
<button className="border-2 border-amber-100 w-20 text-white py-1" type="submit" >Login</button> 
      </form>
    </div>
  )
}

export default Login
