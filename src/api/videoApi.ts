import axios from "axios";

const API_BASE_URL = "http://34.237.154.47:8080";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "*/*",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

// 응원 구단 영상 목록 조회
export const getVideos = async () => {
  try {
    const response = await apiClient.get(`/videos`);
    console.log("팀: ", response.data.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching words:", error);
    throw error;
  }
};

// 추천 영상 목록 조회
export const getRecommendVideos = async () => {
  try {
    const response = await apiClient.get(`/videos/recommendation`);
    console.log("추천: ", response.data.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching words:", error);
    throw error;
  }
};
