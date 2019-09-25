import React, { useState } from "react";

import { Link, Redirect } from "react-router-dom";
import { Form, Button, Container, Grid } from "semantic-ui-react";

import { userlist } from "api/userApiMock";

const Login = () => {
  const [username, setUsername] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const redirect = () => {
    return <Redirect to={`/chat/${username}`} />;
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "") return;
    else setShouldRedirect(true);
  };

  return (
    <Container textAlign="center">
      {shouldRedirect && redirect()}
      <h2>Login</h2>
      <p>Who are you?</p>
      {userlist.map(user => (
        <Link key={user.name} to={`/chat/${user.name}`}>
          <Button id={user.name}>{user.name}</Button>
        </Link>
      ))}
      <h3>New user</h3>
      <Grid>
        <Grid.Row centered>
          <Form onSubmit={e => submit(e)}>
            <Form.Group>
              <Form.Input
                placeholder={username || "Username"}
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <Form.Button
                disabled={username === ""}
                content={
                  username === "" ? "Type a name" : `Proceed as ${username}`
                }
                width={10}
              />
            </Form.Group>
          </Form>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Login;
