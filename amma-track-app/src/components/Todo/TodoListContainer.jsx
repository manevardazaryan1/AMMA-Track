import React from 'react';
import TodoListCard from './TodoListCards';

const TodoListContainer = ({
    lists,
    cards,
    activeListId,
    handleSetActiveList,
    handleRemoveList,
    handleRemoveCard,
    handleAddCard,
    newCardText,
    setNewCardText,
    boardId,
  }) => {
    return (
        <div className="containerList">
            {lists.map((list) => (
                <TodoListCard
                    key={list.id}
                    list={list}
                    activeListId={activeListId}
                    handleSetActiveList={handleSetActiveList}
                    handleRemoveList={handleRemoveList}
                    handleRemoveCard={handleRemoveCard}
                    handleAddCard={handleAddCard}
                    newCardText={newCardText}
                    setNewCardText={setNewCardText}
                    cards={cards[list.id]}
                />
            ))}
        </div>
    )
}

export default TodoListContainer

