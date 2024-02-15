import './WorkspacesItem.css'

import { useState } from 'react'

import arrow from '../../images/down-arrow-svgrepo-com.svg'
import board from '../../images/board-svgrepo-com.svg'
import settings from '../../images/settings-svgrepo-com.svg'

import { useDispatch, useSelector } from 'react-redux'
import { toggleActiveWorkspace } from '../../redux/slices/workspacesSlice'


export const WorkspacesItem = ({ id, img, title }) => {
  const dispatch = useDispatch();
  const activeWorkspace = useSelector(state => state.workspaces.workspaces.find(workspace => workspace.active))
  const [isClicked, setIsClicked] = useState(false)
  const [isActive, setIsActive] = useState('')
  const [settingsOpened, setSettingOpened] = useState(false)
  const handleClick = (type, obj) => {
    setIsActive(type);
    dispatch(toggleActiveWorkspace(obj));
    setSettingOpened(true)
  }

  return (<div className="workspaces-item">
    <div onClick={() => setIsClicked((prev) => !prev)} className="workspaces-item__info">
      <div className="workspaces-item__img" ><img src={img.thumb} alt="img" /></div>
      <p className="workspaces-item__title">{title}</p>
      <img className={`workspaces-arrow ${isClicked ? 'workspaces-arrow--rotated' : ''}`} src={arrow} alt="" />
    </div>
    <div className={`workspaces-item__more ${isClicked ? 'active' : ''}`}>
      <div onClick={() => handleClick('boards', { id, img, title })} className={`workspaces-item__more-tab ${activeWorkspace?.id === id && isActive === 'boards' ? 'active' : ''} workspaces-item__more-boards`}>
        <img className='workspaces-item__more-icon' src={board} alt="" />
        <span>Boards</span>
      </div>
      <div onClick={() => handleClick('settings', { id, img, title })} className={`workspaces-item__more-tab ${activeWorkspace?.id === id && isActive === 'settings' ? 'active' : ''} workspaces-item__more-settings`}>
        <img className='workspaces-item__more-icon' src={settings} alt="" />
        <span>Settings</span>
      </div>
    </div>
  </div >)
}