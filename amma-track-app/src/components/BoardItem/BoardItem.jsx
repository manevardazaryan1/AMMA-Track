import { useState, useRef, useEffect } from 'react';
import './BoardItem.css'
import { deleteBoard } from '../../redux/slices/boardsSlice';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editBoard } from '../../redux/slices/boardsSlice';
import { db } from '../../config/firebaseConfig';
import { collection, updateDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
export const BoardItem = ({ id, img, title}) => {
  const boardFormRef = useRef(null);
  const [isEditable, setIsEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(title)
  const dispatch = useDispatch()
  const boardsCollection = collection(db, 'boards')
  const onDeleteBoard = async () => {
    dispatch(deleteBoard({ id }))
    const snapshot = await getDocs(boardsCollection)
    for (let boardDoc of snapshot.docs.filter(doc => doc.data().id === id)) {
      if (boardDoc.id) {
        await deleteDoc(doc(db, 'boards', boardDoc.id))
      }
    }
  }
  const onSave = async (e) => {
    e.preventDefault()
    dispatch(editBoard({ id, title: newTitle }))
    setIsEditable(false)
    const snapshot = await getDocs(boardsCollection)
    for (let boardDoc of snapshot.docs.filter(doc => doc.data().id === id)) {
      if (boardDoc.id) {
        await updateDoc(doc(db, 'boards', boardDoc.id), {
          ...boardDoc.data(),
          title: newTitle,
        })
      }
    }
  }
  useEffect(() => {
    const handleClickOutside = async (event) => {
      if (boardFormRef.current && !boardFormRef.current.contains(event.target)) {
        dispatch(editBoard({ id, title: newTitle }))
        setIsEditable(false)
        const snapshot = await getDocs(boardsCollection)
        for (let boardDoc of snapshot.docs.filter(doc => doc.data().id === id)) {
          if (boardDoc.id) {
            await updateDoc(doc(db, 'boards', boardDoc.id), {
              ...boardDoc.data(),
              title: newTitle,
            })
          }
        }
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [newTitle]);

  return (

    <div style={{ backgroundImage: `url(${img.thumb})` }} ref={boardFormRef} className="boardItem">
      <Link to={`/workspaces/${id}`}>
        {!isEditable && <div className='boardItem__text-wrapper'>{title}</div>}
      </Link>

      <button className='boardItem__editBtn'>
        <span>...</span>
        <div className='boardItem__btnWrapper'>
          <p onClick={() => setIsEditable(true)}>Edit</p>
          <p onClick={onDeleteBoard}>Delete</p>
        </div>
      </button>
      {isEditable && <form onSubmit={onSave}>
        <input onChange={(e) => setNewTitle(e.target.value)} className='newBoardTitle' type="text" value={newTitle} />
      </form>}
    </div >
  )
}