import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { AppDispatch } from "store/store";
//import { logout } from "./authSlice";

interface VideoState {
  videos: any[];
  recommendVideos: any[];
}

const initialState: VideoState = {
  videos: [],
  recommendVideos: [],
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideos(state, action: PayloadAction<any[]>) {
      state.videos = action.payload;
    },
    setReommendVideos(state, action: PayloadAction<any[]>) {
      state.recommendVideos = action.payload;
    },
  },
});
/*
export const logoutAndClearVideos = () => (dispatch: AppDispatch) => {
  dispatch(logout());
  // video 상태 초기화
  dispatch(setVideos([]));
  dispatch(setReommendVideos([]));
};
*/
export const { setVideos, setReommendVideos } = videoSlice.actions;
export default videoSlice.reducer;
