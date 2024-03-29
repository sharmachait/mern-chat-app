import { useContext, useEffect } from 'react';
import RegisterAndLoginPage from './pages/RegisterAndLoginPage.jsx';
import { UserContext } from './store/UserContext.jsx';

const Routes = () => {
  useEffect(() => {
    console.log('routes rendered');
  }, []);
  const { contextUsername, id, setContextUsername, setId } =
    useContext(UserContext);

  if (contextUsername) return `logged in as ${contextUsername}`;
  return <RegisterAndLoginPage></RegisterAndLoginPage>;
};
export default Routes;
