import './WorkspaceSettings.css'

import { useState } from 'react'

import { SettingsContent } from './SettingsContent/SettingsContent';


export const WorkspaceSettings = () => {
  const [currentSetting, setCurrentSetting] = useState('title');

  return (
    <div className="settings-container">
      <div className="settings-wrapper">
        <nav className="settings-nav">
          <ul className="settings-list">
            <li className={`settings-list__item ${currentSetting === 'title' ? 'active' : ''}`} onClick={() => setCurrentSetting('title')}>Title</li>
            <li className={`settings-list__item ${currentSetting === 'icon' ? 'active' : ''}`} onClick={() => setCurrentSetting('icon')}>Icon</li>
            <li className={`settings-list__item ${currentSetting === 'members' ? 'active' : ''}`} onClick={() => setCurrentSetting('members')}>Members</li>
            <li className={`settings-list__item ${currentSetting === 'status' ? 'active' : ''}`} onClick={() => setCurrentSetting('status')}>Status</li>
            <li className={`settings-list__item ${currentSetting === 'delete' ? 'active' : ''}`} onClick={() => setCurrentSetting('delete')}>Delete</li>
          </ul>
        </nav>
        <SettingsContent type={currentSetting}/>
      </div>
    </div>
  )
}
