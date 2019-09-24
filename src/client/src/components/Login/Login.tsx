import React, { useState } from "react";

import { Link, Redirect } from "react-router-dom";
import { Form, Button, Input } from "semantic-ui-react";

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
    <>
      {shouldRedirect && redirect()}
      <h2>Login</h2>
      <p>Who are you?</p>
      {userlist.map(user => (
        <Link key={user.name} to={`/chat/${user.name}`}>
          <Button id={user.name}>{user.name}</Button>
        </Link>
      ))}
      <h3>New user</h3>
      <Form onSubmit={e => submit(e)}>
        <Input
          placeholder={username || "Username"}
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Button type="submit" disabled={username === ""}>
          {username === "" ? "Type a name" : `Proceed as ${username}`}
        </Button>
      </Form>
    </>
  );
};

export default Login;
