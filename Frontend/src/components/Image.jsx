import { useContext } from 'react';
import { UserContext } from '../store/UserContext.jsx';
const Image = ({ message }) => {
  const { id } = useContext(UserContext);
  console.log(id);
  if (message.sender === id) {
    return (
      <div className="flex justify-end">
        <div
          className={
            'text-xl font-bold py-1 pl-1 pr-1 rounded-2xl w-fit min-w-14 max-w-96 mb-2 bg-purple-200 text-[#0b132b]'
          }
        >
          <img
            className="rounded-2xl max-h-96"
            // src={'http://localhost:3000/uploads/' + message.file}
            src={message.urlOnAzure}
            alt=""
          />
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
              'text-xl font-bold py-1 pl-1 pr-1 rounded-2xl w-fit min-w-14 max-w-96 mb-2 bg-[#6fffe9] text-[#0b132b]'
            }
          >
            <img
              className="rounded-2xl max-h-96"
              // src={'http://localhost:3000/uploads/' + message.file}
              src={message.urlOnAzure}
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }
};
export default Image;
