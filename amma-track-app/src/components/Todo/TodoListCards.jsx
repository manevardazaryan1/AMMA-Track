import { useState } from 'react';

import CardModal from '../CardModal/CardModal';

import { Droppable, Draggable } from 'react-beautiful-dnd';


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
}) => {
  const [cardModal, setCardModal] = useState(false);
  const [cardID, setCardId] = useState("");

  const openCardModal = (cardID) => {
    setCardModal(() => true);
    setCardId(() => cardID)
  }

  const closeCardModal = () => {
    setCardModal(() => false);
    setCardId(() => "")
  }

  return (
    <div className={`list ${activeListId === list.id ? 'active' : ''}`} onClick={() => handleSetActiveList(list.id)}>
      <div className="list-title-X">
        <h3>{list.title}</h3>
        <button onClick={() => handleRemoveList(list.id)}><i className="fa-solid fa-x"></i></button>
      </div>
      <Droppable droppableId={list.id} type="CARD">
        {(provided, snapshot) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {cards &&
              cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}  type="CARD">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="delete-card"
                    >
                      <li className="card">
                        {card.text}
                        <div className="card-buttons">                        
                          <button onClick={() => openCardModal(card.id)} className="open-card-modal-button">
                            <i className="fa-solid fa-pen"></i>
                          </button>
                          <button onClick={() => handleRemoveCard(list.id, card.id)}><i className="fa-solid fa-x"></i></button>
                        </div>
                      </li>
                    </div>
                  )}
                </Draggable>
              ))}
          </ul>
        )}
      </Droppable>
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
      {cardModal &&
        <>
          <button onClick={() => closeCardModal()} className='close-card-modal-btn'><i className="fa-solid fa-xmark"></i></button>
          <CardModal cardID={cardID} />
        </>
      }
    </div>
  );
};

export default TodoListCard;
