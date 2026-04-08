import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config/config";

const Users = () => {
const [users, setUsers] = useState([])

//get all users
 useEffect(() => {
   const fetchUsers = async () => {
     try {
        const storedToken = localStorage.getItem('authToken');
        const response = await axios.get(
          `${API_URL}/auth/users/`, {
    headers: { Authorization: `Bearer ${storedToken}` }
  }
        );
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);



  return (

    <div className="flex flex-col bg-black">
    <h2 className=" text-[rgb(228,134,134)] text-center text-4xl mb-6 font-['Annie_Use_Your_Telescope']">Check out other users!</h2>
    <div className="flex justify-evenly pb-10">
      {users.map((user)=>{
return (
    <div className="flex items-center">

<img src={user.profileImage} className="h-16 border-[#522B37DB] border-3 rounded-full"/>
<h2 className=" text-[rgb(228,134,134)] ml-4 text-4xl font-['Annie_Use_Your_Telescope']">{user.username}</h2>
    </div>
)
      })}
    </div>
    </div>

  )
}

export default Users
