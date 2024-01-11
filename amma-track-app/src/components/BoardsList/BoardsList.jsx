import './BoardsList.css'
import { BoardItem } from '../BoardItem/BoardItem'
import { useSelector, useDispatch } from 'react-redux'
import { boardCreationBoxHandle } from '../../redux/slices/creationBoxSlice'
import person from '../../images/person-svgrepo-com.svg'
import { CreateBox } from '../CreateBox/CreateBox'


export const BoardsList = () => {
  
  const dispatch = useDispatch()
  const activeWorkspace = useSelector(state => state.workspaces.workspaces.find(workspace => workspace.active))
  const boards = useSelector(state => state.boards.boards)
  const boardsToShow=boards.filter(board=>board.workspace.id===activeWorkspace.id)
  const create = useSelector(state => state.creation.boardCreationBox)
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
        {boardsToShow.map(item => <BoardItem key={item.id} {...item} />)}
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