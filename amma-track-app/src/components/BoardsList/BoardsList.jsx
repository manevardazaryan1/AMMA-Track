import './BoardsList.css'

import { useEffect, useState } from 'react'

import { CreateBox } from '../CreateBox/CreateBox'
import { BoardItem } from '../BoardItem/BoardItem'
import { boardCreationBoxHandle } from '../../redux/slices/creationBoxSlice'

import person from '../../images/person-svgrepo-com.svg'

import { useSelector, useDispatch } from 'react-redux'
import { addBoard } from '../../redux/slices/boardsSlice'

import { db } from '../../config/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'


export const BoardsList = () => {
  const dispatch = useDispatch()
  const activeWorkspace = useSelector(state => state.workspaces.workspaces.find(workspace => workspace.active))
  const boards = useSelector(state => state.boards.boards)
  const boardsToShow = boards.filter(board => board.workspace.id === activeWorkspace.id)
  const create = useSelector(state => state.creation.boardCreationBox)
  const [menuOpened, setMenuOpened] = useState(false);
  const [openedMenuId, setOpenedMenuId] = useState('')
  useEffect(() => {
    const fetchBoards = async () => {
      const boardsCollection = collection(db, 'boards')
      const snapshot = await getDocs(boardsCollection)
      snapshot.docs.map((doc) => (dispatch(addBoard({ ...doc.data() }))))
    }
    if (!boards.length) fetchBoards()
  }, [boards.length, dispatch])

  return (
    <div className="boardsList">
      <div className="workspace-box">
        <img src={activeWorkspace.img.thumb} alt="workspace img" />
        <p>{activeWorkspace.title}</p>
      </div>
      <div className='boardsList-text'>
        <img src={person} alt="person" />
        <p>Your boards</p>
      </div>
      <div className="boardsList-items">
        {boardsToShow.map(item => <BoardItem  openedMenuId={openedMenuId} setOpenedMenuId={setOpenedMenuId} setMenuOpened={setMenuOpened} menuOpened={menuOpened} key={item.id} {...item} />)}
        <div className="boardsList-items__create-wrapper">
          <div onClick={() => dispatch(boardCreationBoxHandle({ val: true }))} className='boardsList-items__create'>
            Create new board
          </div>
          {create && <CreateBox handleBox={boardCreationBoxHandle} type={'board'} />}
        </div>
      </div>
    </div>
  )
}