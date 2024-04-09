import { useContext } from 'react';
import { UserContext } from '../store/UserContext.jsx';

const Message = ({ message, onlinePeople }) => {
  const { id } = useContext(UserContext);
  console.log(id);
  if (message.sender === id) {
    return (
      <div className="flex justify-end">
        <div
          className={
            'text-xl font-bold py-2 pl-3 pr-1 rounded-2xl w-fit min-w-14 max-w-96 mb-2 bg-purple-200 text-[#0b132b]'
          }
        >
          {message.text}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-start">
        <div>
          <div
            className="text-xs

                      opacity-50
                      text-[#6fffe9]
                      w-fit
                      p-1
                      rounded-full"
          >
            {message.from.split('@')[0]}
          </div>
          <div
            className={
              'text-xl font-bold py-2 pl-3 pr-1 rounded-2xl max-w-96 w-fit min-w-14 mb-2 bg-[#6fffe9] opacity-85 text-[#0b132b] '
            }
          >
            {message.text}
          </div>
        </div>
      </div>
    );
  }
};
export default Message;
