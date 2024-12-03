import axios from "axios";

const API_BASE_URL = "http://34.237.154.47:8080";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "*/*",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

// 야구 용어 목록 조회
export const getWords = async (pageSize: number = 100, query: string) => {
  try {
    const response = await apiClient.get(`/words`, {
      params: { pageSize, query },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching words:", error);
    throw error;
  }
};
