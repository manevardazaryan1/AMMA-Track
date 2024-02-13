import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import CardModal from '../CardModal/CardModal';

const TodoListCard = ({
  list,
  activeListId,
  handleSetActiveList,
  handleRemoveList,
  handleRemoveCard,
  handleAddCard,
  newCardText,
  setNewCardText,
  cards,
  index,
}) => {
  const [cardModal, setCardModal] = useState(false);
  const [cardID, setCardId] = useState("");

  const [, drag] = useDrag({
    type: 'CARD',
    item: { id: list.id, index },
  });

  const openCardModal = (cardID) => {
    setCardModal(() => true);
    setCardId(() => cardID)
  }

  const closeCardModal = () => {
    setCardModal(() => false);
    setCardId(() => "")
  }

  return (
    <>
    <div 
      ref={drag}
      className={`list ${activeListId === list.id ? 'active' : ''}`} 
      onClick={() => handleSetActiveList(list.id)}
    >
      <div className="list-title-X">
        <h3>{list.title}</h3>
        <button onClick={() => handleRemoveList(list.id)}>X</button>
      </div>
      <ul>
        {cards &&
          cards.map(card => (
            <div className="delete-card" key={card.id}>
              <li  className="card" >
                {card.text}
                <button onClick={() => openCardModal(card.id)}><i className="fa-solid fa-pen"></i></button>
                <button onClick={() => handleRemoveCard(list.id, card.id)}>X</button>
              </li>
            </div>
          ))}
      </ul>
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
    </div>
    {
      cardModal && 
      <>
        <button onClick={() => closeCardModal()} className='close-card-modal-btn'><i className="fa-solid fa-xmark"></i></button>
        <CardModal cardID={cardID} />
      </>
    }
    </>
  );
};

export default TodoListCard;
