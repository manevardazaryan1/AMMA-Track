import React , {useState} from "react"
import { useDispatch,useSelector } from "react-redux";
import {addItem, removeItem, updateNewItem} from "../../redux/slices/listsReducer.js"

const Lists = () => {
  const listItems = useSelector((state) => state.lists.listItems);
  const newItem = useSelector((state) => state.lists.newItem);
  const dispatch = useDispatch()

  const [showForm, setShowForm] = useState(false);

  const handleAddList = (event) => {
    event.preventDefault();
    if (newItem.trim() !== "") {
      dispatch(addItem({
        id:new Date().toISOString(),
        text: newItem
      }));
    }
    setShowForm(false);
  };

  const handleRemoveList = (id) => {
    dispatch(removeItem(id));
  };

  const handleInputChange = (event) => {
    dispatch(updateNewItem(event.target.value));
  };

    return (
        <>
            <ul className="lists">
                {listItems.map((item, index) => (
                    <div className="list" key={item.id}>
                        <li>
                            <a href="#">{item.text}</a>
                            <button onClick={() => handleRemoveList(index)}>
                                <span>x</span>
                            </button>
                        </li>
                    </div>
                ))}
                <div className="createList">
                {showForm ? (
                    <form onSubmit={handleAddList}>
                    <label>
                        <input
                        type="text"
                        value={newItem}
                        onChange={handleInputChange}
                        className="list-input"
                        />
                    </label>
                    <div className="form-buttons">
                        <button> Add new list</button>
                        <button onClick={() => setShowForm(false)}>Close</button>
                    </div>
                    </form>
                ) : (
                    <button  className="transparent-button" onClick={() => setShowForm(true)}>Add new list</button>
                )}
                </div>
            </ul> 
        </>
    )

}

export default Lists