import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import SignIn from './components/Registration&Authentication/Login';
import SignUp from './components/Registration&Authentication/SignUp';
import MainPage from './components/mainPage/MainPage';
import AccountPage from './components/account/AccountPage';
import React from 'react';
import { CustomDialog } from './components/CustomDialog';
import Search from './components/podcasts/Search';
import FavoritePodcasts from './components/podcasts/FavoritePodcasts';
import CategoryDetails from './components/podcasts/CategoryDetails';
import PrimarySearchAppBar from './components/appBar/primarySearchAppBar';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<MainPageWithAppBar />}></Route>
          <Route path='/register' element={<SignUpWithAppBar />}></Route>
          <Route path='/login' element={<SignInWithAppBar />} />
          <Route path='/favorites' element={<FavoritePodcastsWithAppBar />} />
          <Route path='/account' element={<AccountPageWithAppBar />} />
          <Route path='/search' element={<SearchWithAppBar />}></Route>
          <Route path='/category/details' element={<CategoryDetailsWithAppBar />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

const MainPageWithAppBar = () => {
  const location = useLocation();
  const shouldShowAppBar = () => {
    const hiddenPaths = ['/login', '/register'];
    return !hiddenPaths.includes(location.pathname);
  };

  return (
    <>
      {shouldShowAppBar() && <PrimarySearchAppBar />}
      <MainPage />
    </>
  );
};

const SignUpWithAppBar = () => {
  const location = useLocation();
  const shouldShowAppBar = () => {
    const hiddenPaths = ['/login', '/register'];
    return !hiddenPaths.includes(location.pathname);
  };

  return (
    <>
      {shouldShowAppBar() && <PrimarySearchAppBar />}
      <SignUp />
    </>
  );
};

const SignInWithAppBar = () => {
  const location = useLocation();
  const shouldShowAppBar = () => {
    const hiddenPaths = ['/login', '/register'];
    return !hiddenPaths.includes(location.pathname);
  };

  return (
    <>
      {shouldShowAppBar() && <PrimarySearchAppBar />}
      <SignIn />
    </>
  );
};

const FavoritePodcastsWithAppBar = () => {
  const location = useLocation();
  const shouldShowAppBar = () => {
    const hiddenPaths = ['/login', '/register'];
    return !hiddenPaths.includes(location.pathname);
  };

  return (
    <>
      {shouldShowAppBar() && <PrimarySearchAppBar />}
      <FavoritePodcasts />
    </>
  );
};

const AccountPageWithAppBar = () => {
  const location = useLocation();
  const shouldShowAppBar = () => {
    const hiddenPaths = ['/login', '/register'];
    return !hiddenPaths.includes(location.pathname);
  };

  return (
    <>
      {shouldShowAppBar() && <PrimarySearchAppBar />}
      <AccountPage />
    </>
  );
};

const SearchWithAppBar = () => {
  const location = useLocation();
  const shouldShowAppBar = () => {
    const hiddenPaths = ['/login', '/register'];
    return !hiddenPaths.includes(location.pathname);
  };

  return (
    <>
      {shouldShowAppBar() && <PrimarySearchAppBar />}
      <Search />
    </>
  );
};

const CategoryDetailsWithAppBar = () => {
  const location = useLocation();
  const shouldShowAppBar = () => {
    const hiddenPaths = ['/login', '/register'];
    return !hiddenPaths.includes(location.pathname);
  };

  return (
    <>
      {shouldShowAppBar() && <PrimarySearchAppBar />}
      <CategoryDetails />
    </>
  );
};

export default App;
