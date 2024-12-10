import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMatchInfo, MatchInfo } from "api/dashboardApi";

export const fetchMatchData = createAsyncThunk<MatchInfo, { apiUrl: string }>(
  "match/fetchData",
  async ({ apiUrl }) => {
    const response = await fetchMatchInfo({ apiUrl });
    return response;
  }
);

interface MatchState {
  data: MatchInfo | null;
  loading: boolean;
  error: string | null;
  apiUrl: string | null;
}

const initialState: MatchState = {
  data: null,
  loading: false,
  error: null,
  apiUrl: null,
};

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchMatchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch match data.";
      });
  },
});

export default matchSlice.reducer;
