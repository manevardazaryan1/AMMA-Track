import './App.css'
import MainPage from './pages/MainPage/MainPage';
import BoardsPage from './pages/BoardsPage/BoardsPage';
import { Route, Routes } from 'react-router-dom'
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/workspaces' element={<BoardsPage />} />
      </Routes>
    </div>
  );
}

export default App;
