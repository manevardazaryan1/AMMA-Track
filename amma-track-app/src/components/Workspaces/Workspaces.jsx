import './Workspaces.css'
import { Button } from '../Button/Button'
import { WorkspacesItem } from '../WorkspacesItem/WorkspacesItem'
import { CreateBox } from '../CreateBox/CreateBox'
import { useState } from 'react'

export const Workspaces = () => {
  const [create, setCreate] = useState(false)
  return (
    <div className="workspaces">
      <div className="workspaces-title">
        <h4>Workspaces</h4>
        <Button onClick={() => { }} type="main">+</Button>
        <CreateBox type={'workspace'}/>
      </div>
      {

      }
    </div>


  )
}