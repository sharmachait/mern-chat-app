const Avatar = ({ username, userId, online }) => {
  return (
    <div
      className={
        'w-8 h-8 relative  rounded-full flex items-center  text-[#0b132b] ' +
        (online ? 'bg-purple-200' : 'bg-gray-500')
      }
    >
      <div className="text-center w-full ">
        {String(username[0]).toUpperCase()}
      </div>
      {online ? (
        <div className="absolute w-3 h-3 rounded-full bg-green-500 left-6 top-5 border border-black border-1"></div>
      ) : (
        <div className="absolute w-3 h-3 rounded-full bg-gray-400 left-6 top-5 border border-black border-1"></div>
      )}
    </div>
  );
};
export default Avatar;
