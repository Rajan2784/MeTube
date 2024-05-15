import React, { useContext } from "react";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { ToggleContext } from "../context/Toggle";

const ThemeToggle = () => {
  // State to track the current theme mode
  const { dark, onThemeToggle } = useContext(ToggleContext);
  return (
    <button
      className="px-2 py-2 rounded-md focus:outline-none"
      onClick={() => onThemeToggle()}
    >
      {dark === "light" ? (
        // <CiLight className="text-xl " />
        <p className="text-2xl">🌞</p>
      ) : (
        // <MdDarkMode className="text-xl text-white" />
        <p className="text-2xl">🌙</p>
      )}
    </button>
  );
};

export default ThemeToggle;
