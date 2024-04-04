import { useContext, useEffect, useState } from 'react';
import Avatar from '../components/Avatar.jsx';
import Logo from '../components/Logo.jsx';
import { UserContext } from '../store/UserContext.jsx';
import ChatWindow from '../components/ChatWindow.jsx';
import DefaultChatWindow from '../components/DefaultChatWindow.jsx';
// import { UserContext } from '../store/UserContext.jsx';

const Home = () => {
  const [wsc, setWsc] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  // const { contextUsername } = useContext(UserContext);
  const { contextUsername, id } = useContext(UserContext);
  function handleMessage(e) {
    const messageData = e.data;
    setOnlinePeople(JSON.parse(messageData)['online']);
    console.log(JSON.parse(messageData)['online']);
  }
  useEffect(() => {
    const wsc = new WebSocket('ws://localhost:3000');
    setWsc(wsc);

    wsc.addEventListener('message', handleMessage);
  }, []);

  return (
    <div className="bg-[#3a506b] h-screen">
      <div className="flex h-full xl:mx-40 text-[#DAF2FE]">
        <div className="bg-[#1c2541] w-1/3">
          <div className="min-w-fit h-full flex flex-col">
            <Logo username={contextUsername.split('@')[0]}></Logo>
            <div>
              {Object.keys(onlinePeople).map((userId) =>
                userId !== id ? (
                  <div
                    onClick={() => {
                      setSelectedUserId(userId);
                    }}
                    className={
                      'flex border border-l-0 border-r-0 border-t-0 border-b-[#3a506b] cursor-pointer ' +
                      (userId === selectedUserId ? 'bg-[#0b132b]' : '')
                    }
                    key={userId}
                  >
                    {userId === selectedUserId && (
                      <div className="border-2 h-16 rounded-r-xl"></div>
                    )}
                    <div className="flex gap-4 items-center pl-4 xl:l-10 p-4">
                      <Avatar
                        username={onlinePeople[userId]}
                        userId={userId}
                      ></Avatar>
                      <span>{onlinePeople[userId].split('@')[0]}</span>
                    </div>
                  </div>
                ) : (
                  ''
                )
              )}
            </div>
          </div>
        </div>
        <div className="bg-[#0b132b] w-2/3 border-l-2 border-l-[#3a506b]">
          {selectedUserId === null ? (
            <DefaultChatWindow></DefaultChatWindow>
          ) : (
            <ChatWindow wsc={wsc} selectedUserId={selectedUserId}></ChatWindow>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
