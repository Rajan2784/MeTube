import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loaders/Loader";
import { formatDistanceToNow, parseISO } from "date-fns";
import VideoFrame from "./VideoFrame";
import RelatedVideo from "./RelatedVideo";
import VideoTitleAndOwnerDetails from "./VideoTitleAndOwnerDetails";
import { ApiBaseUrl } from "../utils/api";
import Comments from "./Comments";
import CommentInput from "./CommentInput"

const VideoPlay = () => {
  const { videoId } = useParams();
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState();

  const createdAtDate = video
    ? formatDistanceToNow(parseISO(video?.createdAt))
    : "";

  function formatNumbers(count = "") {
    if (count >= 1000 && count < 1000000) {
      return (count / 1000).toFixed(1) + "k";
    } else if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "m";
    } else {
      return count.toString();
    }
  }

  useEffect(() => {
    const getVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${ApiBaseUrl}/videos/${videoId}`,
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
  }, [videoId]);

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  }

  const subscribers = video && formatNumbers(video.owner_details?.subscribers);

  const views = video && formatNumbers(video.views);

 

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        video && (
          <div className="sm:mt-5 lg:mt-5 mb-12 md:px-3 py-2 px-2">
            <div className="flex flex-col lg:grid lg:grid-cols-5 lg:gap-2 ">
              {/* Left Section  */}

              <section className="lg:col-span-3">
                <div>
                  <VideoFrame video={video} />
                </div>
                <div>
                  <VideoTitleAndOwnerDetails
                    video={video}
                    setVideo={setVideo}
                    subscribers={subscribers}
                    videoId={videoId}
                  />
                </div>

                {/* Description section  */}
                <div className="border">
                  <p>
                    {views} views • {createdAtDate}
                  </p>
                  <p></p>
                  <p className="truncate w-full text-wrap text-sm mt-2">
                    {truncateText(video.description, 100)}{" "}
                    <span className=" font-semibold">Show more...</span>{" "}
                  </p>
                </div>

                {/* Comment Section  */}

                <div className="mt-5">
                  <div>
                    <Comments videoId={videoId} />
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
