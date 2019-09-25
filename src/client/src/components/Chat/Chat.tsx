import React from "react";
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
  List,
} from "semantic-ui-react";

import { toast, ToastContainer } from "react-toastify";

import User from "types/User";

import useChat from "hooks/useChat";

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
      <Container textAlign="left">
        <Header as="h2">Online users</Header>
        <List relaxed>
          {users.map(u => (
            <List.Item key={u.id}>
              <Label color="green" as="a" image>
                <img alt="avatar" src={u.avatar} />
                {u.name}
              </Label>
            </List.Item>
          ))}
        </List>
      </Container>
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
