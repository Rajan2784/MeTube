import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { GoHistory } from "react-icons/go";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineSubscriptions } from "react-icons/md";
import { RiPlayListAddLine } from "react-icons/ri";
import { AiOutlineLike } from "react-icons/ai";

const SideBar = () => {
  const status = useSelector((state) => state.auth.status);
  const location = useLocation();
  const user = useSelector((state) => state.auth.userData);
  return (
    <div className="p-4 bg-slate-100 h-full">
      {status && (
        <aside className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-1">
            <div>
              <Link
                to={"/"}
                className={`${location.pathname === "/" ? "active" : "link"}`}
              >
                <GoHome className="link p-0" fontSize={24} />
                <p>Home</p>
              </Link>
            </div>
            <div>
              <Link
                className={`${
                  location.pathname === "/subscription" ? "active" : "link"
                }`}
                to={"/subscription"}
              >
                <MdOutlineSubscriptions className="link p-0" fontSize={24} />
                <p>Subscription</p>
              </Link>
            </div>
          </div>
          <hr className="border border-red-200 my-1" />
          <div className="flex flex-col gap-1">
            <h1 className="text-xl">You</h1>
            <div>
              <Link
                to={"/history"}
                className={`${
                  location.pathname === "/history" ? "active" : "link"
                }`}
              >
                <GoHistory className="link p-0" fontSize={24} />
                <p>History</p>
              </Link>
            </div>

            <div>
              <Link
                to={"/playlist"}
                className={`${
                  location.pathname === "/playlist" ? "active" : "link"
                }`}
              >
                <RiPlayListAddLine className="link p-0" fontSize={24} />
                <p>Playlists</p>
              </Link>
            </div>

            <div>
              <Link
                to={"/add-video"}
                className={`${
                  location.pathname === "/add-video" ? "active" : "link"
                }`}
              >
                <AiOutlinePlus className="link p-0" fontSize={24} />
                <p>Add Video</p>
              </Link>
            </div>

            <div>
              <Link
                to={"/liked-videos"}
                className={`${
                  location.pathname === "/liked-videos" ? "active" : "link"
                }`}
              >
                <AiOutlineLike className="link p-0" fontSize={24} />
                <p>Liked videos</p>
              </Link>
            </div>
          </div>

          <div>
            <Link
              to={"/profile"}
              className={`${
                location.pathname === "/profile" ? "active" : "link"
              }`}
            >
              <div className="size-7 rounded-full">
                <img src={user?.avatar} className="rounded-full h-full w-full bg-cover" alt="" />
              </div>
              <p>Profile</p>
            </Link>
          </div>
        </aside>
      )}

      {status === false ? (
        <div className="flex flex-col gap-1">
          <Link
            to={"/login"}
            className={`${location.pathname === "/login" ? "active" : "link"}`}
          >
            Login
          </Link>
          <Link
            to={"/signup"}
            className={`${location.pathname === "/signup" ? "active" : "link"}`}
          >
            Signup
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SideBar;
