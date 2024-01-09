import { createSlice, current } from '@reduxjs/toolkit';
const initialState = {
  workspaces: [],
  selectedImg: {
    thumb: '',
    bigImg: '',
  },
  creationBox: false,
}

export const workSpacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    addWorkspace: (state, action) => {
      console.log('works');
      state.workspaces.push({ title: action.payload.title, img: action.payload.img })
      console.log(current(state.workspaces));

    },
    creationBoxHandle: (state, action) => {
      state.creationBox = action.payload.val;

    },
    selectImg: (state, action) => {
      state.selectedImg = {
        thumb: action.payload.urls.thumb,
        bigImg: action.payload.urls.full,
      };
      console.log(state.selectedImg);
    }
  }
})
export const { addWorkspace, selectImg, creationBoxHandle } = workSpacesSlice.actions
export default workSpacesSlice.reducer