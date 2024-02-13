import React from 'react';
import TodoListCard from './TodoListCards';
import { useDispatch } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {updateLists} from "../../redux/slices/todosSlice.js"
import {updateCardOrder} from "../../redux/slices/cardsSlice.js"

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
  const dispatch = useDispatch();
 
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    if (result.type === 'LIST') {
      const updatedLists = Array.from(lists);
      const [removed] = updatedLists.splice(result.source.index, 1);
      updatedLists.splice(result.destination.index, 0, removed);
      dispatch(updateLists(updatedLists));
    } else if (result.type === 'CARD') {
      const sourceListId = result.source.droppableId;
      const destinationListId = result.destination.droppableId;

    if (sourceListId === destinationListId) {
        const sourceList = [...cards[sourceListId]];
        const [removed] = sourceList.splice(result.source.index, 1);
        sourceList.splice(result.destination.index, 0, removed);
        dispatch(updateCardOrder({ listId: sourceListId, updatedCards: sourceList }));
      } else {
        const sourceList = [...cards[sourceListId]];
        const destinationList = [...cards[destinationListId]];
        const [movedCard] = sourceList.splice(result.source.index, 1);
        destinationList.splice(result.destination.index, 0, movedCard);
        dispatch(updateCardOrder({ listId: sourceListId, updatedCards: sourceList }));
        dispatch(updateCardOrder({ listId: destinationListId, updatedCards: destinationList }));
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todo-lists" direction="horizontal" type="LIST">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="containerList">
            {lists.map((list, index) => (
              <Draggable key={list.id} draggableId={list.id} index={index} type="LIST">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
                      index={index}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoListContainer;
