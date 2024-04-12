import React from 'react';
import Avatar from './Avatar.jsx';

const ListPeople = ({
  people,
  setSelectedUserId,
  selectedUserId,
  id,
  online,
}) => {
  return (
    <div className={online ? '' : ''}>
      {Object.keys(people).map((userId) =>
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
            <div
              className={
                'flex gap-4 items-center pl-4 xl:l-10 p-4 ' +
                (online ? 'text-purple-200' : 'text-gray-500')
              }
            >
              <Avatar
                online={online}
                username={people[userId]}
                userId={userId}
              ></Avatar>
              <span>{people[userId].split('@')[0]}</span>
            </div>
          </div>
        ) : (
          ''
        )
      )}
    </div>
  );
};
export default ListPeople;
