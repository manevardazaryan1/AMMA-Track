import React from "react"
import { useSelector } from 'react-redux'
import CardItem from "./CardItem" 

const CardsList = () => {

    const cards = useSelector((state) => state.cards.cardItems)

    return (
        <div className="card-list">
            <ul>
                {
                    cards.map((todo) => 
                    <CardItem   
                        key={todo.id}
                        {...todo}
                    />)
                }
            </ul>
        </div>
    )
}

export default CardsList