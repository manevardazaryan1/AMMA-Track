import './BoardItem.css'

import { Link } from 'react-router-dom';


export const BoardItem = ({ id, img, title }) => {
  return (
    <Link to={`/workspaces/${id}`}>
      <div style={{ backgroundImage: `url(${img.thumb})` }} className="boardItem">
        <div className='boardItem__text-wrapper'>{title}</div>
      </div>
    </Link>
  )
}