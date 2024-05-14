import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import axios from "axios";

function VideoUploadForm() {
  const { register, handleSubmit } = useForm();
  const [videoFile, setVideoFile] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [uploadPercentage,setUploadPercentage] = useState(0)

  const onFormSubmit = async (data) => {
    console.log(data);
    console.log(videoFile[0]);
    console.log(thumbnailFile[0]);
    try {
      const formData = new FormData();
      if (videoFile.length > 0) {
        formData.append("videoFile", videoFile[0]);
      }

      if (thumbnailFile.length > 0) {
        formData.append("thumbnail", thumbnailFile[0]);
      }

      formData.append("title", data.title);
      formData.append("description", data.description);

      console.log("Submitting form data:", formData);

      // Your form submission logic here

      const video = await axios.post(
        `http://localhost:8000/api/v1/videos/upload`,
        formData,
        {
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            // Update the state with the percentage
            setUploadPercentage(percentCompleted);
            console.log(percentCompleted)
          },
        }
      );
      console.log("Response:", video); // Log response from the server
    } catch (error) {
      console.error("Error occurred during form submission:", error);
    }
  };

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        setVideoFile(acceptedFiles);
        setVideoPreview(URL.createObjectURL(acceptedFiles[0]));
      },
      accept: "video/*",
    });

  const {
    getRootProps: getThumbnailRootProps,
    getInputProps: getThumbnailInputProps,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setThumbnailFile(acceptedFiles);
      setThumbnailPreview(URL.createObjectURL(acceptedFiles[0]));
    },
    accept: "image/*",
  });

  const removeVideoPreview = () => {
    setVideoFile([]);
    setVideoPreview("");
  };
  const removeThumbnailPreview = () => {
    setThumbnailFile([]);
    setThumbnailPreview("");
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="max-w-screen-lg mx-auto h-svh p-8  rounded-lg"
    >
      {videoPreview === "" ? (
        <div
          {...getVideoRootProps()}
          className={`mt-4 h-44 border-dashed border-2 border-gray-300 p-4 rounded-lg flex flex-col justify-center items-center cursor-pointer`}
        >
          <input {...getVideoInputProps()} />
          <button className="p-2 font-bold bg-red-500 text-white rounded-lg ">
            Add Video +{" "}
          </button>
          <p className="text-center">Drag and drop your video here or click to browse.</p>
        </div>
      ) : (
        <div className="mt-4 w-full border-dashed border-2 border-gray-300 p-4 rounded-lg flex flex-col justify-center items-center cursor-pointer">
          <p>Selected Video:</p>
          <video controls className="mt-2 w-full md:max-w-md">
            <source src={videoPreview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            type="button"
            onClick={removeVideoPreview}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Remove Video
          </button>
        </div>
      )}

      {thumbnailPreview === "" ? (
        <div
          {...getThumbnailRootProps()}
          className={`h-44 mt-4 border-dashed border-2 border-gray-300 p-4 rounded-lg flex flex-col justify-center items-center cursor-pointer`}
        >
          <input {...getThumbnailInputProps()} />
          <button className="p-2 font-bold bg-red-500 text-white rounded-lg ">
            Add Thumbnail +{" "}
          </button>
          <p className="text-center">Drag and drop your thumbnail image here or click to browse.</p>
        </div>
      ) : (
        <div className="mt-4 border-dashed border-2 border-gray-300 p-4 rounded-lg flex flex-col justify-center items-center cursor-pointer">
          <p>Selected Thumbnail Image:</p>
          <img
            src={thumbnailPreview}
            alt="Thumbnail Preview"
            className="mt-2 max-w-xs h-44"
          />
          <button
            type="button"
            onClick={removeThumbnailPreview}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Remove Thumbnail
          </button>
        </div>
      )}


      <div className="mt-4">
        <label className="block text-gray-700 font-bold mb-2">Title:</label>
        <input
          type="text"
          {...register("title", { required: true })}
          className="border rounded-lg px-3 py-2 w-full"
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 font-bold mb-2">
          Description:
        </label>
        <textarea
          {...register("description", { required: true })}
          className="border rounded-lg px-3 py-2 w-full"
        />
      </div>
      {uploadPercentage > 0 && uploadPercentage < 100 && (
        <div className="mt-4 w-full h-20">
          Uploading: {uploadPercentage}%
          <progress value={uploadPercentage} max="100" />
        </div>
      )}

      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default VideoUploadForm;
