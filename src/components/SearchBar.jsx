import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div className="flex rounded-lg">
      <input
        type="text"
        placeholder="Search..."
        className="flex-grow px-4 py-2 mr-2 border border-gray-300 rounded-lg focus:outline-none dark:bg-transparent"
      />
      <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 17.657a8 8 0 11-11.314-11.314 1.5 1.5 0 111.414 1.414 5 5 0 107.07 7.07 1.5 1.5 0 11-1.414 1.414z"
          />
        </svg> */}
        <IoSearch className="text-xl" />
      </button>
    </div>
  );
};

export default SearchBar;
