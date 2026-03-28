import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import axios from "axios"
import CreateAlbum from "../components/CreateAlbum"

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
    <div className="flex">

<img src={profileUser.profileImage} className=" w-24"></img>
      <h1 className="text-2xl text-white">
{profileUser.username}'s Profile
      </h1> 
    </div>


<CreateAlbum/>

//show users

   
    </div>
  )
}

export default Profile
