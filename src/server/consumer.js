const kafka = require("kafka-node");
const Client = kafka.KafkaClient;
const client = new Client();
const topic = "chat_messages";

const Consumer = kafka.Consumer;

const options = {
  fromOffset: true,
};

const consumer = new Consumer(
  client,
  [
    {
      topic: topic,
      offset: 0,
    },
  ],
  options,
);

consumer.on("message", message => {
  console.log(message);
});

consumer.on("error", error => {
  console.log("Error: ", error);
});
