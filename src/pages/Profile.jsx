import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import axios from "axios"
import CreateAlbum from "../components/CreateAlbum"
import Users from "../components/Users"
const Profile = () => {

const {isLoading, isLoggedIn, currentUser} = useContext(AuthContext)
const [profileUser, setProfileUser] = useState("")
console.log(isLoading, isLoggedIn, currentUser)
useEffect(()=>{
  async function getProfileUser(){
    const token = localStorage.getItem("authToken");
    try {
      const {data} = await axios.get(`http://localhost:5005/auth/users/${currentUser}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      console.log(data)
      setProfileUser(data)
    } catch (error) {
      console.log(error)
    }
  }
getProfileUser()
}, [currentUser])
  return (
    <div className="bg-black w-screen">
    <div className="flex items-center pt-4">

<img src={profileUser.profileImage} className="border-[#522B37DB] border-3 rounded-full w-20 ml-4"></img>
      <h1 className="text-3xl text-[rgb(228,134,134)] ml-4">
{profileUser.username}'s Profile
      </h1> 
    </div>


<CreateAlbum/>

<Users/>
   
    </div>
  )
}

export default Profile
