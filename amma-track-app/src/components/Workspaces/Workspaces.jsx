import './Workspaces.css'
import { Button } from '../Button/Button'
import { WorkspacesItem } from '../WorkspacesItem/WorkspacesItem'
import { CreateBox } from '../CreateBox/CreateBox'
import { useDispatch, useSelector } from 'react-redux'
import { workspaceCreationBoxHandle } from '../../redux/slices/creationBoxSlice'

export const Workspaces = () => {
  const create = useSelector((state) => state.creation.workspaceCreationBox)
  const currentUser = useSelector((state) => state.auth.loggedUser);
  const workspaces = useSelector((state) => state.workspaces.workspaces);
  const workspacesToShow = workspaces.filter(workspace => workspace.user.id === currentUser.id)
  const dispatch = useDispatch()
  return (
    <div className="workspaces">
      <div className="workspaces-title">
        <h4>Workspaces</h4>
        <Button onClick={() => dispatch(workspaceCreationBoxHandle({ val: true }))} type="main">+</Button>
        {create && <CreateBox handleBox={workspaceCreationBoxHandle} type={'workspace'} />}
      </div>
      {
        workspacesToShow.map((workspace) => {
          return (
            <WorkspacesItem key={workspace.id} {...workspace} />
          )
        })
      }
    </div>


  )
}