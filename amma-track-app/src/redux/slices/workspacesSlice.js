import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspaces: [],
}

export const workSpacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    add: (state, workspace) => {
      // console.log(workspace.payload.email);
      state.workspaces = [...state.workspaces, workspace]

    }
  }
})
export const { add } = workSpacesSlice.actions
export default workSpacesSlice.reducer