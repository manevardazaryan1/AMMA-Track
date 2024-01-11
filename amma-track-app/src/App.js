import './App.css';
import './authCss/style.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import MainPage from './pages/MainPage';
import BoardsPage from './pages/BoardsPage/BoardsPage'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import LogOut from './pages/LogOut';
import { Route, Routes } from 'react-router-dom';


function App() {

  return (
    <>
      <Header />
      <div className='App'>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/account' element={<Account />} />
          <Route path='/log-out' element={<LogOut />} />
          <Route path='/workspaces' element={<BoardsPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
