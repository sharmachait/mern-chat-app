import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../store/UserContext.jsx';
import { uniqBy } from 'lodash';
import Message from './Message.jsx';

const ChatWindow = ({
  wsc,
  selectedUserId,
  messages,
  setMessages,
  onlinePeople,
  latestMessageRef,
}) => {
  const [newText, setNewText] = useState('');
  const { id } = useContext(UserContext);
  async function handleSend(e) {
    e.preventDefault();
    wsc.send(
      JSON.stringify({
        sender: id,
        recipient: selectedUserId,
        text: newText,
      })
    );
    setNewText('');
  }

  useEffect(() => {
    const div = latestMessageRef.current;
    div.scrollTop = div.scrollHeight;
  }, [messages]);

  const uniqueMessages = uniqBy(messages, 'messageId');

  return (
    <div
      ref={latestMessageRef}
      className="ml-4 mr-4 p-4 xl:ml-10 flex flex-col h-full overflow-y-scroll"
    >
      <div className="flex-grow">
        {uniqueMessages.length > 0 && (
          <div className="flex flex-col">
            {uniqueMessages.map((x) => (
              <Message
                key={x.messageId}
                message={x}
                onlinePeople={onlinePeople}
              ></Message>
            ))}
          </div>
        )}
      </div>
      <div>
        <form className="flex gap-2 ">
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
