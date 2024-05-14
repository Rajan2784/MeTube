import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login as userLogin } from "../../store/authSlice";
import Input from "../Input";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "../Loaders/Loader";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        data
      );
      const { accessToken, refreshtoken, loggedInUser } = response.data.data;

      // Store tokens in cookies with appropriate expiry times
      Cookies.set("accessToken", accessToken,{expires:1}); // Set expiry time as needed
      Cookies.set("refreshToken", refreshtoken,{expires:10}); // Set expiry time as needed

      // Dispatch action to store user information in Redux store
      dispatch(userLogin(loggedInUser));
      setLoading(false);
      // Redirect to home page or any other route upon successful login
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError("Invalid email or password."); // Or set error message based on error response from the server
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      {loading ? (
        <Loader />
      ) : (
        <div
          className={`mx-auto w-full max-w-lg bg-gray-100 dark:bg-zinc-800 rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center relative">
            {/* <span className="inline-block w-full max-w-[100px]">
              {" "}
              <h1 className="text-2xl dark:text-white">Blog</h1>{" "}
            </span> */}
            <img src="/logo.png" width={28} alt="" />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-base text-black/60 dark:text-white">
            Don't have any account?&nbsp;
            <Link
              to="/signup"
              className="font-medium text-primary transition-all duration-300 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
              <Input
                label="Email: "
                placeholder="Enter your email: "
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password "
                {...register("password", {
                  required: true,
                })}
              />
              <button type="submit" className="w-full btn-blue">
                Sign In
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
