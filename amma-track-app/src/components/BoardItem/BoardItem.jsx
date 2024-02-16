import { useState } from 'react';
import './BoardItem.css'
import { deleteBoard } from '../../redux/slices/boardsSlice';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editBoard } from '../../redux/slices/boardsSlice';
import { db } from '../../config/firebaseConfig';
import { collection, updateDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
export const BoardItem = ({ id, img, title, menuOpened, setMenuOpened, openedMenuId, setOpenedMenuId }) => {

  const [isEditable, setIsEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(title)
  const dispatch = useDispatch()
  const boardsCollection = collection(db, 'boards')
  const onDeleteBoard = async () => {
    dispatch(deleteBoard({ id }))
    setMenuOpened(false)
    setOpenedMenuId('')
    const snapshot = await getDocs(boardsCollection)
    for(let boardDoc of snapshot.docs.filter(doc => doc.data().id === id)) {
        if (boardDoc.id) {
            await deleteDoc(doc(db, 'boards', boardDoc.id))
        } 
    }
  }
  const onSave = async () => {
    dispatch(editBoard({ id,title:newTitle }))
    setMenuOpened(false)
    setOpenedMenuId('')
    setIsEditable(false)
    const snapshot = await getDocs(boardsCollection)
    for(let boardDoc of snapshot.docs.filter(doc => doc.data().id === id)) {
        if (boardDoc.id) {
          await updateDoc(doc(db, 'boards', boardDoc.id), {
            ...boardDoc.data(),
            title: newTitle,
          })
        } 
    }
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