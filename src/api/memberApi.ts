import { useDispatch } from "react-redux";
import axios from "axios";
import {
  setMemberInfo,
  setLoading,
  setError,
  setTeam,
} from "store/slices/memberSlice";

export interface MemberInfo {
  username: string;
  team: string;
  profileImageUrl: string;
  level: number;
  experience: number;
  nextLevelExp: number;
  postList: string[]; // 실제 데이터 형식에 맞게 수정 가능
}

export const useMemberInfo = () => {
  const dispatch = useDispatch();

  const fetchMemberInfo = async () => {
    const token = localStorage.getItem("accessToken");
    dispatch(setLoading(true));

    try {
      const response = await axios.get(
        "http://34.237.154.47:8080/api/members/info",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        }
      );
      dispatch(setMemberInfo(response.data.data));
      dispatch(setTeam(response.data.data.team));
      console.log(response.data.data);
    } catch (error: any) {
      dispatch(
        setError(
          "Failed to fetch member info: " +
            (error.response?.data || error.message)
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { fetchMemberInfo };
};
