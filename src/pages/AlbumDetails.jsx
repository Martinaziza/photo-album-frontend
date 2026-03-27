import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

const AlbumDetails = () => {
//await post all photos by id
//await get all photos by id
// add photos buttton
// map photos
//form in the map
// Update info
// delete photo

// fetch single album
const { albumId } = useParams(); 
  const [album, setAlbum] = useState(null);

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


  return (
    <div className="">
      {/* <h1> {album.title} </h1> */}

    </div>
  )
}

export default AlbumDetails
