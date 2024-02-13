import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addList, removeList, updateLists } from '../../redux/slices/todosSlice';
import { addCard, removeCard } from '../../redux/slices/cardsSlice';
import TodoListContainer from './TodoListContainer';
import { useDrop, useDrag } from 'react-dnd';
import './TodoList.css';

const TodoList = ({ boardId }) => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.todos);
  const cards = useSelector((state) => state.cards);

  const [newListTitle, setNewListTitle] = useState('');
  const [newCardText, setNewCardText] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [activeListId, setActiveListId] = useState(null);

  const currentTodos = lists.filter((todo) => todo.boardId === boardId);

  const generateUniqueId = () => {
    return new Date().getTime().toString();
  };

  const handleToggleForm = () => setShowForm(!showForm);

  const handleAddList = () => {
    if (newListTitle.trim() !== '') {
      const newListId = generateUniqueId();
      dispatch(
        addList({
          boardId: boardId,
          id: newListId,
          title: newListTitle,
          position: currentTodos.length,
        })
      );
      setNewListTitle('');
    }
  };

  const handleRemoveList = (listId) => {
    dispatch(removeList(listId));
    dispatch(removeCard({ listId }));
  };

  const handleAddCard = () => {
    if (newCardText.trim() !== '' && activeListId !== null) {
      const newCardId = generateUniqueId();
      dispatch(
        addCard({
          listId: activeListId,
          card: { id: newCardId, text: newCardText },
        })
      );
      setNewCardText('');
    }
  };

  const handleRemoveCard = (listId, cardId) => {
    dispatch(removeCard({ listId, cardId }));
  };

  const handleSetActiveList = (listId) => {
    setActiveListId(listId);
  };

  const handleDrop = (draggedList) => {
    if (draggedList.id !== activeListId) {
      const draggedListIndex = currentTodos.findIndex(
        (list) => list.id === draggedList.id
      );
      const activeListIndex = currentTodos.findIndex(
        (list) => list.id === activeListId
      );
      const updatedLists = [...currentTodos];
      const temp = updatedLists[draggedListIndex];
      updatedLists[draggedListIndex] = updatedLists[activeListIndex];
      updatedLists[activeListIndex] = temp;
      dispatch(updateLists(updatedLists));
    }
  };

  const [, drop] = useDrop({
    accept: 'LIST',
    hover: (item) => {
      if (item.id !== activeListId) {
        handleDrop(item);
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'LIST',
    item: { id: activeListId, boardId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={(node) => drop(drag(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <h4>Todo List for Board: {boardId}</h4>
      <TodoListContainer
        lists={currentTodos}
        cards={cards}
        activeListId={activeListId}
        handleRemoveList={handleRemoveList}
        handleRemoveCard={handleRemoveCard}
        handleSetActiveList={handleSetActiveList}
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
