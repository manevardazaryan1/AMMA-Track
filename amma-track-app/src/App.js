import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Header } from './components/Header/Header';
import MainPage from './pages/MainPage';
import BoardsPage from './pages/BoardsPage/BoardsPage'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import LogOut from './pages/LogOut';
import BoardPage from './pages/BoardPage/BoardPage';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <DndProvider backend={HTML5Backend}>
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
            <Route path='/workspaces/:id' element={<BoardPage />} />
          </Routes>
        </div>
      </>
    </DndProvider>
  );
}

export default App;
