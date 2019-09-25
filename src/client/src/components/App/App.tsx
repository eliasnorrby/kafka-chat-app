import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Chat from "components/Chat";
import Login from "components/Login";
import NotFound from "components/NotFound";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/chat/:id" component={Chat} />
        <Route path="/login" component={Login} />
        <Route path="/not-found" component={NotFound} />
        <Redirect path="/" to="/login" />
      </Switch>
    </Router>
  );
};

export default App;
