import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "./ListItem";
import ListForm from "./ListForm";
import { addItem, removeItem, updateNewItem } from "../../redux/slices/listsSlice.js";

const Lists = () => {
  const listItems = useSelector((state) => state.lists.listItems);
  const newItem = useSelector((state) => state.lists.newItem);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  const handleAddList = (event) => {
    event.preventDefault();
    if (newItem.trim() !== "") {
      dispatch(addItem({
        id: new Date().toISOString(),
        text: newItem
      }));
    }
    setShowForm(false);
  };

  const handleRemoveList = (index) => {
    dispatch(removeItem(index));
  };

  const handleInputChange = (event) => {
    dispatch(updateNewItem(event.target.value));
  };

  return (
    <>
      <ul className="lists">
        {listItems.map((item, index) => (
          <ListItem 
            key={item.id} 
            item={item} 
            onRemove={() => handleRemoveList(index)} 
          />
        ))}
        <div className="createList">
          {showForm ? (
            <ListForm
              newItem={newItem}
              onInputChange={handleInputChange}
              onAddList={handleAddList}
              onCloseForm={() => setShowForm(false)}
            />
          ) : (
            <button className="transparent-button" 
              onClick={() => setShowForm(true)}>
              Add new list
            </button>
          )}
        </div>
      </ul>
    </>
  );
};

export default Lists;
