var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

const connections = {};

const getUsers = () => {
  return Object.keys(connections).map(id => connections[id]);
};

io.on("connection", client => {
  console.log("A client connected!");

  client.on("joinChat", user => {
    console.log(`User ${user.name} joined the chat`);

    connections[client.id] = user;

    client.broadcast.emit("userJoinedChat", user.name);
    io.emit("updateUsers", getUsers());
  });

  client.on("disconnect", () => {
    console.log("A client disconnected!");
    const name = connections[client.id]
      ? connections[client.id].name
      : "UNKNOWN";

    console.log(`User ${name} left the chat`);

    const usersBefore = getUsers();
    console.log(`LENGTH BEFORE: `, usersBefore.length);
    delete connections[client.id];
    const usersAfter = getUsers();
    console.log(`LENGTH AFTER: `, usersAfter.length);

    client.broadcast.emit("userLeftChat", name);
    io.emit("updateUsers", usersAfter);
  });

  client.on("sendMessage", msg => {
    const { author, message } = msg;
    console.log(`User ${author.name} sent message "${message}"`);
    io.emit("newMessage", msg);
  });
});

const port = 8000;

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
