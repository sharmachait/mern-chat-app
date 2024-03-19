import axios from 'axios';
import UserContextProvider from './store/UserContext.jsx';
import Routes from './Routes.jsx';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
