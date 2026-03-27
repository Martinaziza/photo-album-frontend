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
