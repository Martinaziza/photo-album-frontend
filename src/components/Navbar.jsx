import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import Logo from "../assets/Snapshots logo.png"

const Navbar = () => {
const {handleLogout, isLoggedIn} = useContext(AuthContext)

  return (
    <nav className="bg-black h-22 w-screen border-b-3 border-[#522B37DB]">
{ isLoggedIn ?
<div className="flex items-center justify-between">
    <Link to="/profile">
    <img src={Logo} className="h-19 ml-7 mt-1" alt="logo"/>
    </Link>
      <button className="border-[#522B37DB] h-10 w-19 mr-4 border-4 bg-[rgb(228,134,134)] rounded-md" onClick={handleLogout}>
        Logout
      </button> 

</div> :
      <section className="">
      <Link to="/">
<button className="border-2 border-[#522B37DB] bg-[rgb(228,134,134)] rounded-md mt-7 ml-3 mr-3 p-1 px-2">
        Sign Up
      </button>
      </Link>
      <Link to="/login">
      <button className="border-2 border-[#522B37DB] bg-[rgb(228,134,134)] rounded-md mt-7 p-1 px-2">
        Login
      </button>
      </Link>
      </section>
      


}
    </nav>
  )
}

export default Navbar
