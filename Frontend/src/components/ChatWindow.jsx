import React, { useState } from 'react';

const ChatWindow = ({ wsc, selectedUserId }) => {
  const [newText, setNewText] = useState('');
  async function handleSend(e) {
    e.preventDefault();
    console.log(
      JSON.stringify({
        message: {
          recipient: selectedUserId,
        },
      })
    );
    // wsc.send(
    //   JSON.stringify({
    //     message: {
    //       recipient: selectedUserId,
    //     },
    //   })
    // );
  }

  return (
    <div className="ml-4 xl:ml-10 flex flex-col h-full">
      <div className="flex-grow">messages</div>
      <div className="pb-4 pr-2">
        <form className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message"
            value={newText}
            onChange={(e) => {
              setNewText(e.target.value);
            }}
            className="p-2 border border-[#DAF2FE] bg-[#1c2541] rounded-2xl text-[#DAF2FE] w-11/12"
          />
          <button
            onClick={handleSend}
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
  );
};
export default ChatWindow;
