import { createSlice, current } from '@reduxjs/toolkit';
const initialState = {
  boards: [],
  selectedImg: {
    thumb: '',
    bigImg: '',
  },
}

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoard: (state, action) => {
      state.boards.push({ id: new Date().toISOString(), title: action.payload.title, img: action.payload.img, workspace: action.payload.workspace })
    },

    selectBoardImg: (state, action) => {
      state.selectedImg.thumb = action.payload.regular;
      state.selectedImg.bigImg = action.payload.raw;

    },
  }
})


export const { addBoard, selectBoardImg } = boardsSlice.actions
export default boardsSlice.reducer