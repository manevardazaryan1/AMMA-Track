import React from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux" 
import { collection, getDocs} from 'firebase/firestore'
import "./BoardPage.css"
import TodoList from "../../components/Todo/TodoList"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { db } from '../../config/firebaseConfig'
import { addBoard } from "../../redux/slices/boardsSlice" 

const BoardPage = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const currentBoard = useSelector(state => state.boards.boards);

    useEffect(() => {
        const fetchBoards= async () => {
          const boardsCollection = collection(db, 'boards')
          const snapshot = await getDocs(boardsCollection)
          snapshot.docs.map((doc) => (dispatch(addBoard({ ...doc.data() }))))
        }
        if (!currentBoard.length) fetchBoards()
    }, [currentBoard.length, dispatch])

    const selectedImg = currentBoard.find(board => board.id === id)?.img?.bigImg
    return (
        <div style={{ backgroundImage: `url(${selectedImg})` }} className="board-list-conteyner">
            <TodoList boardId={id} />
        </div>
    )
}

import React from "react";
import "./BoardPage.css";
import TodoList from "../../components/Todo/TodoList";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const BoardPage = () => {
  const { id } = useParams();
  const currentBoard = useSelector((state) => state.boards.boards);
  const selectedImg = currentBoard.find((board) => board.id === id).img.bigImg;
  return (
    <div
      style={{ backgroundImage: `url(${selectedImg})` }}
      className="board-list-conteyner"
    >
      <TodoList boardId={id} />
    </div>
  );
};


export default BoardPage;
