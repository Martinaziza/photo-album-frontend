import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

const AuthWrapper = ({children}) => {
   const [currentUser, setCurrentUser] = useState(null)
   const [isLoading, setIsLoading] = useState(true)
   const [isLoggedIn, setIsLoggedIn] = useState(false)
   
   
    const nav = useNavigate()

    const authenticateUser = async function(){
    const theToken = localStorage.getItem("authToken")
  
try {
    const {data} = await axios.get("http://localhost:5005/auth/verify", {
        headers: {
            authorization: `Bearer ${theToken}`
        }
    })
    console.log("token valid frontend", data)
    setIsLoading(false)
    setIsLoggedIn(true)
    setCurrentUser(data.currentUser)

} catch (error) {
    console.log(error)
    setIsLoading(false)
    setIsLoggedIn(false)
    setCurrentUser(null)
nav("/login")
}
};

useEffect(()=>{
authenticateUser()
}, [])

    return (
<AuthContext.Provider value={{}}>
    {children}
</AuthContext.Provider>

    )
}

export {AuthContext, AuthWrapper}