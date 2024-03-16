import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="bg-[#0b132b] h-svh flex flex-col gap-2 items-center justify-center ">
      <div className="text-[#DAF2FE] font-bold text-2xl p-2">
        yapp
      </div>
      <form className="w-64 flex flex-col gap-2 mb-40">
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          className="block w-full font-semibold rounded-md p-2  border" />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="block font-semibold w-full rounded-md p-2  border" />
        <button className="bg-[#5bc0be] font-semibold block w-full rounded-md p-2">Register</button>
      </form>
    </div>
  );
}

export default Register;