import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/slices/authSlice";
import memberReducer from "../store/slices/memberSlice";
import calendarReducer from "../store/slices/calendarSlice";
import matchReducer from "../store/slices/matchSlice";
import videoReducer from "../store/slices/videoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    member: memberReducer,
    calendar: calendarReducer,
    match: matchReducer,
    video: videoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
