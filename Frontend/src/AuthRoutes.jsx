import { useContext } from 'react';
import RegisterAndLoginPage from './pages/RegisterAndLoginPage.jsx';
// import Home from './pages/Home.jsx';
import { UserContext } from './store/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

const AuthRoutes = () => {
  const navigate = useNavigate();

  const { contextUsername } = useContext(UserContext);

  if (contextUsername) {
    navigate('/home');
    // return <Home username={contextUsername}></Home>;
  }
  return <RegisterAndLoginPage></RegisterAndLoginPage>;
};
export default AuthRoutes;
