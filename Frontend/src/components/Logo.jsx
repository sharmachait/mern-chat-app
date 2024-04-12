import React from 'react';

const Logo = ({ username }) => {
  return (
    <div className="flex justify-between border border-l-0 border-r-0 border-t-0 border-b-[#3a506b] pl-4 xl:l-10 p-4">
      <div className="flex gap-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#E9D5FF"
          className="w-6 h-6 font-bold"
        >
          <path
            fillRule="evenodd"
            d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z"
            clipRule="evenodd"
          />
        </svg>
        <div className="text-purple-200 font-bold">A cool name</div>
      </div>

      <div className="flex gap-2 items-center text-xs text-right text-purple-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clipRule="evenodd"
          />
        </svg>
        <div>{username}</div>
      </div>
    </div>
  );
};
export default Logo;
