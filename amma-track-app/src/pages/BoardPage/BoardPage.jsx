import { useEffect } from "react"

import TodoList from "../../components/Todo/TodoList"

import { useDispatch, useSelector } from "react-redux"
import { addBoard } from "../../redux/slices/boardsSlice"

import "./BoardPage.css"

import { useParams } from "react-router-dom"

import { db } from '../../config/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'


const BoardPage = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const currentBoard = useSelector(state => state.boards.boards);

    useEffect(() => {
        const fetchBoards = async () => {
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

export default BoardPage;

