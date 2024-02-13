import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    removeTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    addList: (state, action) => {
        state.push(action.payload)
    },
    removeList: (state, action) => {
        return state.filter(list => list.id !== action.payload);
      },
  },
});

export const { addTodo, removeTodo,addList, removeList } = todosSlice.actions;
export default todosSlice.reducer;
