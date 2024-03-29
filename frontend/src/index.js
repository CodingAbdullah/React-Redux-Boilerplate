import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Signup from './Components/Signup/signup.jsx';
import Login from './Components/Login/login.jsx';
import Header from './Components/Header/header.jsx';
import Home from './Components/Home/home.jsx';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store/store';
import Logout from './Components/Logout/logout';
import Posts from './Components/Posts/posts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Header />
      <Router>
        <Routes>
          <Route path="/" exact element={<Home/>}></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/logout" exact element={<Logout />}></Route>
          <Route path="/signup" exact element={<Signup />}></Route>
          <Route path="/posts" exact element={<Posts />}></Route>
          <Route path="*" exact element={<Home />}></Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
