import axios from "axios";
import React, { useEffect, useState } from "react";
import VerticalCard from "./VerticalCard";

const RelatedVideo = ({ videoId }) => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    try {
      const getVideos = async () => {
        setLoading(true);
        const videos = await axios.get(
          "http://localhost:8000/api/v1/videos?page=1&limit=11",
          {
            withCredentials: true,
          }
        );
        setVideos(videos.data.data.docs);
        setLoading(false);
      };
      getVideos();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const relatedVideos =
    videos && videos.filter((video) => video._id !== videoId);

  return (
    <div>
      {relatedVideos.map((video) => (
        <VerticalCard video={video} key={video._id} />
      ))}
    </div>
  );
};

export default RelatedVideo;
