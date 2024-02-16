import { useState } from 'react';
import './BoardItem.css'
import { deleteBoard } from '../../redux/slices/boardsSlice';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editBoard } from '../../redux/slices/boardsSlice';

export const BoardItem = ({ id, img, title, menuOpened, setMenuOpened, openedMenuId, setOpenedMenuId }) => {

  const [isEditable, setIsEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(title)
  const dispatch = useDispatch()
  const onDeleteBoard = () => {
    dispatch(deleteBoard({ id }))
    setMenuOpened(false)
    setOpenedMenuId('')
  }
  const onSave = () => {
    dispatch(editBoard({ id,title:newTitle }))
    setMenuOpened(false)
    setOpenedMenuId('')
    setIsEditable(false)
  }

  return (

    <div style={{ backgroundImage: `url(${img.thumb})` }} className="boardItem">
      <Link to={`/workspaces/${id}`}>
        {!isEditable && <div className='boardItem__text-wrapper'>{title}</div>}
      </Link>
      <button onClick={() => { setMenuOpened((prev) => !prev); setOpenedMenuId(id) }} className='boardItem__editBtn'>...</button>
      {menuOpened && openedMenuId === id && <div className="boardItem__menu">
        <div onClick={!isEditable ? () => { setIsEditable(true); } : onSave}>{!isEditable ? 'Edit' : 'Save'}</div>
        <div onClick={onDeleteBoard} >Delete</div>
      </div>}
      {isEditable && <form>
        <input onChange={(e) => setNewTitle(e.target.value)} className='newBoardTitle' type="text" value={newTitle} />
      </form>}
    </div >
  )
}