import React from "react"
import "./BoardPage.css"
import TodoList from "../../components/Todo/TodoList"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const BoardPage = () => {
    const { id } = useParams()
    const currentBoard = useSelector(state => state.boards.boards);
    const selectedImg = currentBoard.find(board => board.id === id).img.bigImg
    return (
        <div style={{ backgroundImage: `url(${selectedImg})` }} className="board-list-conteyner">
            <TodoList boardId={id} />
        </div>
    )
}

export default BoardPage