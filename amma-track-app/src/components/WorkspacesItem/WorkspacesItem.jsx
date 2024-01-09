import './WorkspacesItem.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import arrow from '../../images/down-arrow-svgrepo-com.svg'
import board from '../../images/board-svgrepo-com.svg'
import settings from '../../images/settings-svgrepo-com.svg'

export const WorkspacesItem = ({ img, title }) => {




  const [isClicked, setIsClicked] = useState(false)
  return (<div className="workspaces-item">
    <div onClick={() => setIsClicked((prev) => !prev)} className="workspaces-item__info">
      <div className="workspaces-item__img" ><img src={img.thumb} alt="img" /></div>
      <p className="workspaces-item__title">{title}</p>
      <img className={`workspaces-arrow ${isClicked ? 'workspaces-arrow--rotated' : ''}`} src={arrow} alt="" />
    </div>
    <div className={`workspaces-item__more ${isClicked ? 'active' : ''}`}>
      <Link className='workspaces-item__more-tab workspaces-item__more-boards'>
        <img className='workspaces-item__more-icon' src={board} alt="" />
        <span>Boards</span>
      </Link>
      <Link className='workspaces-item__more-tab workspaces-item__more-settings'>
        <img className='workspaces-item__more-icon' src={settings} alt="" />
        <span>Settings</span>
      </Link>
    </div>
  </div>)
}