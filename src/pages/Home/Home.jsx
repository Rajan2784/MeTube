import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loaders/Loader";
import VideoCard from "../../components/VideoCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { ApiBaseUrl } from "../../utils/api";
import { ToggleContext } from "../../context/Toggle";

const Home = () => {
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { showSideBar } = useContext(ToggleContext);
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const getInitialVideos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${ApiBaseUrl}/videos?page=${page}&limit=${limit}`,
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
    <div className="h-[100vh] w-full overflow-y-scroll mt-4">
      {loading ? (
        <Loader />
      ) : status === true ? (
        videos?.length === 0 ? (
          <h1>NO videos found</h1>
        ) : (
          videos && (
            <div className="mb-10">
              <InfiniteScroll
                className={`w-full grid ${
                  showSideBar
                    ? "lg:grid-cols-4  gap-0"
                    : "lg:grid-cols-3  gap-1"
                }  md:grid-cols-2`}
                dataLength={videos?.length}
                next={getNextVideos}
                hasMore={data?.hasNextPage}
                loader={<Loader />}
              >
                {videos.map((video) => (
                  <VideoCard video={video} key={video._id} />
                ))}
              </InfiniteScroll>
              {videos.length >= data?.totalDocs ? (
                <div className="flex flex-col justify-center items-center">
                  <img src="/check.png" width={48} height={48} alt="check" />
                  <p className="text-lg font-bold font-mono">Got all videos</p>
                </div>
              ) : (
                ""
              )}
            </div>
          )
        )
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
