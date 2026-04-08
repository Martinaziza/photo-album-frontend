import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { API_URL } from "../config/config";

const CreateAlbum = () => {
  const { currentUser } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [albums, setAlbums] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  //create an album
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/api/users/${currentUser}/album`,
        { title },
      );
      console.log(response.data);
      setAlbums([...albums, response.data]);
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  //fetch all albums
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/users/${currentUser}/album`,
        );
        setAlbums(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAlbums();
  }, []);

  const handleSaveAlbum = async (albumId) => {
    try {
      await axios.patch(`${API_URL}/api/album/${albumId}`, {
        title: editTitle,
      });
      setAlbums((prev) =>
        prev.map((album) =>
          album._id === albumId ? { ...album, title: editTitle } : album,
        ),
      );
      setEditingId(null);
    } catch (error) {
      console.log(error);
      setEditingId(null);
    }
  };

  //delete an album
  const handleDeleteAlbum = async (albumId) => {
    try {
      await axios.delete(`${API_URL}/api/album/${albumId}`);
      setAlbums((prev) => prev.filter((album) => album._id !== albumId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen bg-black">
      <form onSubmit={handleSubmit} className="flex flex-col mt-10 ml-8">
        <label className="text-[rgb(228,134,134)]">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="mx-2 border-[#522B37DB] border-2 rounded-md "
          />
        </label>
        <button type="submit" className="border-[#522B37DB] border-2 bg-[rgb(228,134,134)] rounded-md my-4 px-2 py-1 w-30">
          Create New Album +
        </button>
      </form>

      <div className="flex flex-wrap justify-center">
        {albums.map((album) => {
          return (
            <div
              key={album._id}
              className="flex align-middle m-12 w-80 h-56 bg-[#522B37DB] border-2 group relative justify-center items-center"
            >
              {editingId === album._id ? (
                <input
                  autoFocus
                  type="text"
                  value={editTitle}
                  onChange={(e) => {
                    setEditTitle(e.target.value);
                  }}
                  onBlur={() => handleSaveAlbum(album._id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveAlbum(album._id);
                    if (e.key === "Escape") setEditingId(null);
                  }}
                  className="w-25 h-10"
                />
              ) : (
                <h2
                  onClick={() => {
                    setEditingId(album._id);
                    setEditTitle(album.title);
                  }}
                  className="text-[rgb(228,134,134)] text-5xl font-['Annie_Use_Your_Telescope']"
                >
                  {album.title}
                </h2>
              )}

              <span
                onClick={() => handleDeleteAlbum(album._id)}
                className="absolute top-1 right-2 cursor-pointer opacity-0 group-hover:opacity-100 text-[25px] text-white"
              >
                x
              </span>

              <Link to={`album/${album._id}`}>
                <p className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 px-27 py-2">View Album</p>
              </Link>
            </div>
          );
        })}
      </div>
//users


    </div>
  );
};

export default CreateAlbum;
