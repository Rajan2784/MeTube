import React, { useState } from "react";
import { useSelector } from "react-redux";

const CommentInput = ({ onComment }) => {
  const { userData } = useSelector((store) => store.auth);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(comment);
      setComment('');
    }
  };

  return (
    <div>
      <h1>Commenting as:</h1>
      <div className="flex items-center gap-3 mb-4">
        <img src={userData?.avatar} className="w-10 h-10 rounded-full" alt="" />
        <div>
          <h3 className="font-bold">{userData?.fullName}</h3>
          <p className="text-sm">@{userData?.username}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
        <input
          type="text"
          name="content"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 p-2 border-b-2 outline-none focus:border-red-700 dark:bg-transparent border-gray-300 rounded mr-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
