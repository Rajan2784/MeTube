import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loaders/Loader";
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

  const groupByDate = (history) => {
    return history.reduce((acc, item) => {
      const date = new Date(item.watchedAt);
      let formattedDate;
      if (isToday(date)) {
        formattedDate = "Today";
      } else if (isYesterday(date)) {
        formattedDate = "Yesterday";
      } else {
        formattedDate = date.toLocaleDateString();
      }
      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }
      acc[formattedDate].push(item.video);
      console.log(item)
      return acc;
    }, {});
  };

  // Function to check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Function to check if a date is yesterday
  const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    );
  };

  // Group the watch history by watch date
  const groupedHistory = groupByDate(videos && videos);

  return (
    <div className="p-2  lg:p-5">
      <h1>Watch History</h1>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          <div className=" col-span-2 md:col-span-1">
            {Object.entries(groupedHistory).map(([date, videos]) => (
              <div key={date}>
                <h2>{date}</h2>
                <hr className="mb-3" />
                <ul>
                  {videos.map((video) => (
                    <li key={video._id}>
                      <div>
                        <VerticalCard video={video} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="col-span-1 hidden lg:block">
            Right side of the history page
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
