import { useState, useEffect } from "react";
import Message from "types/Message";

import { joinChat, leaveChat, dispatchMessage } from "api/chatApiMock";

import User from "types/User";

interface Chat {
  message: Message;
  setMessage: React.Dispatch<React.SetStateAction<Message>>;
  sendMessage: () => void;
  messages: Message[];
  users: User[];
}

const useChat = (user: User, notify: (notification: string) => void): Chat => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<Message>({
    message: "",
    author: user,
    timestamp: Date.now(),
  });
  const [users, setUsers] = useState<User[]>([]);

  const messageCallback = (err: Error, msg: Message) => {
    if (err) console.log("There was an error: ", err);
    setMessages(msgs => msgs.concat(msg));
  };

  const userListCallback = (err: Error, newList: User[]) => {
    if (err) console.trace("There was an error: ", err);
    console.log("New list of users: ", newList);
    setUsers(newList);
  };

  const userEventCallback = (err: Error, name: string, action: string) => {
    if (err) console.trace("There was an error: ", err);
    notify(`${name} ${action} the chat!`);
  };

  const sendMessage = () => {
    console.log("Message: ", message);
    if (message.message === "") return;
    dispatchMessage({ ...message, timestamp: Date.now() });
    setMessage({ ...message, message: "" });
  };

  useEffect(() => {
    joinChat(user, messageCallback, userListCallback, userEventCallback);
    return () => leaveChat(user);
  }, [user]);

  const chat = { message, setMessage, sendMessage, messages, users };

  return chat;
};

export default useChat;
