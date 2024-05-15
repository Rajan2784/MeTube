import React from "react";

const VerticalCard = ({ video }) => {
  function formatNumbers(count = "") {
    if (count >= 1000 && count < 1000000) {
      return (count / 1000).toFixed(1) + "k";
    } else if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "m";
    } else {
      return count.toString();
    }
  }

  const durationSeconds = parseFloat(video?.duration);
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = Math.floor(durationSeconds % 60);
  const formattedDuration = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  const views = video && formatNumbers(video?.views);
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }
  
  return (
    <div className="grid grid-cols-5 gap-3 cursor-pointer mb-4 w-full">
      <div className="col-span-2 h-32 relative">
          <img
            src={video?.thumbnail}
            className="w-72 h-full rounded-md"
            alt="thumbnail"
          />
          <h1 className="absolute right-2 bottom-1 bg-black/60 rounded-md p-1 text-sm text-white">
            {formattedDuration}
          </h1>
      </div>
      <div className="col-span-3 flex flex-col">
        <h1 className="font-bold">{video.title}</h1>
        <p className="text-md">{video.owner?.username} <span>• {views} views</span> </p>
        <p className="truncate w-[80%] text-wrap text-sm mt-2">{truncateText(video.description, 90)}</p>
      </div>
      
    </div>
  );
};

export default VerticalCard;
