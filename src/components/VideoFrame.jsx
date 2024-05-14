import React from "react";

const VideoFrame = ({video}) => {
  return (
    <div>
      <video
        className="lg:w-[100%] md:w-full sm:w-[50vw] h-80"
        poster={video?.thumbnail}
        controls
      >
        <source src={video?.videoFile} />
      </video>
    </div>
  );
};

export default VideoFrame;
