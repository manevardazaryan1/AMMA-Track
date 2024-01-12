import React from "react"
import Lists from "../../components/Lists/List"
import "./BoardPage.css"

const BoardPage = () => {
     return (
        <>
            <div className="board-convas">
                <div className="board-list-conteyner">
                    <Lists/>
                </div>
            </div>
        </>    
    )
  }
  
  export default BoardPage