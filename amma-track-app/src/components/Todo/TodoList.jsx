import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addList, removeList } from '../../redux/slices/todosSlice';
import { addCard, removeCard } from '../../redux/slices/cardsSlice';
import TodoListContainer from './TodoListContainer'
import './TodoList.css'

const TodoList = ({ boardId }) => {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.todos);
  const cards = useSelector(state => state.cards);
  const todoListData = useSelector(state => state.todos[boardId] || {})

  const [newListTitle, setNewListTitle] = useState('');
  const [isAddingList, setIsAddingList] = useState(false);

  const [newCardText, setNewCardText] = useState('');
  const [activeListId, setActiveListId] = useState(null);
  const [showForm, setShowForm] = useState(false)

  const currentTodos = lists.filter(todo => todo.boardId === boardId)

  const generateUniqueId = () => {
    return new Date().getTime().toString();
  };

  const handleToggleForm = () => setShowForm(!showForm);

  const handleAddList = () => {
    if (newListTitle.trim() !== '') {
      const newListId = generateUniqueId();
      dispatch(addList({ boardId: boardId, id: newListId, title: newListTitle })); 
      setActiveListId(newListId);
      setNewListTitle("")
    }
  };

  const handleRemoveList = listId => {
    dispatch(removeList(listId));
    if (activeListId === listId) {
      setNewCardText('');
      setActiveListId(null);
    }
    dispatch(removeCard({ listId }));
  };

  const handleAddCard = () => {
    if (newCardText.trim() !== '' && activeListId !== null) {
      const newCardId = generateUniqueId();

      dispatch(addCard({ listId: activeListId, card: { id: newCardId, text: newCardText } }));
      setNewCardText('');
    }
  };

  const handleRemoveCard = (listId, cardId) => {
    dispatch(removeCard({ listId, cardId }));
  };

  const handleSetActiveList = (listId) => {
    setActiveListId(listId);
  };

  return (
    <div>
      <h4>Todo List for Board: {boardId}</h4>
      <TodoListContainer
        lists={currentTodos}
        cards={cards}
        activeListId={activeListId}
        handleSetActiveList={handleSetActiveList}
        handleRemoveList={handleRemoveList}
        handleRemoveCard={handleRemoveCard}
        handleAddCard={handleAddCard}
        newCardText={newCardText}
        setNewCardText={setNewCardText}
        boardId={boardId}
      />
      {showForm ? (
        <div className='add-list-form'>
          <input
            type="text"
            placeholder="Add another list"
            value={newListTitle}
            onChange={e => setNewListTitle(e.target.value)}
          />
          <button onClick={handleAddList}>Add</button>
          <button onClick={handleToggleForm}><span>x</span></button>
        </div>
      ) : (
        <button className="add-list" onClick={handleToggleForm}>
          Add list
        </button>
      )}
    </div>
  );
};

export default TodoList;
