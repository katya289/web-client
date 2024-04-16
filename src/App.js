import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/Registration&Authentication/Login';
import SignUp from './components/Registration&Authentication/SignUp';
import MainPage from './components/mainPage/MainPage';
import AccountPage from './components/account/AccountPage';
import React, { useState } from 'react';
import { CustomDialog } from './components/CustomDialog';
import Search from './components/podcasts/Search';
import CategoryDetails from './components/podcasts/CategoryDetails';
function App() {
 

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<MainPage />}></Route>
          <Route path='/register' element={<SignUp />}></Route>
          <Route path='/login' element={<SignIn />} />
          
            <Route path='/account' element={<AccountPage />} />
      
          <Route path='/search' element={<Search/>}></Route>
          <Route path='/category/details' element={<CategoryDetails/>}></Route>
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
