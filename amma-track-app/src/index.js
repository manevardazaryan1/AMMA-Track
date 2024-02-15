import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
      <BrowserRouter >
        <App />
      </BrowserRouter>
  </Provider>
);

const handleWindowLoad = () => {
  setTimeout(() => {
    console.log("mane")
      document.querySelector(".loading_block").classList.add("hide");
      document.body.classList.remove("disabled");
  }, 1000);
};

window.addEventListener('load', handleWindowLoad);

