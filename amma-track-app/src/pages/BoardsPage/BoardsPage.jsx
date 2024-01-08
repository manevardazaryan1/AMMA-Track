import './BoardsPage.css'
import { Header } from '../../components/Header/Header'
import { Workspaces } from '../../components/Workspaces/Workspaces'
import { Footer } from '../../components/Footer/Footer'
import { BoardsList } from '../../components/BoardsList/BoardsList'

const BoardsPage = () => {
  return (
    <>
      <Header />

      <div className="container container--boardsPage">
        <Workspaces />
        <BoardsList />
      </div>

      <Footer />
    </>
  )
}

export default BoardsPage