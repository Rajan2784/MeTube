import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";

const LikeDislikeShareBtn = ({ data, handleLike, disLiked, setDisliked }) => {
  return (
    <div className="flex justify-center items-center gap-1">
      <div className=" bg-slate-300 dark:bg-white/10 flex items-center justify-center gap-4 px-2 rounded-lg">
        <button className=" py-2 rounded-md" onClick={handleLike}>
          {data?.isLiked ? (
            <div className="flex gap-1">
              <AiFillLike className="text-xl text-red-700" />
              <p className="text-sm">{data?.totalLikes}</p>
            </div>
          ) : (
            <div className="flex gap-1">
              <AiOutlineLike className="text-xl" />
              <p className="text-sm">{data?.totalLikes || 0}</p>
            </div>
          )}
        </button>
        <button className="py-2 rounded-md">
          {disLiked ? (
            <AiOutlineDislike
              className="text-xl"
              onClick={() => setDisliked(!disLiked)}
            />
          ) : (
            <AiFillDislike
              className="text-xl text-red-700"
              onClick={() => setDisliked(!disLiked)}
            />
          )}
        </button>
      </div>
      <button
        className="py-2 rounded-md"
        // onClick={handleShare}
      >
        <div className="bg-slate-300 dark:bg-white/10 flex items-center justify-center gap-2 py-2 px-2 rounded-lg">
          <RiShareForwardLine className="text-xl" />
          <p className="text-sm">Share</p>
        </div>
      </button>
    </div>
  );
};

export default LikeDislikeShareBtn;
