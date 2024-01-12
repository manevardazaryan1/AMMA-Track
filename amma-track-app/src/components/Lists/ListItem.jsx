import React from "react";

const ListItem = ({ item, onRemove }) => (
  <div className="list" key={item.id}>
    <li>
      <a href="#">{item.text}</a>
      <button onClick={onRemove}>
        <span>x</span>
      </button>
    </li>
  </div>
);

export default ListItem