import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import Loader from "../components/Loaders/Loader";
import VerticalCard from "../components/VerticalCard";

const LikedVideo = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLikedVideos = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:8000/api/v1/likes/videos", {
      withCredentials: true,
    });
    setVideos(response.data.data);
    // console.log(response.data)
    setLoading(false);
  };

  useEffect(() => {
    getLikedVideos();
  }, []);

  console.log(videos);

  return (
    <div className="mt-4">
      <h1>Your Liked Videos: </h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full grid grid-cols-10 mt-4">
            <div className="col-span-5">
              {videos.map((vid) => (
                <VerticalCard key={vid._id} video={vid.likedVideo[0]} />
              ))}
            </div>
            <div className="col-span-5">
              Manage the history of user
            </div>
          </div>
      )}
    </div>
  );
};

export default LikedVideo;
