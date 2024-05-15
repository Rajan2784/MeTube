import React, { useContext } from "react";
import { GoHomeFill } from "react-icons/go";
import { FaHistory } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { MdSubscriptions } from "react-icons/md";
import { Link } from "react-router-dom";
import { CgMenuLeftAlt } from "react-icons/cg";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar";
import ThemeToggle from "../ThemeToggle";
import { ToggleContext } from "../../context/Toggle";

const Header = () => {
  const status = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const {onSideBarToggle,showSideBar} = useContext(ToggleContext)
  return (
    <header className="h-full w-full z-10">
      <div className={`flex items-center justify-between gap-2 p-1 sm:p-3 bg-slate-100 dark:bg-zinc-900`}>
        <div className="flex gap-2">
          <CgMenuLeftAlt
            fontSize={28}
            className={`${showSideBar ? "link" : ""} dark:text-white p-0 cursor-pointer hidden sm:block`}
            onClick={() => onSideBarToggle()}
          />
          <div className="flex items-baseline">
            <img src="/logo.png" width={28} alt="" />
            {/* <h1 className="text-2xl">MyTube.</h1> */}
          </div>
        </div>
        <div>
          <SearchBar />
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>

      {/* This is for mobile devices only */}

      <div className="sm:hidden md:hidden lg:hidden visible bg-slate-50 dark:bg-zinc-900 fixed bottom-0 flex w-full p-2 items-center justify-evenly">
        {status && (
          <>
            <div>
              <Link
                to={"/"}
                className={`flex-col gap-0 p-1 ${
                  location.pathname === "/" ? "active" : "link"
                }`}
              >
                <GoHomeFill className="link p-0" fontSize={24} />
                <p>Home</p>
              </Link>
            </div>
            <div>
              <Link
                to={"/history"}
                className={`flex-col gap-0 p-1 ${
                  location.pathname === "/history" ? "active" : "link"
                }`}
              >
                <FaHistory className="link p-0" fontSize={24} />
                <p>History</p>
              </Link>
            </div>
            <div>
              <Link
                to={"/add-video"}
                className={`flex-col gap-0 p-1 ${
                  location.pathname === "/add-video" ? "active" : "link"
                }`}
              >
                <AiOutlinePlus
                  // className="text-4xl bg-[#ff0012] rounded-full"
                  className="link p-0"
                  fontSize={24}
                />
              </Link>
            </div>
            <div>
              <Link
                to={"/subscription"}
                className={`flex-col gap-0 p-1 ${
                  location.pathname === "/subscription" ? "active" : "link"
                }`}
              >
                <MdSubscriptions className="link p-0" fontSize={24} />
                <p>Subscription</p>
              </Link>
            </div>
            <div>
              <Link
                to={"/profile"}
                className={`flex-col gap-0 p-1 ${
                  location.pathname === "/profile" ? "active" : "link"
                }`}
              >
                <div className={`size-6 rounded-full border ${location.pathname === "/profile" ? "border-[#ff0012]" : "border-[#fff]"}`}>
                  <img
                    src={userData?.avatar}
                    className="rounded-full h-full w-full"
                    alt=""
                  />
                </div>
                <p>Profile</p>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
