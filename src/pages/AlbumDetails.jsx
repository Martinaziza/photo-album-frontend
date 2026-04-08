import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import { API_URL } from "../config/config";

const AlbumDetails = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState("");
  const [photos, setPhotos] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [editingId, setEditingId] = useState(null);

  // fetch single album
  useEffect(() => {
    const oneAlbum = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/album/${albumId}`,
        );
        setAlbum(data);
      } catch (error) {
        console.log(error);
      }
    };
    oneAlbum();
  }, [albumId]);

  //add photos
  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlArray = imageUrl
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url !== "");

    if (urlArray.length === 0) return;

    try {
      const response = await axios.post(
        `${API_URL}/api/album/${albumId}/photo`,
        { newPhotos: urlArray },
      );
      console.log(response.data);
      setPhotos([...photos, ...response.data]);
      setImageUrl("");
    } catch (error) {
      console.log(error);
    }
  };

  //get all photos by id
  useEffect(() => {
    if (!albumId) return;

    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/album/${albumId}/photo`,
        );
        setPhotos(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPhotos();
  }, [albumId]);

  const handleSave = async (photoId) => {
    try {
      await axios.patch(
        `${API_URL}/api/album/${albumId}/photo/${photoId}`,
        { caption: caption },
      );

      setPhotos((prev) =>
        prev.map((photo) =>
          photo._id === photoId ? { ...photo, caption: caption } : photo,
        ),
      );

      setEditingId(null);
    } catch (error) {
      console.log(error);
      setEditingId(null);
    }
  };

  // delete photo
  const handleDeletePhoto = async (photoId) => {
    try {
      await axios.delete(
        `${API_URL}/api/album/${albumId}/photo/${photoId}`,
      );
      setPhotos((prev) => prev.filter((photo) => photo._id !== photoId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-white h-screen w-screen bg-black">
      <form onSubmit={handleSubmit} className="flex flex-col py-8 pl-8">
        <label className="text-[rgb(228,134,134)]">
          Photos:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
            className="mx-2 border-[#522B37DB] border-2 rounded-md"
          />
        </label>
        <button
          type="submit"
          className="border-[#522B37DB] border-2 bg-[rgb(228,134,134)] rounded-md my-4 px-2 py-1 w-30"
        >
          Add photos +
        </button>
      </form>

      <h1 className="font-['Annie_Use_Your_Telescope'] text-[rgb(228,134,134)] text-5xl font-medium text-center mb-9 ">
        {" "}
        {album.title}{" "}
      </h1>
      {photos.map((photo) => {
        return (
          <div key={photo._id} className="bg-black flex flex-col items-center">
          <div className="relative group">
            <img src={photo.imageUrl} className="w-170 bg-black object-contain mt-20 mb-3" />
            <span
              onClick={() => handleDeletePhoto(photo._id)}
              className="absolute top-20 right-3 cursor-pointer opacity-0 group-hover:opacity-100 text-[25px] text-white font-semibold"
            >
              X
            </span>
          

            {editingId === photo._id ? (
              <input
                autoFocus
                type="text"
                value={caption}
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
                onBlur={() => handleSave(photo._id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave(photo._id);
                  if (e.key === "Escape") setEditingId(null);
                }}
              />
            ) : (
              <span
                onClick={() => {
                  setEditingId(photo._id);
                  setCaption(photo.caption);
                }}
                className="text-lg"
              >
                {photo.caption || "Add caption"}
              </span>
            )}

            <Comments photoId={photo._id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AlbumDetails;
