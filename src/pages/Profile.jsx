import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import axios from "axios"
import CreateAlbum from "../components/CreateAlbum"
import Users from "../components/Users"
import { API_URL } from "../config/config"

const Profile = () => {

const {isLoading, isLoggedIn, currentUser, setCurrentUser} = useContext(AuthContext)
const [profileUser, setProfileUser] = useState({})
const [uploading, setUploading] = useState(false)

console.log(isLoading, isLoggedIn, currentUser)
useEffect(()=>{
  async function getProfileUser(){
    const token = localStorage.getItem("authToken");
    try {
      const {data} = await axios.get(`${API_URL}/auth/users/${currentUser}`,
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
if (!currentUser) return;
getProfileUser()
}, [currentUser])
  
// 1. Create the reference to the hidden input
  const fileInputRef = useRef(null);

  // 2. Triggered when the image is clicked
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    setUploading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.patch(
        `${API_URL}/auth/users/${currentUser}/upload`,
        formData,
        { 
          headers: { 
            "Content-Type": "multipart/form-data", 
          Authorization: `Bearer ${token}` } }
      );

      setProfileUser(response.data);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };




return (
    <div className="bg-black w-screen min-h-screen flex flex-col">
    <div className="flex items-center pt-4">

<img src={`${profileUser.profileImage}`}className="border-[#522B37DB] border-3 rounded-full w-20 ml-6"
onClick={handleImageClick}
></img>

<input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        style={{ display: "none" }} 
        accept="image/*"
      />

      <h1 className="text-4xl text-[rgb(228,134,134)] ml-4 font-['Annie_Use_Your_Telescope']">
{profileUser.username}'s Profile
      </h1> 
    </div>


<CreateAlbum/>

  <div className="mt-auto">
<Users/>
  </div>

   
    </div>
  )
}

export default Profile
