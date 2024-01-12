import { createSlice } from '@reduxjs/toolkit'

const cardsSlice = createSlice({
    name : "cards",
    initialState : {
        cardItems: [],
        newItem : ""
    },

    reducers: {
        addCard(state , action){
            
            state.cardItems.push({
                id : new Date().toISOString(),
                text : action.payload.text,
                completed : false,
            })
            console.log(action.payload.text)
        },
        removeCard(state, action){
            state.cardItems = state.cardItems.filter((card) => card.id !== action.payload.id)
        },
        toggleTodoComment(state, action){
            state.cardItems = state.cardItems.map((card) => {
                if (card.id === action.payload.id) {
                    return{
                        ...card,
                        completed : !card.completed
                    }
                }
                return card
            })
        },
    }
})

export const { addCard, removeCard, toggleTodoComment } = cardsSlice.actions;
export default cardsSlice.reducer;