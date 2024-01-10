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
      state.workspaces.push({ id: new Date().toISOString(), title: action.payload.title, img: action.payload.img, user: action.payload.email, active: false })
    },
    creationBoxHandle: (state, action) => {
      state.creationBox = action.payload.val;
    },
    selectImg: (state, action) => {
      state.selectedImg.thumb = action.payload.urls.thumb;
    },
    toggleActiveWorkspace: (state, action) => {

      state.workspaces = state.workspaces.map(workspace => {

        if (workspace.id === action.payload.id) {
          console.log('here');
          return { ...workspace, active: true }
        }
        return { ...workspace, active: false }
      })

    }
  }
})
export const { addWorkspace, selectImg, creationBoxHandle, toggleActiveWorkspace } = workSpacesSlice.actions
export default workSpacesSlice.reducer