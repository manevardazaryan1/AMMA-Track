import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    descriptions: [],
}

export const cardModalSlice = createSlice({
  name: 'cardModal',
  initialState,
  reducers: {
    addDescription: (state, description) => {
      const desc = state.descriptions.find(card => card.cardID === description.payload.cardID);

      if (!desc)
        state.descriptions = [...state.descriptions,  description.payload];
      else {
        desc.description = description.payload.description
      }
      
    },
  },
})


export const { addDescription } = cardModalSlice.actions

export default cardModalSlice.reducer