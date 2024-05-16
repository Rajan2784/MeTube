import React, { useState } from "react";

import VideoOwnerInfo from "./VideoOwnerInfo";
import axios from "axios";
import LikeDislikeShareBtn from "./LikeDislikeShareBtn";

const VideoTitleAndOwnerDetails = ({ videoId, video, setVideo, subscribers }) => {
  const [disLiked, setDisliked] = useState(false);
  const handleLike = async () => {
    try {
      // Optimistically update the UI
      setVideo((prevVid) => ({
        ...prevVid,
        isLiked: !prevVid.isLiked,
        totalLikes: prevVid.isLiked
          ? prevVid.totalLikes - 1
          : prevVid.totalLikes + 1,
      }));

      // Make the network request
      const like = await axios.post(
        `http://localhost:8000/api/v1/likes/toggle/v/${videoId}`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      // If there's an error, revert back the UI changes
      setVideo((prevVid) => ({
        ...prevVid,
        isLiked: !prevVid.isLiked,
        totalLikes: prevVid.isLiked
          ? prevVid.totalLikes + 1
          : prevVid.totalLikes - 1,
      }));
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="flex flex-col gap-0 w-full">
      <h1 className="text-xl font-bold">{video?.title}</h1>
      <div className="flex items-center gap-2 w-full justify-between">
        <VideoOwnerInfo owner={video?.owner_details} subscribers={subscribers} />
        {/* <div className="flex justify-center items-center gap-1">
          <div className=" bg-slate-300 dark:bg-white/10 flex items-center justify-center gap-4 px-2 rounded-lg">
            <button className=" py-2 rounded-md" onClick={handleLike}>
              {video.isLiked ? (
                <div className="flex gap-1">
                  <AiFillLike className="text-xl text-red-700" />
                  <p className="text-sm">{video.totalLikes}</p>
                </div>
              ) : (
                <div className="flex gap-1">
                  <AiOutlineLike className="text-xl" />
                  <p className="text-sm">{video.totalLikes}</p>
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
        </div> */}

        <LikeDislikeShareBtn handleLike={handleLike} data={video} disLiked={disLiked} setDisliked={setDisliked} />

      </div>
    </div>
  );
};

export default VideoTitleAndOwnerDetails;
