import './BoardsPage.css'
import { Header } from '../../components/Header/Header'
import { Workspaces } from '../../components/Workspaces/Workspaces'
import { Footer } from '../../components/Footer/Footer'
import { BoardsList } from '../../components/BoardsList/BoardsList'
import { useSelector } from 'react-redux'

const BoardsPage = () => {
  const activeWorkspaceId = useSelector(state => state.workspaces.workspaces.find(workspace => workspace.active))
  return (
    <>
      <Header />
      <div className="container container--boardsPage">
        <Workspaces />
        {activeWorkspaceId && < BoardsList />}
      </div>

      <Footer />
    </>
  )
}

export default BoardsPage