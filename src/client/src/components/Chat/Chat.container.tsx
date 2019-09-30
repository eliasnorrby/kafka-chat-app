import React from "react";

import { RouteComponentProps } from "react-router-dom";

import User from "types/User";

import Chat from "./Chat";

import { userlist, newUser } from "api/userApiMock";

interface ChatProps {
  id: string;
}

const ChatContainer = ({ match }: RouteComponentProps<ChatProps>) => {
  const name = match.params.id;
  let user: User | undefined = userlist.find(u => u.name === name);

  if (!user) {
    console.log(`User ${name} does not exist`);
    user = newUser(name);
  }
  return <Chat user={user} />;
};

export default ChatContainer;
