import React from 'react'
import {useDispatch } from "react-redux";
import {removeCard, toggleTodoComment} from '../../redux/slices/cardsSlice.js'

const CardItem  = ({id , text, completed}) => {
    const dispatch = useDispatch()

    const handleRemoveCard = () => {
        dispatch(removeCard({ id }));
    };

    const handleToggleCard = () => {
        dispatch(toggleTodoComment({id}))
    }

    return (
        <div key={id} className="remove-card">
            <li>
                <input 
                    type="checkbox" 
                    checked = {completed} 
                    onChange={handleToggleCard} />
                <span>{text}</span>
                <span className="delete" 
                    onClick={handleRemoveCard}> 
                    &times; 
                </span>
            </li>
        </div>
        
    )
}

export default CardItem