import './Workspaces.css'
import { Button } from '../Button/Button'
import { WorkspacesItem } from '../WorkspacesItem/WorkspacesItem'

export const Workspaces = () => {

  return (
    <div className="workspaces">
      <div className="workspaces-title">
        <h4>Workspaces</h4>
        <Button onClick={() => { }} type="main">+</Button>
      </div>
      {
        workspacesList.map(({ payload }) => {

          return <WorkspacesItem key={1} img={payload.img[0].urls.thumb} title={payload.title} />
        })
      }
    </div>


  )
}