import React from 'react';
import { useSelector } from 'react-redux';

const AuthWrapper = ({ children }) => {
//   const isLoggedIn = useSelector(state => state.auth.user);
  const {user} = useSelector(state => state.auth);
  if (!user) {
    return <div>Пожалуйста, авторизуйтесь для доступа к приложению.</div>;
  }

  return children;
};



export default AuthWrapper;