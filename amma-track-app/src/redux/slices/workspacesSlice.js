import { createSlice, current } from '@reduxjs/toolkit';
const initialState = {
  workspaces: [],
  selectedImg: {
    thumb: '',
  },
  settingsOpened: false,
}

export const workSpacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    addWorkspace: (state, action) => {
      state.workspaces = state.workspaces.map(workspace => { return { ...workspace, active: false } })
      state.workspaces.push({ id: action.payload.id, title: action.payload.title, img: action.payload.img, user: action.payload.user, active: action.payload.active })
      // console.log(current(state).workspaces)
      // state.workspaces = [action.payload, ...state.workspaces]
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
    },
    deleteActiveWorkspace: (state, action) => {
      state.workspaces = state.workspaces.map(workspace => { return { ...workspace, active: false } })
    },

    openSettings: (state, action) => {
      state.settingsOpened = true;
    },

  }
})
export const { addWorkspace, selectWorkspaceImg, toggleActiveWorkspace, deleteActiveWorkspace, openSettings } = workSpacesSlice.actions
export default workSpacesSlice.reducer