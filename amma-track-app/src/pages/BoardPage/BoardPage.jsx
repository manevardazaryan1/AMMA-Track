import React from "react"
import "./BoardPage.css"
import TodoList from "../../components/Todo/TodoList"

const BoardPage = () => {
    return (
        <div className="board-list-conteyner">
                <TodoList/>
        </div>
    )
  }
  
  export default BoardPage