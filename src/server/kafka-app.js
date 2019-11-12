const kafka = require("kafka-node");
const Client = kafka.KafkaClient;
const client = new Client();
const topic = "chat_messages";

const Producer = kafka.Producer;
const producer = new Producer(client);

var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

const connections = {};

const log = msg => {
  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  console.log(`SERVER [${time}]: ${msg}`);
};

const getUsers = () => {
  return Object.keys(connections).map(id => connections[id]);
};

producer.on("ready", () => {
  io.on("connection", client => setupSocketEvents(client));
});

producer.on("error", err => {
  log(`PRODUCER ERROR: ${err}`);
});

const setupSocketEvents = client => {
  log("A client connected!");

  client.on("joinChat", user => {
    log(`User ${user.name} joined the chat`);

    log(`USERS BEFORE: ${getUsers().length}`);
    connections[client.id] = user;
    log(`USERS AFTER: ${getUsers().length}`);

    client.broadcast.emit("userJoinedChat", user.name);
    io.emit("updateUsers", getUsers());
  });

  client.on("leaveChat", user => {
    log(`User ${user.name} left the chat`);

    client.broadcast.emit("userLeftChat", user.name);
    io.emit("updateUsers", getUsers());
  });

  client.on("disconnect", reason => {
    log(`A client disconnected! Reason: ${reason}`);
    const name = connections[client.id]
      ? connections[client.id].name
      : "UNKNOWN";

    log(`User ${name} left the chat`);

    log(`USERS BEFORE: ${getUsers().length}`);
    delete connections[client.id];
    log(`USERS AFTER: ${getUsers().length}`);

    client.broadcast.emit("userLeftChat", name);
    io.emit("updateUsers", getUsers());
  });

  client.on("sendMessage", msg => {
    const { author, message } = msg;
    log(`User ${author.name} sent message "${message}"`);
    io.emit("newMessage", msg);

    producer.send(
      [{ topic, messages: [JSON.stringify(msg)] }],
      (err, result) => {
        err && console.log(err);
      },
    );
  });
};

const port = 8000;

http.listen(port, () => {
  log(`listening on *:${port}`);
});
