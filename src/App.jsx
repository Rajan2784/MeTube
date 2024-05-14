import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import SideBar from "./components/Header/SideBar";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { login } from "./store/authSlice";
import Cookies from "js-cookie";
import Loader from "./components/Loaders/Loader";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const getCurrentUser = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/users/current-user",
          null, // No request body
          {
            withCredentials: true, // Send cookies
          }
        );
        dispatch(login(response.data.data));
        setLoading(false);
      } catch (error) {
        const refreshToken = Cookies.get("refreshToken");
        if (error.response && error.response.status === 401) {
          // Access token expired, attempt to refresh token
          try {
            const refreshResponse = await axios.post(
              "http://localhost:8000/api/v1/users/refresh-token", // API endpoint to refresh token
              refreshToken,
              {
                withCredentials: true, // Send cookies
              }
            );
            // Update the access token
            const accessToken = refreshResponse.data.accessToken;
            // Retry the failed request with the new access token
            Cookies.set("accessToken", accessToken, { expires: 1 });
            const response = await axios.post(
              "http://localhost:8000/api/v1/users/current-user",
              null, // No request body
              {
                withCredentials: true, // Send cookies
              }
            );
            dispatch(login(response.data.data));
            setLoading(false);
            // You can create a retry mechanism here
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            setLoading(false);
            // Redirect to login page
            navigate("/login");
          }
        } else {
          setLoading(false);
          console.error("Error fetching current user:", error);
        }
      }
    };
    getCurrentUser();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col">
          <div className="h-20 fixed w-full z-10">
            <Header />
          </div>
          <div className="sm:flex">
            <div className="hidden relative sm:block md:block lg:block sm:w-[30%] lg:w-[20%]">
              <div className="fixed sm:w-[30%] md:w-[25%] lg:w-[20%] top-12 h-svh">
                <SideBar />
              </div>
            </div>
            <div className="sm:w-[70%] md:w-[80%] lg:w-[80%] w-full p-2 md:p-1 mt-12">
              <Outlet />
            </div>
          </div>

          {/* <div className="mt-16 grid grid-cols-[200px,1fr]">
            <div className="h-screen">
              <SideBar />
            </div>
            <div className="col-span-1">
              <Outlet />
            </div>
          </div> */}
        </div>
      )}
    </>
  );
}

export default App;
