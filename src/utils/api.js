import axios from "axios";

export const ApiBaseUrl = "http://localhost:8000/api/v1";

export async function fetchDataFromApi(url) {
  try {
    const response = await axios.get(`${ApiBaseUrl}${url}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log("error occured while fetching api :", error);
  }
}

export async function postDataToApi(url, data) {
  try {
    const response = await axios.post(`${ApiBaseUrl}/${url}`, data || null, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {}
}

