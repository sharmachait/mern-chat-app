import React from 'react';

const Logo = ({ username }) => {
  return (
    <div className="flex gap-2 items-center border border-l-0 border-r-0 border-t-0 border-b-[#3a506b] pl-4 xl:l-10 p-4">
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
      <div className="text-xs flex-1 text-right">{username}</div>
    </div>
  );
};
export default Logo;
