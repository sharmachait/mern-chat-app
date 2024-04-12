import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import AuthRoutes from './AuthRoutes.jsx';
import Home from './pages/Home.jsx';
import { useContext } from 'react';
import { UserContext } from './store/UserContext.jsx';
import AccountVerification from './pages/AccountVerification.jsx';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

function App() {
  toast.configure();
  const { id } = useContext(UserContext);
  return (
    <Routes>
      <Route path={'/'} element={<AuthRoutes />}></Route>
      {id !== null ? (
        <Route path={'/home'} element={<Home />}></Route>
      ) : (
        <Route path={'/home'} element={<AuthRoutes />}></Route>
      )}

      <Route path={'/verify'} element={<AccountVerification />}></Route>
    </Routes>
  );
}

export default App;
