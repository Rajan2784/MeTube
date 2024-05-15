import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { login } from "./store/authSlice";
import Cookies from "js-cookie";
import Loader from "./components/Loaders/Loader";
import Toggle from "./context/Toggle";
import LandingPage from "./pages/LandingPage";

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
    <Toggle>
      <div className=" dark:bg-zinc-900 dark:text-white">{loading ? <Loader /> : <LandingPage />}</div>
    </Toggle>
  );
}

export default App;
