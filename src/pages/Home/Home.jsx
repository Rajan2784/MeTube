import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loaders/Loader";
import VideoCard from "../../components/VideoCard";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 4;

  const getInitialVideos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/v1/videos?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      setVideos(response.data.data.docs);
      setData(response.data.data);
      setPage(response.data.data.page + 1); // Update page based on server response
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getNextVideos = async () => {
    try {
      const nextPage = page + 1;
      const response = await axios.get(
        `http://localhost:8000/api/v1/videos?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      setVideos([...videos, ...response.data.data.docs]);
      setData(response.data.data);
      setPage(nextPage); // Update page state
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getInitialVideos();
  }, []);

  return (
    <div>
      {status === true ? (
        <div className="mt-6 mb-10">
          <InfiniteScroll
            className="w-full  grid lg:grid-cols-3 md:grid-cols-2 gap-2"
            dataLength={videos.length}
            next={getNextVideos}
            hasMore={data?.hasNextPage}
            loader={<Loader />}
          >
            {videos.map((video) => (
              <VideoCard video={video} key={video._id} />
            ))}
          </InfiniteScroll>
        </div>
      ) : (
        <div className="flex items-center justify-center h-svh flex-col">
          <h1>Please Login to see the videos</h1>
          <div className="flex justify-evenly mt-4 items-center w-full gap-2 sm:invisible">
            <button className="btn-blue" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="btn-blue" onClick={() => navigate("/signup")}>
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
