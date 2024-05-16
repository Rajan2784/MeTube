import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loaders/Loader";
import Tabs from "../components/Tabs";
import { CiEdit } from "react-icons/ci";

const MyProfilePage = () => {
  const { userData } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  console.log(userData);
  return (
    <div>
      <div className="w-full h-full p-2 mb-10">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div>
              <div className="w-full h-44 bg-cover relative">
                <img
                  src={userData?.coverImage}
                  className="w-full h-full rounded-md"
                  alt=""
                />
                <div className="size-28 lg:size-40 rounded-full overflow-hidden absolute left-4 top-24 z-10">
                  <img src={userData?.avatar} alt="avatar" />
                </div>
              </div>

              <div className="mt-8 flex justify-evenly gap-4">
                <div className="flex flex-col justify-center items-start">
                  <h1 className="text-xl sm:text-2xl md:text-4xl font-bold">
                    {userData?.fullName}
                    <span className="text-sm">✅</span>{" "}
                  </h1>
                  <p>@{userData?.username}</p>
                  <p>{userData?.email}</p>
                </div>
                <div className="grid items-center">
                  <button className="flex py-2 px-3 items-center gap-2 border rounded-md dark:hover:bg-white/5 hover:bg-red-100 hover:text-[#ff0012] dark:hover:text-white">
                    <CiEdit /> Edit
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full">
              <Tabs videos={userData && userData?.userVideos} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfilePage;
