import "./App.css";
import "./authCss/style.css";

import { useEffect } from "react";

import { login } from "./redux/slices/authenticationSlice";
import { Header } from "./components/Header/Header";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account/Account";
import LogOut from "./pages/LogOut";
import MainPage from "./pages/MainPage";
import BoardsPage from "./pages/BoardsPage/BoardsPage";
import BoardPage from "./pages/BoardPage/BoardPage";
import NotFound from "./pages/NotFound";

import loading from "./images/loading/loading.gif";

import { useDispatch,useSelector } from "react-redux";

import { Route, Routes } from "react-router-dom";


function App() {
  const dispatch = useDispatch();
  const workspaces=useSelector(state=>state.workspaces.workspaces)
  console.log(workspaces);
  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem("isLoggedIn");
    if (isLoggedIn && isLoggedIn === "ON") {
      dispatch(login(JSON.parse(window.localStorage.getItem("loggedUser"))));
    }
  }, [dispatch]);

  return (
    <>

      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/account" element={<Account />} />
          <Route path="/log-out" element={<LogOut />} />
          <Route path="/workspaces" element={<BoardsPage />} />
          <Route path="/workspaces/:id" element={<BoardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
