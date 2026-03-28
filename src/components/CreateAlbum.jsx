import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

const CreateAlbum = () => {
const {currentUser} = useContext(AuthContext)

const [title, setTitle] = useState("")
const [albums, setAlbums] = useState([])
const [isEditing, setIsEditing] = useState (false)
 
//create an album
const handleSubmit = async (e) => {
    e.preventDefault();
try {
    const response = await axios.post(`http://localhost:5005/api/users/${currentUser}/album`, {title})
    console.log(response.data)
    setAlbums([...albums, response.data])
    setTitle("")
} catch (error) {
    console.log(error)
}
}

 //fetch all albums
     useEffect (()=>{
        const fetchAlbums = async () => {
        try {
            const response = await axios.get(`http://localhost:5005/api/users/${currentUser}/album`)
            setAlbums(response.data)
            console.log(response.data)
        }catch (error){
            console.log(error)
        }
     }   
        fetchAlbums()
     }, [])
     
     //delete an album
     const handleDeleteAlbum = async (albumId) => {
      try {
        await axios.delete(`http://localhost:5005/api/album/${albumId}`)
        setAlbums((prev)=> prev.filter((album)=> album._id !== albumId))
      } catch (error) {
        console.log(error)
      }
    }



  return (
    <div className="w-screen bg-black">
    <form onSubmit={handleSubmit} className="flex flex-col mt-10 ml-8">
    <label className="text-blue-700">
        Title: 
        <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="mx-2 border" />
    </label>
       <button type="submit" className="bg-blue-700 my-4 px-2 py-1 w-30">
      Create New Album +
    </button>
    </form>

<div className="flex flex-wrap">
{albums.map((album)=>{
    return(
        <div key={album._id} className="flex flex-col align-middle m-12">

    <h3 className="w-80 h-56 flex justify-center bg-blue-700">{album.title} <span onClick={() => handleDeleteAlbum(album._id)}className="text-white ml-2 h-6 w-4">x</span></h3>
    
        <Link to={`album/${album._id}`}>
        <p className="text-white mt-2">See Album</p>
        </Link>
        </div>
    )
})
}
</div>
</div>
  )
}

export default CreateAlbum
