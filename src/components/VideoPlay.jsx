import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loaders/Loader";
import { formatDistanceToNow, parseISO } from "date-fns";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import VideoFrame from "./VideoFrame";
import VideoOwnerInfo from "./VideoOwnerInfo";
import RelatedVideo from "./RelatedVideo";

const VideoPlay = () => {
  const { videoId } = useParams();
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState();
  const [disLiked, setDisliked] = useState(false);
  const navigate = useNavigate();
  const createdAtDate = video
    ? formatDistanceToNow(parseISO(video?.createdAt))
    : "";

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  }

  function formatNumbers(count = "") {
    if (count >= 1000 && count < 1000000) {
      return (count / 1000).toFixed(1) + "k";
    } else if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "m";
    } else {
      return count.toString();
    }
  }

  const getComments = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/comments/${videoId}?page=1&limit=3`,
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
  };

  useEffect(() => {
    const getVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/videos/${videoId}`,
          {
            withCredentials: true,
          }
        );
        setVideo(response.data.data[0]);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    getVideos();
    getComments();
  }, [videoId]);

  console.log(video);

  const handleLike = async () => {
    try {
      // Optimistically update the UI
      setVideo((prevVid) => ({
        ...prevVid,
        isLiked: !prevVid.isLiked,
        totalLikes: prevVid.isLiked
          ? prevVid.totalLikes - 1
          : prevVid.totalLikes + 1,
      }));

      // Make the network request
      const like = await axios.post(
        `http://localhost:8000/api/v1/likes/toggle/v/${videoId}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(like.data);
    } catch (error) {
      // If there's an error, revert back the UI changes
      setVideo((prevVid) => ({
        ...prevVid,
        isLiked: !prevVid.isLiked,
        totalLikes: prevVid.isLiked
          ? prevVid.totalLikes + 1
          : prevVid.totalLikes - 1,
      }));
      console.error("Error toggling like:", error);
    }
  };

  const subscribers = video && formatNumbers(video.owner_details?.subscribers);

  const views = video && formatNumbers(video.views);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        video && (
          <div className="sm:mt-5  md:px-3 py-2">
            <div className="flex flex-col lg:grid lg:grid-cols-5 lg:gap-2 ">
              {/* Left Section  */}

              <section className="lg:col-span-3">
                <div>
                  <VideoFrame video={video} />
                </div>
                <div>
                  <div className="flex flex-col gap-0 w-full">
                    <h1 className="text-xl font-bold">{video?.title}</h1>
                    <div className="flex items-center gap-2 w-full justify-between">
                      <VideoOwnerInfo
                        owner={video.owner_details}
                        subscribers={subscribers}
                      />
                      <div className="flex justify-center items-center gap-1">
                        <div className=" bg-slate-300 flex items-center justify-center gap-4 px-2 rounded-lg">
                          <button
                            className=" py-2 rounded-md"
                            onClick={handleLike}
                          >
                            {video.isLiked ? (
                              <div className="flex gap-1">
                                <AiFillLike className="text-xl text-red-700" />
                                <p className="text-sm">{video.totalLikes}</p>
                              </div>
                            ) : (
                              <div className="flex gap-1">
                                <AiOutlineLike className="text-xl" />
                                <p className="text-sm">{video.totalLikes}</p>
                              </div>
                            )}
                          </button>
                          <button className="py-2 rounded-md">
                            {disLiked ? (
                              <AiOutlineDislike
                                className="text-xl"
                                onClick={() => setDisliked(!disLiked)}
                              />
                            ) : (
                              <AiFillDislike
                                className="text-xl text-red-700"
                                onClick={() => setDisliked(!disLiked)}
                              />
                            )}
                          </button>
                        </div>
                        <button
                          className="py-2 rounded-md"
                          // onClick={handleShare}
                        >
                          <div className="bg-slate-300 flex items-center justify-center gap-2 py-2 px-2 rounded-lg">
                            <RiShareForwardLine className="text-xl" />
                            <p className="text-sm">Share</p>
                          </div>
                        </button>
                      </div>
                    </div>
                    {/* Description section  */}
                    <div className="border">
                      <p>
                        {views} views • {createdAtDate}
                      </p>
                      <p></p>
                      <p className="truncate w-full text-wrap text-sm mt-2">{truncateText(video.description, 100)} <span className=" font-semibold">Show more...</span> </p>
                    </div>
                  </div>
                </div>
              </section>
              {/* Right section  */}
              <section className="lg:col-span-2 mt-3 sm:mt-1">
                <RelatedVideo videoId={video._id} />
              </section>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default VideoPlay;
