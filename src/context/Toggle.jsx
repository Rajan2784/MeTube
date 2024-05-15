import React, { createContext, useState } from "react";

export const ToggleContext = createContext({
  dark: "light",
  showSideBar: false,
  setShowSidebar:false,
  onThemeToggle: () => {},
  onSideBarToggle: () => {},
});

const Toggle = ({ children }) => {
  let darkMode = localStorage.getItem("dark");
  const [dark, setDark] = useState(darkMode || "light");
  const [showSideBar, setShowSidebar] = useState(false);
  document.documentElement.classList.add(darkMode);

  // Function to handle the click event

  const onThemeToggle = () => {
    if (dark === "light") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("dark", "dark");
      setDark("dark");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark", "light");
      setDark("light");
    }
  };

  const onSideBarToggle = () => {
    setShowSidebar(!showSideBar);
    console.log("called sidebar toggle ", showSideBar);
  };
  return (
    <ToggleContext.Provider
      value={{ dark, showSideBar, onSideBarToggle, onThemeToggle, setShowSidebar }}
    >
      {children}
    </ToggleContext.Provider>
  );
};

export default Toggle;
