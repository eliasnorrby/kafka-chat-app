import React, { useState } from "react";
import {
  Container,
  Header,
  Form,
  Input,
  Button,
  Comment,
  Divider,
  Grid,
  Label,
} from "semantic-ui-react";

import { toast, ToastContainer } from "react-toastify";

import User from "types/User";
import Message from "types/Message";

import useChat from "hooks/useChat";

import { newUser } from "api/userApiMock";

interface ChatProps {
  user: User;
}

const formatDate = (epoch: number) => new Date(epoch).toDateString();

const Chat = ({ user }: ChatProps) => {
  const notify = (msg: string) => toast(msg);

  const { name } = user;
  const { messages, message, setMessage, sendMessage, users } = useChat(
    user,
    notify,
  );

  /* const messages: Message[] = [];
   * const [message, setMessage] = useState({
   *   message: "",
   *   author: user,
   *   timestamp: Date.now(),
   * });
   * const sendMessage = () => console.log("Message: ", message);
   * const users: User[] = [newUser("Bob"), newUser("Alice")];
   */
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };

  const updateMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage({ ...message, message: e.target.value });
  };

  const renderChatBox = () => {
    return (
      <>
        <Header as="h2">Chat</Header>
        <Form onSubmit={e => submit(e)}>
          <Input
            type="text"
            value={message.message}
            onChange={e => updateMessage(e)}
          />
          <Button type="submit">Send</Button>
        </Form>
        <Container textAlign="left">
          <Header as="h3">Messages</Header>
          <Comment.Group>
            {messages.map(m => (
              <Comment key={m.timestamp}>
                <Comment.Avatar src={m.author.avatar} />
                <Comment.Content>
                  <Comment.Author as="a">{m.author.name}</Comment.Author>
                  <Comment.Metadata>
                    <div>{formatDate(m.timestamp)}</div>
                  </Comment.Metadata>
                  <Comment.Text>{m.message}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}
          </Comment.Group>
        </Container>
      </>
    );
  };

  const renderUserList = () => {
    return (
      <>
        <Header as="h2">Online users</Header>
        {users.map(u => (
          <div key={u.id}>
            <Label as="a" image>
              <img alt="avatar" src={u.avatar} />
              {u.name}
            </Label>
            <br />
          </div>
        ))}
      </>
    );
  };

  return (
    <Container textAlign="center">
      <ToastContainer />
      <Header as="h2">Welcome {name}!</Header>
      <Divider />
      <Grid divided>
        <Grid.Column width={5}>{renderUserList()}</Grid.Column>
        <Grid.Column width={11}>{renderChatBox()}</Grid.Column>
      </Grid>
    </Container>
  );
};

export default Chat;
