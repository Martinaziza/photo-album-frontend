import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";

const AlbumDetails = () => {


  const { albumId } = useParams(); 
  const [album, setAlbum] = useState("");
  const [photos, setPhotos] = useState([])
  const [imageUrl, setImageUrl] = useState("")
  const [caption, setCaption] = useState("")
  const [editingId, setEditingId] = useState(null)
  
  // fetch single album
 useEffect (()=>{
    const oneAlbum = async () => {
        try {
            const {data} = await axios.get(
                `http://localhost:5005/api/album/${albumId}`)
                 setAlbum(data);
        } catch (error) {
            console.log(error)
        }
     }
     oneAlbum()
 }, [albumId])

//add photos
const handleSubmit = async (e) => {
    e.preventDefault();

    const urlArray = imageUrl
        .split(",")
        .map(url => url.trim())
        .filter(url => url !== "");

  if (urlArray.length === 0) return;

try {
    const response = await axios.post(`http://localhost:5005/api/album/${albumId}/photo`, {newPhotos: urlArray})
    console.log(response.data)
    setPhotos([...photos, ...response.data])
    setImageUrl("")
} catch (error) {
    console.log(error)}}

//get all photos by id
useEffect (()=>{
  if (!albumId) return;
  
        const fetchPhotos = async () => {
        try {
            const response = await axios.get(`http://localhost:5005/api/album/${albumId}/photo`)
            setPhotos(response.data)
            console.log(response.data)
        }catch (error){
            console.log(error)
        }
     }   
        fetchPhotos()
     }, [albumId])



const handleSave = async (photoId) => {
try {
  await axios.patch(`http://localhost:5005/api/album/${albumId}/photo/${photoId}`, {caption: caption})

setPhotos((prev) => 
      prev.map((photo) => (photo._id === photoId ? { ...photo, caption: caption } : photo))
    );

    setEditingId(null)

} catch (error) {
  console.log(error)
  setEditingId(null)

}
}

// delete photo
const handleDeletePhoto = async (photoId) => {
      try {
        await axios.delete(`http://localhost:5005/api/album/${albumId}/photo/${photoId}`)
        setPhotos((prev)=> prev.filter((photo)=> photo._id !== photoId))
      } catch (error) {
        console.log(error)
      }
    }


  return (
    <div className="text-white h-screen w-screen bg-black">
      <h1> {album.title} </h1>

       <form onSubmit={handleSubmit} className="flex flex-col mt-10 ml-8">
    <label className="text-blue-700">
        Photos: 
        <input type="text" value={imageUrl} onChange={(e)=>{setImageUrl(e.target.value)}} className="mx-2 border" />
    </label>
       <button type="submit" className="bg-blue-700 my-4 px-2 py-1 w-30">
      Add photos +
    </button>
    </form>
 
 
 {photos.map((photo)=>{
  return (
    <div key={photo._id} className="bg-black">
  <img  src={photo.imageUrl} className="w-175 bg-black" />
    <span onClick={() => handleDeletePhoto(photo._id)} className="bg-black text-white">x</span>
     
     
     {editingId === photo._id ? (
      <input
      autoFocus
       type="text" 
       value={caption} 
       onChange={(e)=>{setCaption(e.target.value)}}
      onBlur={()=> handleSave(photo._id)}
      onKeyDown={(e) => {
      if (e.key === 'Enter') handleSave(photo._id);
      if (e.key === 'Escape') setEditingId(null)
      }}
       />

     ) : <span
    onClick={() => {
    setEditingId(photo._id);
    setCaption(photo.caption)}}>
      {photo.caption || "Click to edit" }
    </span>
      }

<Comments photoId={photo._id}/>


    </div>
  )

 })}



    </div>
  )
}

export default AlbumDetails

