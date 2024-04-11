import { useContext, useEffect, useState, useRef } from 'react';
import Logo from '../components/Logo.jsx';
import ChatWindow from '../components/ChatWindow.jsx';
import DefaultChatWindow from '../components/DefaultChatWindow.jsx';
import { UserContext } from '../store/UserContext.jsx';
import axios from 'axios';
import ListPeople from '../components/ListPeople.jsx';

const Home = () => {
  const [wsc, setWsc] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const { contextUsername, id } = useContext(UserContext);
  const latestMessageRef = useRef();

  function handleMessage(e) {
    const messageData = JSON.parse(e.data);

    if ('online' in messageData) {
      setOnlinePeople(messageData?.online);
    } else if ('text' in messageData) {
      if (id !== '') {
        setMessages((prev) => [
          ...prev,
          {
            text: messageData.text,
            messageId: messageData.messageId,
            sender: messageData.sender,
            recipient: messageData.recipient,
            from: messageData.from,
          },
        ]);
      }
    }
  }

  function connectToWebSocket() {
    const wsc = new WebSocket('ws://localhost:3000');
    wsc.addEventListener('message', handleMessage);
    wsc.addEventListener('close', () => {
      console.log('Disconnected. Trying to reconnect.');
      connectToWebSocket();
    }); //comment out incase you dont want to reconnect

    setWsc(wsc);
  }

  useEffect(() => {
    async function getPeople() {
      let people = await axios.get('/people');
      people = people.data.people;

      const current = new Set();
      for (const online of Object.keys(onlinePeople)) {
        current.add(onlinePeople[online]);
      }

      people = people.filter((x) => {
        return !current.has(x.username);
      });
      console.log({ people });
      let obj = {};
      for (let person of people) {
        obj[person.userId] = person.username;
      }
      setOfflinePeople(obj);
      console.log({ offlinePeople });
    }

    console.log({ len: Object.keys(onlinePeople).length });
    if (Object.keys(onlinePeople).length > 0) {
      getPeople();
    }
  }, [onlinePeople]);

  useEffect(() => {
    connectToWebSocket();
  }, [id]);

  return (
    <div className="bg-[#3a506b] h-screen">
      <div className="flex h-full xl:mx-40 text-[#DAF2FE]">
        <div className="bg-[#1c2541] w-1/3">
          <div className="min-w-fit h-full flex flex-col">
            <Logo username={contextUsername.split('@')[0]}></Logo>
            <div>
              <ListPeople
                people={onlinePeople}
                id={id}
                setSelectedUserId={setSelectedUserId}
                selectedUserId={selectedUserId}
                online={true}
              ></ListPeople>
              <ListPeople
                people={offlinePeople}
                id={id}
                setSelectedUserId={setSelectedUserId}
                selectedUserId={selectedUserId}
                online={false}
              ></ListPeople>
            </div>
          </div>
        </div>
        <div className="bg-[#0b132b] w-2/3 border-l-2 border-l-[#3a506b]">
          {selectedUserId === null ? (
            <DefaultChatWindow></DefaultChatWindow>
          ) : (
            <ChatWindow
              wsc={wsc}
              selectedUserId={selectedUserId}
              onlinePeople={onlinePeople}
              messages={messages}
              setMessages={setMessages}
              latestMessageRef={latestMessageRef}
            ></ChatWindow>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
