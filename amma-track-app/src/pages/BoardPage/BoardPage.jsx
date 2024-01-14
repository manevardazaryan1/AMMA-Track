import React from "react"
import "./BoardPage.css"
import TodoList from "../../components/Todo/TodoList"
import { Header } from '../../components/Header/Header'
import { Footer } from '../../components/Footer/Footer'

const BoardPage = () => {
    return (
        <>
        <Header />
        <div className="board-list-conteyner">
            <TodoList />
        </div>
        <Footer />
        </>
    )
  }
  
  export default BoardPage