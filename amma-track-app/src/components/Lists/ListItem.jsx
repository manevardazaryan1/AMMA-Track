import React , {useState} from "react";
import InputCard from "../Card/InputCard";
import CardsList from "../Card/CardsList";

const ListItem = ({ item, onRemove }) => {

  const [showForm, setShowForm] = useState(false); 

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <li className="list-item" key={item.id}>
      <div className="list-titel-delete-card">
        <div className = "list-titel-delete">
          <span>{item.text}</span>
          <button onClick={onRemove}>
              <span>x</span>
            </button>
        </div>
        <div className = "list-add-card">
          {showForm ? (
              <>
                <InputCard handleToggleForm={handleToggleForm}/>
                <CardsList />
              </>
                ) : (
              <>
                <button className="transparent-button" onClick={handleToggleForm}>
                    Add card
                </button>
                
              </>
            )}
        </div>
      </div>
    </li>
  );
};

export default ListItem;



