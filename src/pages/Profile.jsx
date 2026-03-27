import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import axios from "axios"
import CreateAlbum from "../components/CreateAlbum"

const Profile = () => {

const {isLoading, isLoggedIn, currentUser, authenticateUser} = useContext(AuthContext)
const [profileUser, setProfileUser] = useState()
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
    <div className="bg-black">
    <div className="flex">

{/* <img src={profileUser.profileImage} className=" w-24"></img> */}
      <h1 className="text-2xl">
{/* {profileUser.username}'s Profile */}
      </h1> 
    </div>


<CreateAlbum/>
   
    </div>
  )
}

export default Profile
