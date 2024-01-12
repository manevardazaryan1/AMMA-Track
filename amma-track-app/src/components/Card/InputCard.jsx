import React from 'react'
import {useState} from 'react'
import { useDispatch } from 'react-redux'
import {addCard} from '../../redux/slices/cardsSlice.js'

const InputCard = ({handleToggleForm}) => {

  const dispatch = useDispatch()
  const [text, setText] = useState("")
  
  const addNewCard = () => {
    if (text.trim() !== '') {
      dispatch(addCard({ text }));
      setText('');
    }
  }
    
    return (
        <div className="add-new-card">
            <label>
                <input
                  type="text"
                  value = {text}
                  onChange = {((e)=> setText(e.target.value))}
                  className="list-input"
                />
                <button onClick = {addNewCard}>Add</button>
                <button onClick = {handleToggleForm}>X</button>
            </label>
        </div>
        
    )
  }

export default InputCard