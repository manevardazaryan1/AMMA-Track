import React from "react";

const ListForm = ({ newItem, onInputChange, onAddList, onCloseForm }) => (
  <form onSubmit={onAddList}>
    <label>
      <input
        type="text"
        value={newItem}
        onChange={onInputChange}
        className="list-input"
      />
    </label>
    <div className="form-buttons">
      <button> Add new list</button>
      <button onClick={onCloseForm}>Close</button>
    </div>
  </form>
);

export default ListForm