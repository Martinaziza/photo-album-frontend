import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

const AuthWrapper = ({children}) => {
   const [currentUser, setCurrentUser] = useState(null)
   const [isLoading, setIsLoading] = useState(true)
   const [isLoggedIn, setIsLoggedIn] = useState(false)
   
   
    const nav = useNavigate()

    

const authenticateUser = async function () {
    try {
      const theToken = localStorage.getItem("authToken");
      if (!theToken) {
        setIsLoading(false);
        setIsLoggedIn(false);
        setCurrentUser(null);
        return;
      }
      const { data } = await axios.get("http://localhost:5005/auth/verify", {
        headers: {
          authorization: `Bearer ${theToken}`,
        },
      });

      setIsLoggedIn(true);
      setCurrentUser(data.currentUser);
    } catch (error) {
      console.log(error.response.data.errorMessage);
      setIsLoggedIn(false);
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  };

function handleLogout (){
    localStorage.removeItem('authToken')
    setIsLoggedIn(false)
    nav("/login")
}

  useEffect(() => {
    authenticateUser();
  }, []);

    return (
<AuthContext.Provider value={{isLoading, isLoggedIn, currentUser, authenticateUser,handleLogout}}>
    {children}
</AuthContext.Provider>

    )
}

export {AuthContext, AuthWrapper}