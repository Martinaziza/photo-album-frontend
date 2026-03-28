import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

const Navbar = () => {
const {handleLogout, isLoggedIn} = useContext(AuthContext)

  return (
    <nav className="flex justify-between bg-black text-white h-20 w-screen">
    <Link to="/profile">
    <img className="ml-20 mt-7" alt="logo"/>
    </Link>
{ isLoggedIn ? 
      <button className="pr-10 border-blue-950" onClick={handleLogout}>
        Logout
      </button> :
      <section className="">
      <Link to="/">
<button className="border-2 mt-7 mr-7 p-1 px-2">
        Sign Up
      </button>
      </Link>
      <Link to="/login">
      <button className="border-2 mt-7 mr-6 p-1 px-2">
        Login
      </button>
      </Link>
      </section>
      


}
    </nav>
  )
}

export default Navbar
