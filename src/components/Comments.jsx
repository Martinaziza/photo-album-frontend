import axios from "axios";
import { useEffect, useState } from "react";

const Comments = ({photoId}) => {
const [comments, setComments] = useState([])
const [content, setContent] = useState("")

//create a comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5005/api/photo/${photoId}/comment`,
        { content }
      );
      console.log(response.data);
      setComments([...comments, response.data]);
      ;
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/api/photo/${photoId}/comment`,
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
<form onSubmit={handleSubmitComment}>
<input type="text" className="border-2 w-70 h-15"/>
<button type="submit"> Leave a comment!</button>
</form>



       {comments.map((comment)=>{
return (
    <div>

{/* <img src={comment.user.profileImage}/> */}
{/* <h3 className="text-white">{comment.user.username}</h3> */}
<p className="text-white">{comment.content}</p>
    </div>
)
      })}
    </div>
  )
}

export default Comments
