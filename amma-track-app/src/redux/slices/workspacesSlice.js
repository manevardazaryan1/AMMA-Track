import { createSlice, current } from '@reduxjs/toolkit';
const initialState = {
  workspaces: [],
  selectedImg: {
    thumb: '',

  },
  creationBox: false,
}

export const workSpacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    addWorkspace: (state, action) => {

      state.workspaces.push({ id: new Date().toISOString(), title: action.payload.title, img: action.payload.img,user:action.payload.email })
      console.log(current(state).workspaces)
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