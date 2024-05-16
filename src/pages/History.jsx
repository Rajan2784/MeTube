import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loaders/Loader";
import VideoCard from "../components/VideoCard";
import VerticalCard from "../components/VerticalCard";

const History = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const getHistory = async () => {
    setLoading(true);
    const response = await axios.get(
      "http://localhost:8000/api/v1/users/history",
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    setVideos(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-5 ml-2 mb-6">
          <h1 className="text-xl font-bold py-2">Watched Videos: </h1>
          <div className="w-full grid grid-cols-10">
            <div className="col-span-5">
              {videos.map((vid) => (
                // <VideoCard key={vid._id} video={vid} />
                <VerticalCard key={vid._id} video={vid} />
              ))}
            </div>
            <div className="col-span-5">
              Manage the history of user
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
