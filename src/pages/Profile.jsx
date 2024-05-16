import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Tabs from "../components/Tabs";
import Loader from "../components/Loaders/Loader";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  const [userChannel, setUserChannel] = useState();
  const [loading, setLoading] = useState(false);
  const getUserProfileData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/users/c/${username}`,
        {
          withCredentials: true,
        }
      );
      setUserChannel(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  function formatNumbers(count = "") {
    if (count >= 1000 && count < 1000000) {
      return (count / 1000).toFixed(1) + "k";
    } else if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "m";
    } else {
      return count.toString();
    }
  }

  const subscribers =
    userChannel && formatNumbers(userChannel?.subscribersCount);
  const totalVideos = userChannel && formatNumbers(userChannel?.totalVideos);

  useEffect(() => {
    getUserProfileData();
  }, []);

  const handleSubscribe = async () => {
    try {
      setUserChannel((prevUserChannel) => ({
        ...prevUserChannel,
        isSubscribed: !prevUserChannel.isSubscribed,
        subscribersCount: prevUserChannel.isSubscribed
          ? prevUserChannel.subscribersCount - 1
          : prevUserChannel.subscribersCount + 1,
      }));

      const response = await axios.post(
        `http://localhost:8000/api/v1/subscriptions/c/${userChannel?._id}`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Subscription error:", error);
      setUserChannel((prevUserChannel) => ({
        ...prevUserChannel,
        isSubscribed: !prevUserChannel.isSubscribed,
        subscribersCount: prevUserChannel.isSubscribed
          ? prevUserChannel.subscribersCount + 1
          : prevUserChannel.subscribersCount - 1,
      }));
    }
  };

  return (
    <div className="w-full h-full p-2 mb-10">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <div className="w-full h-44 bg-cover rounded-md overflow-hidden">
              <img
                src={userChannel?.coverImage}
                className="w-full h-full"
                alt=""
              />
            </div>
            <div className="mt-4 flex gap-4">
              <div className="w-40 h-40 rounded-full overflow-hidden">
                <img src={userChannel?.avatar} alt="avatar" />
              </div>
              <div className="flex flex-col justify-center items-start">
                <h1 className="text-xl sm:text-2xl md:text-4xl font-bold">
                  {userChannel?.fullName}
                  <span className="text-sm">✅</span>{" "}
                </h1>
                <p>@{userChannel?.username}</p>
                <p>
                  • {subscribers} subscribers{" "}
                  <span>• {totalVideos} videos</span>
                </p>
                {userChannel?.isSubscribed ? (
                  <button
                    className="p-2 text-md sm:text-xl  rounded-md bg-[#898484]"
                    onClick={handleSubscribe}
                  >
                    Unsubscribe
                  </button>
                ) : (
                  <button
                    className="p-2 rounded-md bg-[#ff0012] text-white"
                    onClick={handleSubscribe}
                  >
                    Subscribe
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="w-full">
            <Tabs videos={userChannel && userChannel?.userVideos} />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
