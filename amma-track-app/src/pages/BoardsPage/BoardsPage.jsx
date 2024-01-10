import './BoardsPage.css'
import { Header } from '../../components/Header/Header'
import { Workspaces } from '../../components/Workspaces/Workspaces'
import { Footer } from '../../components/Footer/Footer'
import { BoardsList } from '../../components/BoardsList/BoardsList'
import { useSelector } from 'react-redux'

const BoardsPage = () => {
  const currWorkspace = useSelector(state => state.workspaces.activeWorkspace)

  return (
    <>
      <Header />
      <div className="container container--boardsPage">
        <Workspaces />
        {!!Object.keys(currWorkspace).length && < BoardsList />}
      </div>

      <Footer />
    </>
  )
}

export default BoardsPage