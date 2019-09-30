import openSocket from "socket.io-client";

let socket;

const log = msg => {
  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  console.log(`CHAT_API [${time}]: ${msg}`);
};

const joinChat = (
  user,
  messageCallback,
  userListCallback,
  userEventCallback,
) => {
  socket = openSocket("http://localhost:8000");
  socket.emit("joinChat", user);
  subscribeToMessages(user, messageCallback);
  subscribeToUserList(user, userListCallback);
  subscribeToUserEvents(user, userEventCallback);

  const eventsToLog = [
    "connect_error",
    "connect_timeout",
    "reconnect",
    "reconnecting",
    "reconnect_attempt",
    "reconnect_error",
    "disconnect",
    "error",
  ];

  eventsToLog.map(event =>
    socket.on(event, arg => log(`NEW_EVENT: '${event}', arg: ${arg}`)),
  );
};

const leaveChat = user => {
  log(`Unsubscribing ${user.name} from all the stuff.`);
  socket.disconnect();
};

const reconnectToChat = user => {
  log(`Reconnecting ${user.name} to the chat.`);
  socket.connect();
  socket.emit("joinChat", user);
};

const subscribeToMessages = (user, callback) => {
  log(`Subscribing ${user.name} client to new messages`);

  socket.on("newMessage", msg => {
    callback(null, msg);
  });
};

const subscribeToUserList = (user, callback) => {
  socket.on("updateUsers", users => {
    callback(null, users);
  });
};

const subscribeToUserEvents = (user, callback) => {
  log(`Subscribing ${user.name} client to user events`);

  socket.on("userJoinedChat", name => {
    callback(null, name, "joined");
  });

  socket.on("userLeftChat", name => {
    callback(null, name, "left");
  });
};

const dispatchMessage = msg => {
  log("Emitting sendMessage event...");
  socket.emit("sendMessage", msg);
};

export { joinChat, leaveChat, reconnectToChat, dispatchMessage };
