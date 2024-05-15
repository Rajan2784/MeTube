// src/Comment.js
import React, { useState } from "react";
import LikeDislikeShareBtn from "./LikeDislikeShareBtn";
import axios from "axios";

const CommentCard = ({ comment, setComments }) => {
  const [dislike, setDislike] = useState(0);
  const [replyVisible, setReplyVisible] = useState(false);
  const [replies, setReplies] = useState([]);

  // const handleDislike = () => setDislikeCount(dislikeCount + 1);
  // const toggleReply = () => setReplyVisible(!replyVisible);
  const handleReply = (replyText) => {
    setReplies([...replies, replyText]);
    setReplyVisible(false);
  };


  const handleLike = async () => {
    try {
      // Optimistically update the UI
      setComments((prevComments) =>
        prevComments.map((prevComment) =>
          prevComment._id === comment._id
            ? {
                ...prevComment,
                isLiked: !prevComment.isLiked,
                totalLikes: prevComment.isLiked
                  ? prevComment.totalLikes - 1
                  : prevComment.totalLikes + 1,
              }
            : prevComment
        )
      );

      // Make the network request
      const like = await axios.post(
        `http://localhost:8000/api/v1/likes/toggle/c/${comment._id}`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      // If there's an error, revert back the UI changes
      setComments((prevComments) =>
        prevComments.map((prevComment) =>
          prevComment._id === comment._id
            ? {
                ...prevComment,
                isLiked: !prevComment.isLiked,
                totalLikes: prevComment.isLiked
                  ? prevComment.totalLikes + 1
                  : prevComment.totalLikes - 1,
              }
            : prevComment
        )
      );
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="flex flex-col mb-4 p-4 border-b border-gray-200">
      <div className="flex items-center">
        <img
          src={comment.owner.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full mr-4"
        />
        <div className="flex-1">
          <div className="mb-1">@{comment.owner.username}</div>
          <div className="">{comment.content}</div>
        </div>
      </div>
      <div className="flex mt-2 space-x-4">

        <LikeDislikeShareBtn
          data={comment}
          handleLike={handleLike}
          setDisliked={setDislike}
          disLiked={dislike}
        />
      </div>

      {replyVisible && <ReplyBox onReply={handleReply} />}
      {replies.length > 0 && (
        <div className="ml-12 mt-2">
          {replies.map((reply, index) => (
            <div key={index} className="mb-2">
              {reply}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ReplyBox = ({ onReply }) => {
  const [replyText, setReplyText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onReply(replyText);
    setReplyText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mt-2">
      <input
        type="text"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Add a reply..."
        className="flex-1 p-2 border border-gray-300 rounded mr-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Reply
      </button>
    </form>
  );
};

export default CommentCard;
