import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Link, useParams } from "react-router-dom"

const CreateAlbum = () => {
const {currentUser} = useContext(AuthContext)

const [title, setTitle] = useState("")
const [albums, setAlbums] = useState([])
const [isEditing, setIsEditing] = useState (null)
 
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

     const { albumId } = useParams(); 
     
     //delete an album
     const handleDeleteAlbum = async (albumId) => {
      try {
        await axios.delete(`http://localhost:5005/api/album/${albumId}`)
        setAlbums((prev)=> prev.filter((album)=> album._id !== albumId))
      } catch (error) {
        console.log(error)
      }
    }

     //update album


  return (
    <div>
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
        <Link to={`album/${album._id}`}>
        <div key={album._id} className="flex justify-center">

    <h3 className="w-40 h-56 flex justify-center bg-blue-700 m-12 ">{album.title} <span onClick={() => handleDeleteAlbum(album._id)}className="text-white">x</span></h3>
    
        </div>
        </Link>
    )
})
}
</div>
</div>
  )
}

export default CreateAlbum
