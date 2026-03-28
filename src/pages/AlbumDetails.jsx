import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

const AlbumDetails = () => {


  const { albumId } = useParams(); 
  const [album, setAlbum] = useState("");
  const [photos, setPhotos] = useState([])
  const [imageUrl, setImageUrl] = useState("")
  const [caption, setCaption] = useState("")
  
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

//await post all photos by id

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

//await get all photos by id
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

// Update info
// delete photo


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
    <div key={photo._id}>
  <img  src={photo.imageUrl} className="w-175" />
    
    <form>
      <input type="text" placeholder="caption" value={caption} onChange={(e)=>{setCaption(e.target.value)}}/>
    </form>

    </div>
  )

 })}



    </div>
  )
}

export default AlbumDetails
