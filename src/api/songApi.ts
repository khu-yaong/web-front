import axios from "axios";

const API_BASE_URL = "http://34.237.154.47:8080";
const AUTH_TOKEN = localStorage.getItem("accessToken");

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: AUTH_TOKEN,
    Accept: "*/*",
  },
});

export interface Mp3File {
  fileName: string;
  url: string;
  teamName: string;
  category: string;
  name: string;
}

export const syncMp3Files = async (): Promise<Mp3File[]> => {
  const url = "http://34.237.154.47:8080/mp3-files/sync";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    return [];
  }
};

export const fetchMp3Files = async (
  team: string,
  category: string
): Promise<Mp3File[]> => {
  const url = `http://34.237.154.47:8080/mp3-files/${encodeURIComponent(
    team
  )}/${encodeURIComponent(category)}`;
  console.log(url);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        Accept: "application/json",
      },
    });

    const responseText = await response.text(); // Get the response as text for debugging
    console.log("Response Text:", responseText); // Log the raw response

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = JSON.parse(responseText); // Try parsing the response text

    if (data.code === "SUCCESS") {
      return data.data;
    } else {
      throw new Error(data.message || "Failed to fetch data.");
    }
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};
