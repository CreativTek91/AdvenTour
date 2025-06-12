import  { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import { FaHeart } from "react-icons/fa";
import './like.css';
import $api from "../../http/api";
const LikeButton = ({ tripId, userId }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { user } = useAuthStore();
  if (!userId) {
    userId = user?.id;
  }
  useEffect(() => {
    $api
      .get(`/likes/status?tripId=${tripId}&userId=${userId}`)
      .then((res) => setLiked(res.data.liked));
    $api
      .get(`/likes/count/${tripId}`)
      .then((res) => setLikeCount(res.data.count));
  }, [tripId, userId]);
  const toggleLike = (e) => {
    e.stopPropagation();
    const url = liked ? "/likes/unlike" : "/likes/like";
    $api.post(url, { tripId, userId });
      
      setLiked(!liked);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
   
  };
  return (
    <button onClick={toggleLike} className={`like-btn  ${likeCount ? 'liked' : ''}`}>
      <FaHeart size={22} /> {likeCount}
    </button>
  );
};
export default LikeButton;
