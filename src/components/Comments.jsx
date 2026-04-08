import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config/config";

const Comments = ({photoId}) => {
const [comments, setComments] = useState([])
const [content, setContent] = useState("")

//create a comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const storedToken = localStorage.getItem('authToken')
      const response = await axios.post(
        `${API_URL}/api/photo/${photoId}/comment`,
        { content },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      console.log(response.data);
      setComments([...comments, response.data]);
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/photo/${photoId}/comment`,
        );
        setComments(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [photoId]);
  

  return (
    <div>
<form onSubmit={handleSubmitComment} className="flex flex-col">
<input type="text" value={content} 
  onChange={(e) => setContent(e.target.value)} className="border-[#522B37DB] border-2 rounded-md w-70 h-15 mt-4"/>
<button type="submit" className="border-[#522B37DB] border-2 bg-[rgb(228,134,134)] rounded-md w-30 mt-2 mb-4"> Leave a comment!</button>
</form>



       {comments.map((comment)=>{
return (
    <div key={comment._id} className="mb-4">
<div className="flex items-center">
<img src={comment.user.profileImage} className="w-8 rounded-full border-[#522B37DB] border-3 mr-2"/>
<h3 className=" text-[rgb(228,134,134)] text-2xl font-['Annie_Use_Your_Telescope']">{comment.user.username}</h3>
</div>
<p className="text-white text-lg">{comment.content}</p>
    </div>
)
      })}
    </div>
  )
}

export default Comments
