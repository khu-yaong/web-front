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

// 야구 선수 목록 조회
export const getPlayers = async (
  pageSize: number,
  cursorId: number | null,
  cursorName: string | null,
  query: string | null
) => {
  try {
    const response = await apiClient.get(`/players`, {
      params: {
        pageSize: pageSize,
        cursorId: cursorId ?? null,
        cursorName: cursorName ?? null,
        query: query,
      },
    });

    if (response.data.status === 200) {
      return response.data.data;
    } else {
      throw new Error("야구선수 목록 조회에 실패했습니다.");
    }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// 야구 선수 정보 조회
export const getPlayerInfo = async (playerId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/players/${playerId}`, {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        playerId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching pitcher data:", error);
    throw error;
  }
};

// 야수 정보 수정 요청
export const updatePlayerInfo = async (playerId: any, data: any) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/players/${playerId}/fielders`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization 헤더 (예시: 토큰을 localStorage에서 가져옴)
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating player data:", error);
    throw error;
  }
};
