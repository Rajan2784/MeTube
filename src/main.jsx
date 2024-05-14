import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import AuthLayout from "../src/components/AuthLayout.jsx";
import {
  UploadVideo,
  History,
  LikedVideo,
  Login,
  PlayList,
  Profile,
  SignUp,
  Subscription,
} from "./components/index.js";
import VideoPlay from "./components/VideoPlay.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/add-video",
        element: (
          <AuthLayout authentication>
            <UploadVideo />
          </AuthLayout>
        ),
      },
      {
        path: "/history",
        element: (
          <AuthLayout authentication>
            <History />
          </AuthLayout>
        ),
      },
      {
        path: "/subscription",
        element: (
          <AuthLayout authentication>
            <Subscription />
          </AuthLayout>
        ),
      },
      {
        path: "/profile/:username",
        element: (
          <AuthLayout authentication>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "/liked-videos",
        element: (
          <AuthLayout authentication>
            <LikedVideo />
          </AuthLayout>
        ),
      },
      {
        path: "/playlist",
        element: (
          <AuthLayout authentication>
            <PlayList />
          </AuthLayout>
        ),
      },
      {
        path: "/watch/:videoId",
        element: <VideoPlay />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
