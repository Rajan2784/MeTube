import React, { useState } from "react";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

const ThemeToggle = () => {
  // State to track the current theme mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle the theme mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    // You can also save the current theme mode to local storage here
  };

  return (
    <button
      className="px-2 py-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
      onClick={toggleTheme}
    >
      {isDarkMode ? <CiLight className="text-xl" /> : <MdDarkMode className="text-xl" />}
    </button>
  );
};

export default ThemeToggle;
