import openSocket from "socket.io-client";

let socket;

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
};

const leaveChat = user => {
  console.log(`Unsubscribing ${user.name} from all the stuff.`);
  socket.disconnect();
};

const subscribeToMessages = (user, callback) => {
  console.log(`Subscribing ${user.name} client to new messages`);

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
  console.log(`Subscribing ${user.name} client to user events`);

  socket.on("userJoinedChat", name => {
    callback(null, name, "joined");
  });

  socket.on("userLeftChat", name => {
    callback(null, name, "left");
  });
};

const dispatchMessage = msg => {
  console.log("Emitting sendMessage event...");
  socket.emit("sendMessage", msg);
};

export { joinChat, leaveChat, dispatchMessage };
