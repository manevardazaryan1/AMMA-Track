import './Workspaces.css'
import { Button } from '../Button/Button'
import { WorkspacesItem } from '../WorkspacesItem/WorkspacesItem'
import { CreateBox } from '../CreateBox/CreateBox'
import { useDispatch, useSelector } from 'react-redux'
import { creationBoxHandle } from '../../redux/slices/workspacesSlice'

export const Workspaces = () => {
  const create = useSelector((state) => state.workspaces.creationBox)
  const dispatch = useDispatch()
  return (
    <div className="workspaces">
      <div className="workspaces-title">
        <h4>Workspaces</h4>
        <Button onClick={() => dispatch(creationBoxHandle({val:true}))} type="main">+</Button>
        {create && <CreateBox type={'workspace'} />}
      </div>
      {

      }
    </div>


  )
}