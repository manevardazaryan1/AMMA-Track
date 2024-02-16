import './TodoList.css';
import { useState, useEffect } from 'react';

import TodoListContainer from './TodoListContainer';

import { useDispatch, useSelector } from 'react-redux';
import { addList, removeList } from '../../redux/slices/todosSlice';
import { addCard, removeCard } from '../../redux/slices/cardsSlice';

import { db } from '../../config/firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';


const TodoList = ({ boardId }) => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.todos);
  const cards = useSelector((state) => state.cards);

  const [newListTitle, setNewListTitle] = useState('');
  const [newCardText, setNewCardText] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [activeListId, setActiveListId] = useState(null);

  const currentTodos = lists.filter((todo) => todo.boardId === boardId);

  useEffect(() => {
    const fetchLists = async () => {
      setIsLoading(true)
      const listsCollection = collection(db, 'lists')
      const snapshot = await getDocs(listsCollection)
      snapshot.docs.reverse().map((doc) => (dispatch(addList({ ...doc.data() }))))
      setIsLoading(false)
    }

    if (!lists.length) fetchLists()
  }, [lists.length, dispatch])

  useEffect(() => {
    const fetchCards = async () => {
      const cardsCollection = collection(db, 'cards')
      const snapshot = await getDocs(cardsCollection)
      snapshot.docs.map((doc) => (dispatch(addCard({ ...doc.data() }))))
    }
    if (!Object.keys(cards).length) fetchCards()
  }, [cards, Object.keys(cards).length, dispatch])

  const generateUniqueId = () => {
    return new Date().getTime().toString();
  };

  const handleToggleForm = () => setShowForm(!showForm);

  const handleAddList = async () => {
    if (newListTitle.trim() !== '') {
      const newListId = generateUniqueId();

      const listsCollection = collection(db, 'lists');
      await addDoc(listsCollection, { id: newListId, title: newListTitle, boardId: boardId, position: currentTodos.length });
        }));
      setActiveListId(newListId);
      setNewListTitle("");
    }
  };

  const handleRemoveList = async (listId) => {
    if (activeListId === listId) {
      setNewCardText('');
      setActiveListId(null);
    }
    dispatch(removeCard({ listId }));
    const listsCollection = collection(db, "lists")
    const snapshot = await getDocs(listsCollection)

    for (let list of snapshot.docs.filter(doc => doc.data().id === listId)) {
      if (list.id)
        await deleteDoc(doc(db, 'lists', list.id))
    }
    dispatch(removeList(listId));
  };

  const handleAddCard = async () => {
    if (newCardText.trim() !== '' && activeListId !== null) {
      const newCardId = generateUniqueId();

      const cardsCollection = collection(db, 'cards');
      dispatch(
        addCard({
          listId: activeListId,
          card: {
            id: newCardId,
            text: newCardText
          }
        }
        ));
      await addDoc(cardsCollection, { listId: activeListId, card: { id: newCardId, text: newCardText } });

      setNewCardText('');
    }
  };

  const handleRemoveCard = async (listId, cardId) => {
    dispatch(removeCard({ listId, cardId }));
    const cardsCollection = collection(db, "cards")
    const snapshot = await getDocs(cardsCollection)

    for (let card of snapshot.docs.filter(doc => doc.data().card.id === cardId)) {
      if (card.id)
        await deleteDoc(doc(db, 'cards', card.id))
    }
  };

  const handleSetActiveList = (listId) => {
    setActiveListId(listId);
  };

  return (

    <div className='to-do-lists'>
      {
        showForm ? (
          <div className='add-list-form list-buttons'>
            <input
              type="text"
              placeholder="Add another list"
              value={newListTitle}
              onChange={e => setNewListTitle(e.target.value)}
            />
            <button onClick={handleAddList}><i className="fa-solid fa-check"></i></button>
            <button onClick={handleToggleForm}><span><i className="fa-solid fa-x"></i></span></button>
          </div>
        ) : (
          <button className="add-list list-buttons" onClick={handleToggleForm}>
            Add list
          </button>
        )}
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
        isLoading={isLoading}
      />
    </div>
  );
};

export default TodoList;
