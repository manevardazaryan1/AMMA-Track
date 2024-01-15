import React from 'react';

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
  return (
    <div className={`list ${activeListId === list.id ? 'active' : ''}`} onClick={() => handleSetActiveList(list.id)}>
      <div className="list-title-X">
        <h3>{list.title}</h3>
        <button onClick={() => handleRemoveList(list.id)}>X</button>
      </div>
      <ul>
        {cards &&
          cards.map(card => (
            <div className="delete-card">
              <li key={card.id} className="card">
                {card.text}
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
  );
};

export default TodoListCard;
