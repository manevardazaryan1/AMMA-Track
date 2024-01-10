import { createSlice, current } from '@reduxjs/toolkit';
const initialState = {
  workspaces: [],
  selectedImg: {
    thumb: '',
  },
  creationBox: false,
  activeWorkspace: {}
}

export const workSpacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    addWorkspace: (state, action) => {
      state.workspaces.push({ id: new Date().toISOString(), title: action.payload.title, img: action.payload.img, user: action.payload.email })
    },
    creationBoxHandle: (state, action) => {
      state.creationBox = action.payload.val;
    },
    selectImg: (state, action) => {
      state.selectedImg = {
        thumb: action.payload.urls.thumb,
        bigImg: action.payload.urls.full,
      };
    },
    toggleActiveWorkspace: (state, action) => {
      state.activeWorkspace = action.payload
      console.log(current(state).activeWorkspace);
    }
  }
})
export const { addWorkspace, selectImg, creationBoxHandle, toggleActiveWorkspace } = workSpacesSlice.actions
export default workSpacesSlice.reducer