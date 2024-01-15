import { createSlice } from '@reduxjs/toolkit';

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {},
  reducers: {
    addCard: (state, action) => {
      const { listId, card } = action.payload;
      if (!state[listId]) {
        state[listId] = [];
      }
      state[listId].push(card);
    },
    removeCard: (state, action) => {
        const { listId, cardId } = action.payload;
        if (state[listId]) {
          state[listId] = state[listId].filter(card => card.id !== cardId);
        }
    },
  },
});

export const { addCard, removeCard } = cardsSlice.actions;
export default cardsSlice.reducer;
