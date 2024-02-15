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
      state.boards.push({ id: action.payload.id, title: action.payload.title, img: action.payload.img, workspace: action.payload.workspace })
      // state.boards = [action.payload, ...state.boards]
    },

    selectBoardImg: (state, action) => {
      state.selectedImg.thumb = action.payload.regular;
      state.selectedImg.bigImg = action.payload.raw;
    },

    resetBoardImg: (state, action) => {
      state.selectedImg.thumb = '';
      state.selectedImg.bigImg = '';
    }
  }
})


export const { addBoard, selectBoardImg, resetBoardImg } = boardsSlice.actions
export default boardsSlice.reducer