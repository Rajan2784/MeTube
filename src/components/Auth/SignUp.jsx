import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Input from "../Input";
import SignUpLoaderCard from "../Loaders/SignUpLoaderCard";

const Signup = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", data.avatar[0]); // Append avatar file
      formData.append("coverImage", data.coverImage[0]); // Append cover image file
      // Append other form fields
      formData.append("fullName", data.fullName);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);

      await axios.post(
        `http://localhost:8000/api/v1/users/register`,
        formData, // Send FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      navigate("/login")
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      {loading ? (
        <SignUpLoaderCard />
      ) : (
        <div
          className={`mx-auto w-full max-w-lg dark:bg-zinc-800 bg-gray-100 rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center relative">
            <img src="/logo.png" width={28} alt="" />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight dark:text-white">
            Register your account
          </h2>
          <p className="mt-2 text-center text-base text-black/60 dark:text-white">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-300 hover:underline mb-2"
            >
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(create)}>
            <div className="space-y-5">
              <Input
                label="Avatar: "
                type="file"
                {...register("avatar", {
                  required: true,
                })}
              />

              <Input
                label="Cover Image: "
                type="file"
                {...register("coverImage", {
                  required: true,
                })}
              />

              <Input
                label="Full Name: "
                placeholder="Enter your full name "
                {...register("fullName", {
                  required: true,
                })}
              />

              <Input
                label="Username: "
                placeholder="Enter your username"
                {...register("username", {
                  required: true,
                })}
              />

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
                  required: "Password is required",
                  min: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              <button type="submit" className="w-full btn-blue">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
