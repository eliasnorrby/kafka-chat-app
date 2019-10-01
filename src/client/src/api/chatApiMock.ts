import openSocket from "socket.io-client";
import User from "types/User";
import Message from "types/Message";

let socket: SocketIOClient.Socket;

const log = (msg: string) => {
  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  console.log(`CHAT_API [${time}]: ${msg}`);
};

const joinChat = (
  user: User,
  messageCallback: (err: Error | null, msg: Message) => void,
  userListCallback: (err: Error | null, users: User[]) => void,
  userEventCallback: (err: Error | null, name: string, event: string) => void,
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
    socket.on(event, (arg: string) =>
      log(`NEW_EVENT: '${event}', arg: ${arg}`),
    ),
  );
};

const leaveChat = (user: User) => {
  log(`Unsubscribing ${user.name} from all the stuff.`);
  socket.disconnect();
};

const reconnectToChat = (user: User) => {
  log(`Reconnecting ${user.name} to the chat.`);
  socket.connect();
  socket.emit("joinChat", user);
};

const subscribeToMessages = (
  user: User,
  callback: (err: Error | null, msg: Message) => void,
) => {
  log(`Subscribing ${user.name} client to new messages`);

  socket.on("newMessage", (msg: Message) => {
    callback(null, msg);
  });
};

const subscribeToUserList = (
  user: User,
  callback: (err: Error | null, users: User[]) => void,
) => {
  log(`Subscribing ${user.name} client to userList`);

  socket.on("updateUsers", (users: User[]) => {
    callback(null, users);
  });
};

const subscribeToUserEvents = (
  user: User,
  callback: (err: Error | null, name: string, event: string) => void,
) => {
  log(`Subscribing ${user.name} client to user events`);

  socket.on("userJoinedChat", (name: string) => {
    callback(null, name, "joined");
  });

  socket.on("userLeftChat", (name: string) => {
    callback(null, name, "left");
  });
};

const dispatchMessage = (msg: Message) => {
  log("Emitting sendMessage event...");
  socket.emit("sendMessage", msg);
};

export { joinChat, leaveChat, reconnectToChat, dispatchMessage };
