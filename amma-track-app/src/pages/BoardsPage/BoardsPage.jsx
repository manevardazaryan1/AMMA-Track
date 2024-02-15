import './BoardsPage.css'
import { Header } from '../../components/Header/Header'
import { Workspaces } from '../../components/Workspaces/Workspaces'
import { Footer } from '../../components/Footer/Footer'
import { BoardsList } from '../../components/BoardsList/BoardsList'
import { useSelector } from 'react-redux'
import { WorkspaceSettings } from '../../components/WorkspaceSettings/WorkspaceSettings'

// DO like Meri workspaces:workspaceId <-----
const BoardsPage = () => {
  const activeWorkspaceId = useSelector(state => state.workspaces.workspaces.find(workspace => workspace.active));
  const settings = useSelector(state => state.workspaces.settingsOpened);
  return (
    <>
      <Header />
      <div className="container container--boardsPage">
        <Workspaces />
        {activeWorkspaceId && < BoardsList />}
      </div>
      {true && <WorkspaceSettings />}
      <Footer />
    </>
  )
}

export default BoardsPage


