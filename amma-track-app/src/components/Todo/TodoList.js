// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addList, removeList } from '../../redux/slices/todosSlice';
// import { addCard, removeCard } from '../../redux/slices/cardsSlice';
// import './TodoList.css'

// const TodoList = () => {
//   const dispatch = useDispatch();
//   const lists = useSelector(state => state.todos);
//   const cards = useSelector(state => state.cards);

//   const [newListTitle, setNewListTitle] = useState('');
//   const [isAddingList, setIsAddingList] = useState(false);

//   const [newCardText, setNewCardText] = useState('');
//   const [activeListId, setActiveListId] = useState(null);

//   const generateUniqueId = () => {
//     return new Date().getTime().toString();
//   };

//   const handleAddList = () => {
//     if (newListTitle.trim() !== '') {
//       const newListId = generateUniqueId();
//       dispatch(addList({ id: newListId, title: newListTitle }));
//       setNewListTitle('');
//       setIsAddingList(true);
//       setActiveListId(newListId);
//     }
//   };

//   const handleRemoveList = listId => {
//     dispatch(removeList(listId));
//     if (activeListId === listId) {
//       setNewCardText('');
//       setActiveListId(null);
//     }
//     // Теперь удаляем карточки для этого списка
//     dispatch(removeCard({ listId }));
//   };

//   const handleAddCard = () => {
//     if (newCardText.trim() !== '' && activeListId !== null) {
//       const newCardId = generateUniqueId();
//       dispatch(addCard({ listId: activeListId, card: { id: newCardId, text: newCardText } }));
//       setNewCardText('');
//     }
//   };

//   const handleRemoveCard = (listId, cardId) => {
//     dispatch(removeCard({ listId, cardId }));
//   };

//   return (
//     <div className="container">
//       {(isAddingList || Object.keys(lists).length === 0) && (
//         <div>
//           <input
//             type="text"
//             placeholder="Введите название списка"
//             value={newListTitle}
//             onChange={e => setNewListTitle(e.target.value)}
//           />
//           <button onClick={handleAddList}>Добавить список</button>
//         </div>
//       )}

//       {Object.values(lists).map(list => (
//         <div key={list.id} className="list">
//           <h3>{list.title}</h3>
//           <button onClick={() => setActiveListId(list.id)}>Добавить карточку</button>
//           <button onClick={() => handleRemoveList(list.id)}>Удалить список</button>

//           {activeListId === list.id && (
//             <div>
//               <input
//                 type="text"
//                 placeholder="Введите текст карточки"
//                 value={newCardText}
//                 onChange={e => setNewCardText(e.target.value)}
//               />
//               <button onClick={handleAddCard}>Добавить карточку</button>
//             </div>
//           )}

//           <ul>
//             {cards[list.id] &&
//               cards[list.id].map(card => (
//                 <li key={card.id} className="card">
//                   {card.text}
//                   <button onClick={() => handleRemoveCard(list.id, card.id)}>Удалить карточку</button>
//                 </li>
//               ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TodoList;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addList, removeList } from '../../redux/slices/todosSlice';
import { addCard, removeCard } from '../../redux/slices/cardsSlice';
import './TodoList.css'

const TodoList = () => {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.todos);
  const cards = useSelector(state => state.cards);

  const [newListTitle, setNewListTitle] = useState('');
  const [isAddingList, setIsAddingList] = useState(false);

  const [newCardText, setNewCardText] = useState('');
  const [activeListId, setActiveListId] = useState(null);
  const [showForm, setShowForm] = useState(false)

  const generateUniqueId = () => {
    return new Date().getTime().toString();
  };

  const handleToggleForm = () => setShowForm(!showForm);

  const handleAddList = () => {
    if (newListTitle.trim() !== '') {
      const newListId = generateUniqueId();
      dispatch(addList({ id: newListId, title: newListTitle }));
      setActiveListId(newListId);
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
    <div className="containerList">
      {Object.values(lists).map(list => (
        <div key={list.id} className={`list ${activeListId === list.id ? 'active' : ''}`} onClick={() => handleSetActiveList(list.id)}>
          <div className="list-title-X">
            <h3>{list.title}</h3>
            <button onClick={() => handleRemoveList(list.id)}>X</button>
          </div>
          {activeListId === list.id && (
            <div className='add-card'>
              <input
                type="text"
                placeholder="Enter a title for this card..."
                value={newCardText}
                onChange={e => setNewCardText(e.target.value)}
              />
              <button onClick={handleAddCard}>Add card</button>
            </div>
          )}

          <ul>
            {cards[list.id] &&
              cards[list.id].map(card => (
                <div className="delete-card">
                  <li key={card.id} className="card">
                    {card.text}
                    <button onClick={() => handleRemoveCard(list.id, card.id)}>X</button>
                  </li>
                </div>
              ))}
          </ul>
        </div>
      ))}
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
