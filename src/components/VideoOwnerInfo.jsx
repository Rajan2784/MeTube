import React from "react";
import { useNavigate } from "react-router-dom";

const VideoOwnerInfo = ({owner, subscribers, views}) => {
    const navigate = useNavigate()
  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => navigate(`/profile/${owner.username}`)}
    >
      <img
        src={owner.avatar}
        alt="Owner Avatar"
        className="size-10 rounded-full"
      />
      <div>
        <p className="text-lg font-[700]">{owner.username}</p>
        {views && <p className="text-sm text-end">{`${views} views`}</p> }
        {subscribers && <p className="text-sm">{`${subscribers} subscribers`}</p>}
      </div>
    </div>
  );
};

export default VideoOwnerInfo;
