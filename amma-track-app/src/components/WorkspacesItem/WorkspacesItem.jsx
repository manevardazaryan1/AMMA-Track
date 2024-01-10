import './WorkspacesItem.css'
import { toggleActiveWorkspace } from '../../redux/slices/workspacesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import arrow from '../../images/down-arrow-svgrepo-com.svg'
import board from '../../images/board-svgrepo-com.svg'
import settings from '../../images/settings-svgrepo-com.svg'

export const WorkspacesItem = ({ id, img, title }) => {
  const dispatch = useDispatch();
  const activeWorkspaceId = useSelector(state => state.workspaces.workspaces.find(workspace => workspace.active && workspace.id === id))

  const [isClicked, setIsClicked] = useState(false)
  const [isActive, setIsActive] = useState('')
  const handleClick = (type, obj) => {
    setIsActive(type);
    dispatch(toggleActiveWorkspace(obj))
  }

  return (<div className="workspaces-item">
    <div onClick={() => setIsClicked((prev) => !prev)} className="workspaces-item__info">
      <div className="workspaces-item__img" ><img src={img.thumb} alt="img" /></div>
      <p className="workspaces-item__title">{title}</p>
      <img className={`workspaces-arrow ${isClicked ? 'workspaces-arrow--rotated' : ''}`} src={arrow} alt="" />
    </div>
    <div className={`workspaces-item__more ${isClicked ? 'active' : ''}`}>
      <div onClick={() => handleClick('boards', { id, img, title })} className={`workspaces-item__more-tab ${activeWorkspaceId === id && isActive === 'boards' ? 'active' : ''} workspaces-item__more-boards`}>
        <img className='workspaces-item__more-icon' src={board} alt="" />
        <span>Boards</span>
      </div>
      <div onClick={() => handleClick('settings', { id, img, title })} className={`workspaces-item__more-tab ${activeWorkspaceId === id && isActive === 'settings' ? 'active' : ''} workspaces-item__more-settings`}>
        <img className='workspaces-item__more-icon' src={settings} alt="" />
        <span>Settings</span>
      </div>
    </div>
  </div>)
}