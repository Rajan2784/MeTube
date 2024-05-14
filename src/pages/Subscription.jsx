import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loaders/Loader";

const Subscription = () => {
  const { userData } = useSelector((state) => state.auth);
  const [channel, setChannel] = useState([]);
  const [loading, setLoading] = useState(false);
  const getSubscribedChannel = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/v1/subscriptions/u/${userData._id}`,
        {
          withCredentials: true,
        }
      );
      setChannel(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log("Error occured while fetching data from server", error);
      setLoading(false);
    }
  };
  console.log(channel);

  useEffect(() => {
    getSubscribedChannel();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-6 ml-2">
          <h1>Subscribed Channels: </h1>
          <div className="w-full mt-4">
            {channel.map((ch) => (
              <div className="w-full flex gap-2 overflow-x-auto">
                <div>
                  <div className="w-20 h-20 bg-cover bg-center rounded-full overflow-hidden">
                    <img className="" src={ch.channel?.avatar} alt="avatar" />
                  </div>
                  <h1>@{ch.channel?.username}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;
