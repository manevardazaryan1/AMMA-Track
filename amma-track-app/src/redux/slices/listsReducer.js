import { createSlice } from '@reduxjs/toolkit'

const initialState = createSlice({
    name : "lists",
    initialState : {
        listItems : [],
        newItem : ""
    },
    reducers: {
        addItem(state , action){
            state.listItems.push(action.payload);
            state.newItem = ""
        },
        removeItem(state, action){
            state.listItems.splice(action.payload, 1)
        },
        updateNewItem: (state, action) => {
            state.newItem = action.payload;
        },
    }
})

export const {addItem, removeItem, updateNewItem} = initialState.actions
export default initialState.reducer