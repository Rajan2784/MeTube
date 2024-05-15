import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import VideoOwnerInfo from "./VideoOwnerInfo";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();
  const createdAtDate = formatDistanceToNow(new Date(video.createdAt));

  // Modify duration field
  const durationSeconds = parseFloat(video?.duration);
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = Math.floor(durationSeconds % 60);
  const formattedDuration = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  function formatNumbers(count = "") {
    if (count >= 1000 && count < 1000000) {
      return (count / 1000).toFixed(1) + "k";
    } else if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "m";
    } else {
      return count.toString();
    }
  }

  const views = video && formatNumbers(video?.views);

  return (
    <div
      className="mb-6 w-full h-72 p-2 cursor-pointer"
      onClick={() => navigate(`/watch/${video?._id}`)}
    >
      <div className={`flex flex-col justify-center items-start gap-2`}>
        <div className="w-full h-52 relative">
          <img
            src={video?.thumbnail}
            className="w-full h-full rounded-md"
            alt="thumbnail"
          />
          <h1 className="absolute right-2 bottom-1 bg-black/60 rounded-md p-1 text-sm text-white">
            {formattedDuration}
          </h1>
        </div>
        <div className="w-full">
          <h1 className="text-xl font-bold px-1">{video?.title}</h1>

          <div className="p-1 flex justify-between items-baseline w-full">
            <VideoOwnerInfo owner={video.owner} views={views} />
            <p className="text-sm">{createdAtDate} ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
