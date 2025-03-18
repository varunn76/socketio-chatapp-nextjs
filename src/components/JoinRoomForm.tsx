import React from "react";

const JoinRoomForm = ({
  userName,
  room,
  setUserName,
  setRoom,
  onJoin,
}: {
  userName: string;
  room: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  onJoin: () => void;
}) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-semibold mb-4">Join a Room</h1>
      <input
        type="text"
        placeholder="Enter Your Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="w-64 px-4 py-2 mb-3 border rounded-lg"
      />
      <input
        type="text"
        placeholder="Enter Room Name"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        className="w-64 px-4 py-2 mb-3 border rounded-lg"
      />
      <button
        onClick={onJoin}
        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Join Room
      </button>
    </div>
  );
};

export default JoinRoomForm;
