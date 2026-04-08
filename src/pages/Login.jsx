import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import Logo from "../assets/Snapshots logo.png"
import { API_URL } from '../config/config'

const Login = () => {
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [errorMessage, setErrorMessage] = useState("")
const {authenticateUser} = useContext(AuthContext)

const nav = useNavigate()

 async function handleLogin(e) {
    e.preventDefault();
    setErrorMessage("")
    //create an object with all the data
    try {
      const res = await axios.post("${API_URL}/auth/login", {
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
      const errMsg = error.response.data.message
      setErrorMessage(errMsg)
    }
  }


  return (
    <div className='h-[90vh] bg-black w-screen flex flex-col items-center'>
    <img src={Logo} alt="logo" className="h-45 object-contain pt-10 w-45"/>
      <form onSubmit={handleLogin} className="flex flex-col justify-center  w-[45vw] items-center mt-8" >
<label className='text-[rgb(228,134,134)]'>
    Username:
    <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} className='border-[#522B37DB] border-2 text-[rgb(228,134,134)] rounded-md ml-3 mb-4'/>
</label>
<label className="text-[rgb(228,134,134)]">
    Password:
    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}className='border-[#522B37DB] border-2 text-[rgb(228,134,134)] rounded-md ml-3 mb-5'/>
</label>
<button className="border-[#522B37DB] border-2 bg-[rgb(228,134,134)] rounded-md w-20 py-1" type="submit" >Login</button> 
      </form>
      <p className="text-[#E83D3D] mt-6 text-[18px]">{errorMessage}</p>
    </div>
  )
}

export default Login
