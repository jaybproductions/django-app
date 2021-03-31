import React, { useState, useEffect } from "react";

const Room = (props) => {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [roomCode, setRoomCode] = useState(props.match.params.roomCode);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    getRoomDetails();
  });

  const getRoomDetails = () => {
    fetch(`/api/get-room?code=${roomCode}`)
      .then((response) => response.json())
      .then((data) => {
        setGuestCanPause(data.guest_can_pause);
        setVotesToSkip(data.votes_to_skip);
        setIsHost(data.is_host);
      });
  };

  return (
    <div className="room">
      <h3>{roomCode}</h3>
      <p>
        {votesToSkip} -- {guestCanPause.toString()} -- {isHost.toString()}
      </p>
    </div>
  );
};

export default Room;
