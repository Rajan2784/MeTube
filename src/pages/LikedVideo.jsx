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
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full mt-6 mb-7 p-3 flex items-center justify-center sm:justify-normal lg:justify-start sm:gap-2 flex-wrap">
          {videos.map((vid) => (
            <VerticalCard key={vid._id} video={vid.likedVideo[0]} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedVideo;
