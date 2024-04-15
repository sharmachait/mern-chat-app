import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../store/UserContext.jsx';
import { uniqBy } from 'lodash';
import Message from './Message.jsx';
import axios from 'axios';
import message from './Message.jsx';
import Image from './Image.jsx';

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
  async function handleFileSend(e) {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const imageBase64 = reader.result.split(',')[1];
      wsc.send(
        JSON.stringify({
          sender: id,
          recipient: selectedUserId,
          file: imageBase64,
          name: file.name,
          type: file.type,
          mimeType: file.type,
        })
      );
    };
  }
  useEffect(() => {
    async function getMessages() {
      const response = await axios.get(`messages/get/${selectedUserId}`);
      if (response.status === 200) {
        const messagesFromDb = response.data.messages;
        setMessages(messagesFromDb);
      }
      return response;
    }
    if (selectedUserId) {
      getMessages();
    }
  }, [selectedUserId]);

  useEffect(() => {
    const div = latestMessageRef.current;
    div.scrollTop = div.scrollHeight;
  }, [messages]);

  const uniqueMessages = uniqBy(messages, 'messageId');
  console.log({ uniqueMessages });
  console.log({ selectedUserId });
  console.log({ id });
  return (
    <div
      ref={latestMessageRef}
      className=" flex flex-col h-full overflow-y-scroll"
    >
      <div className="ml-4 mr-4 p-4 xl:ml-10 flex-grow ">
        {uniqueMessages.length > 0 && (
          <div className="flex flex-col">
            {uniqueMessages.map((x) => {
              if (
                x.text &&
                ((x.sender == selectedUserId && x.recipient == id) ||
                  (x.sender == id && x.recipient == selectedUserId))
              ) {
                return (
                  <div key={x.messageId}>
                    <Message message={x}></Message>
                  </div>
                );
              } else if (
                x.file &&
                ((x.sender == selectedUserId && x.recipient == id) ||
                  (x.sender == id && x.recipient == selectedUserId))
              ) {
                return <Image key={x.messageId} message={x}></Image>;
              }
            })}
          </div>
        )}
      </div>
      <div className="p-4">
        <form className="flex gap-2 ">
          <input
            type="text"
            placeholder="Type a message"
            value={newText}
            onChange={(e) => {
              setNewText(e.target.value);
            }}
            className="p-2 border border-[#3a506b] bg-[#1c2541] rounded-2xl text-[#DAF2FE] w-11/12"
          />
          <label className="text-purple-200 flex flex-row align-middle items-center  cursor-pointer justify-evenly p-2 rounded-full bg-[#3a506b]  w-1/12 min-w-fit">
            <input type="file" className="hidden" onChange={handleFileSend} />
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
                d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
              />
            </svg>
          </label>
          <button
            onClick={handleSend}
            className="flex flex-row align-middle items-center justify-evenly p-2 rounded-full bg-[#3a506b]  w-1/12 min-w-fit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-purple-200"
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
