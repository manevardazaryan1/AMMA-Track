import './CardModal.css'
import CardDescription from './CardDescription';

export default function CardModal({ cardID }) {

    return (
        <div className="card-modal-block">
            <div className="card-modal scroll_effect"> 
                <h3>AMMA-Track</h3>
                <CardDescription cardID={cardID}/>
            </div>
        </div>
    )
}