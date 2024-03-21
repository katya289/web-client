import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import SignIn from './components/Registration&Authentication/Login';
import SignUp from './components/Registration&Authentication/SignUp';
import MainPage from './components/mainPage/MainPage';


function App() {
  return (
    <div className="App">
      <Router>
            <Routes>
             <Route path='/' element={<MainPage/>}></Route>
              <Route path='/register' element={<SignUp />}></Route>
              <Route
                path='/login'
                element={<SignIn />}
              />
    
            </Routes>
          </Router>
    </div>
  );
}

export default App;
