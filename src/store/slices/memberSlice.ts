import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MemberInfo } from "api/memberApi";

interface MemberState {
  memberInfo: MemberInfo | null;
  loading: boolean;
  error: string | null;
  team: string | null;
}

const initialState: MemberState = {
  memberInfo: null,
  loading: false,
  error: null,
  team: null,
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setMemberInfo, setLoading, setError, setTeam } =
  memberSlice.actions;

export default memberSlice.reducer;
