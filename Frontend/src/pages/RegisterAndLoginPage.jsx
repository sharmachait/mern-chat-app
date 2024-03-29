import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../store/UserContext.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const RegisterAndLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formMode, setFormMode] = useState('Register');

  const { setContextUsername, setId } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (formMode === 'Register') register();
    else login();
  }

  async function login() {
    const response = await axios.post('/auth/login', { username, password });
    if (response.status === 201) {
      setId(response.data.id);
      setContextUsername(response.data.username);
    }
  }

  async function register() {
    const response = await axios.post('/auth/register', { username, password });
    if (response.status === 201) {
      setId(response.data.id);
      setContextUsername(response.data.username);
    }
    toast.info(
      'An email has been sent to your account, Please follow the steps in the\n' +
        '          email to verify your account',
      { position: 'top-left', autoClose: false }
    );
    setFormMode('Login');
  }

  function changeMode(e) {
    e.preventDefault();
    if (formMode === 'Register') setFormMode('Login');
    else setFormMode('Register');
  }

  return (
    <div className="bg-[#0b132b] h-svh flex flex-col gap-2 items-center justify-center ">
      <div className="text-[#DAF2FE] font-bold text-2xl p-2">yapp</div>
      <form className="w-80 flex flex-col gap-2 mb-40">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          className="block w-full font-semibold rounded-md p-2 border"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="block font-semibold w-full rounded-md p-2 border"
        />
        <button
          className="bg-[#5bc0be] font-semibold block w-full rounded-md p-2"
          onClick={handleSubmit}
        >
          {formMode}
        </button>
        <div className="text-center mt-2">
          {formMode === 'Register' && (
            <div className="flex gap-2 justify-center text-[#DAF2FE] font-bold p-2">
              <div>Already a member?</div>
              <button onClick={changeMode}>Login Here</button>
            </div>
          )}
          {formMode === 'Login' && (
            <div className="flex gap-2 justify-center text-[#DAF2FE] font-bold p-2">
              <div>Not a member yet? </div>
              <button onClick={changeMode}>Register Here</button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterAndLoginPage;
