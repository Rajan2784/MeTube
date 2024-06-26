import React, { useState } from "react";
import VideoCard from "./VideoCard";

const Tabs = ({ videos, posts, subscribed, playlists }) => {
  const [activeTab, setActiveTab] = useState("Videos");

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mt-8">
      <button
        className={`${
          activeTab === "Videos" ? "border-b-2 border-[#ff0012]" : ""
        } transition duration-300 ease-in-out mr-4 px-4 py-2 hover:border-[#ff0012] hover:border-b-2 focus:outline-none`}
        onClick={() => handleClick("Videos")}
      >
        Videos
      </button>
      {posts && (
        <button
          className={`${
            activeTab === "Posts" ? "border-b-2 border-[#ff0012]" : ""
          } transition duration-300 ease-in-out px-4 py-2 hover:border-[#ff0012] hover:border-b-2 focus:outline-none`}
          onClick={() => handleClick("Posts")}
        >
          Posts
        </button>
      )}

      {subscribed && (
        <button
          className={`${
            activeTab === "Subscribed" ? "border-b-2 border-[#ff0012]" : ""
          } transition duration-300 ease-in-out px-4 py-2 hover:border-[#ff0012] hover:border-b-2 focus:outline-none`}
          onClick={() => handleClick("Subscribed")}
        >
          Posts
        </button>
      )}

      {playlists && (
        <button
          className={`${
            activeTab === "Playlist" ? "border-b-2 border-[#ff0012]" : ""
          } transition duration-300 ease-in-out px-4 py-2 hover:border-[#ff0012] hover:border-b-2 focus:outline-none`}
          onClick={() => handleClick("Playlist")}
        >
          Posts
        </button>
      )}
      <hr className="bg-slate-300" />
      <div className="mt-4">
        {activeTab === "Videos" && (
          <div className="w-full  grid lg:grid-cols-3 md:grid-cols-2">
            {/* Your Videos content goes here */}
            {videos &&
              videos.map((video) => (
                <VideoCard video={video} key={video._id} />
              ))}
          </div>
        )}
        {activeTab === "Posts" && (
          <div>
            {/* Your Posts content goes here */}
            <p>Posts content</p>
          </div>
        )}
        {activeTab === "Playlist" && (
          <div>
            {/* Your Posts content goes here */}
            <p>Playlist</p>
          </div>
        )}
        {activeTab === "Subscribed" && (
          <div>
            {/* Your Posts content goes here */}
            <p>Subscribed Channels</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
