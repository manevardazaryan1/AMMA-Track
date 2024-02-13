import React from 'react';
import TodoListCard from './TodoListCards';
import { useDispatch } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {updateLists} from "../../redux/slices/todosSlice.js"

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
    const updatedLists = Array.from(lists);
    const [removed] = updatedLists.splice(result.source.index, 1);
    updatedLists.splice(result.destination.index, 0, removed);
    dispatch(updateLists(updatedLists));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todo-lists" direction="horizontal">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="containerList">
            {lists.map((list, index) => (
              <Draggable key={list.id} draggableId={list.id} index={index}>
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
