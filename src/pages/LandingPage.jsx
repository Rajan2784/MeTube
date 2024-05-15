import React, { useContext, useEffect, useRef } from "react";

import { ToggleContext } from "../context/Toggle";
import { Outlet } from "react-router-dom";
import { Header, SideBar } from "../components/index";
const LandingPage = () => {
  const { showSideBar,setShowSidebar } = useContext(ToggleContext);
  const popupRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="flex flex-col relative">
      <div className="h-20 fixed w-full z-20">
        <Header />
      </div>

      <div ref={popupRef}
        className={`sm:visible duration-500 sm:fixed sm:top-16 ${
          showSideBar ? "sm:left-0" : "sm:-left-48"
        } z-20 lg:hidden w-48 h-full -left-64 fixed`}
      >
        <SideBar />
      </div>

      <div className="mt-16 grid grid-cols-12 h-[91vh] z-10">
        <div className={`${showSideBar ? "lg:col-span-1 w-20" : "lg:col-span-2" } hidden lg:block`}>
          <SideBar />
        </div>
        <div className={`col-span-12 md:col-span-12 overflow-y-auto ${showSideBar ? "lg:col-span-11" : "lg:col-span-10"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
