import React, { useContext, useState } from "react";
import ChatContext from "../../context/ChatContext";

const Message = ({ message }) => {
  const [isSpanVisible, setIsSpanVisible] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { data } = useContext(ChatContext);

  const dateTime = message.date.toDate();
  const day = dateTime.getDate().toString().padStart(2, "0");
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
  const year = dateTime.getFullYear().toString().substr(-2); // Get the last 2 digits of the year
  const hours = dateTime.getHours().toString().padStart(2, "0");
  const minutes = dateTime.getMinutes().toString().padStart(2, "0");
  const seconds = dateTime.getSeconds().toString().padStart(2, "0");

  const handleSpanClick = () => {
    setIsSpanVisible(!isSpanVisible);
  };

  return (
    <div
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <span>
          {message.senderId === currentUser.uid
            ? currentUser.displayName
            : data.user.displayName}
        </span>
      </div>
      <div className="messageContent">
        <span className="messageSpan" onClick={handleSpanClick}>
          {message.text}
          {"\n"}
          {isSpanVisible && (
            <span className="messageInfoTime">
              {hours +
                ":" +
                minutes +
                ":" +
                seconds +
                ", " +
                day +
                "/" +
                month +
                "/" +
                year}
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default Message;
