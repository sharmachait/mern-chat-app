import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const AccountVerification = () => {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(token);
    let res = await axios.post(`/auth/verify`, { token, username });
    if (res.status === 201) {
      toast.info('Account verified, you can login now.');
    }
  }
  return (
    <div className="bg-[#0b132b] h-svh flex flex-col gap-2 items-center justify-center ">
      <div className="text-[#DAF2FE] font-bold text-2xl p-2">Verification</div>
      <div className="text-[#DAF2FE] font-bold p-2">
        Please enter your Email address and the token you received on your
        email.
      </div>
      <form className="w-80 flex flex-col gap-2 mb-40">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="Email"
          placeholder="Email"
          className="block w-full font-semibold rounded-md p-2 border"
        />
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          type="text"
          placeholder="Token"
          className="block w-full font-semibold rounded-md p-2 border"
        />
        <button
          className="bg-[#5bc0be] font-semibold block w-full rounded-md p-2"
          onClick={handleSubmit}
        >
          Verify
        </button>
      </form>
    </div>
  );
};
export default AccountVerification;
