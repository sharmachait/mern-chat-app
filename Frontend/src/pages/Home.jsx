import { useContext, useEffect } from 'react';
// import { UserContext } from '../store/UserContext.jsx';

const Home = () => {
  // const { contextUsername } = useContext(UserContext);
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
  }, []);
  async function handleClick(e) {
    e.preventDefault();
  }

  return (
    <div className="bg-[#3a506b] h-screen">
      <div className="flex h-full xl:mx-40 text-[#DAF2FE]">
        <div className="bg-[#1c2541] w-1/3">
          <div className="ml-4 xl:ml-10 min-w-fit h-full flex flex-col">
            <div>contacts</div>
          </div>
        </div>
        <div className="bg-[#0b132b] w-2/3">
          <div className="ml-4 xl:ml-10 flex flex-col h-full">
            <div className="flex-grow">messages</div>
            <div className="pb-4 pr-2">
              <form className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message"
                  className="p-2 border border-[#DAF2FE] bg-[#1c2541] rounded-2xl text-[#DAF2FE] w-11/12"
                />
                <button
                  onClick={handleClick}
                  className="flex flex-row align-middle items-center justify-evenly p-2 border border-[#DAF2FE] rounded-full bg-[#3a506b] text-[#DAF2FE] w-1/12 min-w-fit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
