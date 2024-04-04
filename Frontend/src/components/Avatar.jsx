const Avatar = ({ username, userId }) => {
  return (
    <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center  text-[#0b132b]">
      <div className="text-center w-full">
        {String(username[0]).toUpperCase()}
      </div>
    </div>
  );
};
export default Avatar;
