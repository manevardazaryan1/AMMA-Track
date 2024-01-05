import './BoardsPage.css'
import { Header } from '../../components/Header/Header'
import { Workspaces } from '../../components/Workspaces/Workspaces'
import { Footer } from '../../components/Footer/Footer'

const BoardsPage = () => {
  return (
    <>
      <Header logged />

      <div className="container container--boardsPage">
        <Workspaces />
      </div>

      <Footer />
    </>
  )
}

export default BoardsPage