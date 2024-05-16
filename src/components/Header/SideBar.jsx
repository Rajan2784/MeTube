import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { GoHistory } from "react-icons/go";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineSubscriptions } from "react-icons/md";
import { RxVideo } from "react-icons/rx";
import { AiOutlineLike } from "react-icons/ai";
import { ToggleContext } from "../../context/Toggle";

const SideBar = () => {
  const status = useSelector((state) => state.auth.status);
  const location = useLocation();
  const {showSideBar} = useContext(ToggleContext);
  const user = useSelector((state) => state.auth.userData);
  return (
    <div className="p-4 bg-slate-100 dark:bg-zinc-900 h-full">
      {status && (
        <aside className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-1">
            <div>
              <Link
                to={"/"}
                className={`${location.pathname === "/" ? "active" : "link"}`}
              >
                <GoHome className="link p-0" fontSize={24} />
                <p className={`${showSideBar ? "lg:hidden" : "lg:visible"}`}>Home</p>
              </Link>
            </div>
            <div>
              <Link
                className={`${
                  location.pathname === "/subscription" ? "active dark:link-dark" : "link"
                }`}
                to={"/subscription"}
              >
                <MdOutlineSubscriptions className="link p-0" fontSize={24} />
                <p className={`${showSideBar ? "lg:hidden" : "lg:visible"}`}>Subscription</p>
              </Link>
            </div>
          </div>
          <hr className="border border-red-200 my-1" />
          <div className="flex flex-col gap-1">
            <h1 className="text-xl dark:text-white">You</h1>
            <div>
              <Link
                to={"/history"}
                className={`${
                  location.pathname === "/history" ? "active" : "link"
                }`}
              >
                <GoHistory className="link p-0" fontSize={24} />
                <p className={`${showSideBar ? "lg:hidden" : "lg:visible"}`}>History</p>
              </Link>
            </div>

            <div>
              <Link
                to={"/myvideos"}
                className={`${
                  location.pathname === "/myvideos" ? "active" : "link"
                }`}
              >
                <RxVideo className="link p-0" fontSize={24} />
                <p className={`${showSideBar ? "lg:hidden" : "lg:visible"}`}>My Videos</p>
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
                <p className={`${showSideBar ? "lg:hidden" : "lg:visible"}`}>Add Video</p>
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
                <p className={`${showSideBar ? "lg:hidden" : "lg:visible"}`}>Liked videos</p>
              </Link>
            </div>
          </div>

          <div>
            <Link
              to={`/my-profile/${user.username}`}
              className={`${
                location.pathname === `/my-profile/${user.username}` ? "active" : "link"
              }`}
            >
              <div className="size-7 rounded-full">
                <img src={user?.avatar} className="rounded-full h-full w-full bg-cover" alt="" />
              </div>
              <p className={`${showSideBar ? "lg:hidden" : "lg:visible"}`}>Profile</p>
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
