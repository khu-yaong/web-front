import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MemberInfo } from "api/memberApi";

interface MemberState {
  memberInfo: MemberInfo | null;
  loading: boolean;
  error: string | null;
  team: string | null;
  level: number | null;
}

const initialState: MemberState = {
  memberInfo: null,
  loading: false,
  error: null,
  team: null,
  level: null,
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setMemberInfo: (state, action: PayloadAction<MemberInfo>) => {
      state.memberInfo = action.payload;
    },
    setTeam: (state, action: PayloadAction<string>) => {
      state.team = action.payload;
    },
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setMemberInfo, setLoading, setError, setTeam, setLevel } =
  memberSlice.actions;

export default memberSlice.reducer;
