import { createSlice, current } from '@reduxjs/toolkit';
const initialState = {
  workspaces: [],
  selectedImg: {
    thumb: '',
  },
}

export const workSpacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    addWorkspace: (state, action) => {
      state.workspaces.push({ id: new Date().toISOString(), title: action.payload.title, img: action.payload.img, user: action.payload.user, active: false })

    },
    workspaceCreationBoxHandle: (state, action) => {
      state.creationBox = action.payload.val;
    },
    selectWorkspaceImg: (state, action) => {
      state.selectedImg.thumb = action.payload.thumb;
    },
    toggleActiveWorkspace: (state, action) => {
      state.workspaces = state.workspaces.map(workspace => {
        if (workspace.id === action.payload.id) {
          return { ...workspace, active: true }
        }
        else
          return { ...workspace, active: false }
      })
      console.log(current(state).workspaces)
    },
    deleteActiveWorkspace: (state, action) => {
      state.workspaces=state.workspaces.map(workspace => {console.log('enter'); return { ...workspace, active: false } })
      console.log(current(state).workspaces);
    }
  }
})
export const { addWorkspace, selectWorkspaceImg, toggleActiveWorkspace, deleteActiveWorkspace } = workSpacesSlice.actions
export default workSpacesSlice.reducer