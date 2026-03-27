import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

const Navbar = () => {
const {handleLogout, isLoggedIn} = useContext(AuthContext)

  return (
    <nav className="flex justify-between bg-black text-blue-900 h-10 pl-7 pt-4">
    <img alt="logo"/>
{ isLoggedIn ? 
      <button className="pr-10 border-blue-950" onClick={handleLogout}>
        Logout
      </button> : 
      <section>
      <Link to="/">
<button>
        Sign Up
      </button>
      </Link>
      <Link to="/login">
      <button>
        Login
      </button>
      </Link>
      </section>
      


}
    </nav>
  )
}

export default Navbar
