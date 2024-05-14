import React from "react";
import Loader from "./Loader";

const SignUpLoaderCard = () => {
  return (
    <div className="">
      <div className="rounded-3xl bg-red-100 p-4 flex flex-col gap-2 justify-between w-72 h-80">
        <div className="flex flex-col justify-center gap-1 items-center">
          <img src="/check.png" alt="" />
          <h1 className="text-xl font-bold text-red-600 text-center">
            Congratulations!!
          </h1>
        </div>
        <div>
          <h2 className="text-center text-pretty text-base">
            Your account has been registerd and you will be redirected to login
            page shortly.
          </h2>
        </div>
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      </div>
    </div>
  );
};

export default SignUpLoaderCard;
