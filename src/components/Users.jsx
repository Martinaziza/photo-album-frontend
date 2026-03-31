import axios from "axios";
import { useEffect, useState } from "react";

const Users = () => {
const [users, setUsers] = useState([])

//get all users
 useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/auth/users/`,
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
    <div>
      {users.map((user)=>{
return (
    <div>

<img src={user.profileImage}/>
<h2>{user.username}</h2>
    </div>
)
      })}
    </div>
  )
}

export default Users
