import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILaunchFeat } from "./types";

interface AppState {
  launches?: ILaunchFeat[] | null;
}

const initialState: AppState = {
  launches: null,
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    // clear will clear the launches
    clear: () => initialState,
    // Save the launches
    saveLaunches: (state, action: PayloadAction<AppState>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.launches = action.payload.launches;
    },
  },
});

export const { clear, saveLaunches } = appSlice.actions;
// ? Export the authSlice.reducer to be included in the store.
export default appSlice.reducer;
