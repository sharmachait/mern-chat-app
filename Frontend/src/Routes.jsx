import React, { useContext } from 'react';
import Register from './pages/Register.jsx';
import { UserContext } from './store/UserContext.jsx';

const Routes = () => {
  const { contextUsername, id } = useContext(UserContext);
  console.log(contextUsername);
  if (contextUsername) return 'logged in';
  return <Register></Register>;
};
export default Routes;
