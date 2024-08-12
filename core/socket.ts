import { Server as _Server } from 'socket.io';
import redis from './redis-client';
import { produceMessage } from './kafka';
const pub = redis();
const sub = redis();

class socketService {
  private _io: _Server;
  constructor() {
    console.log("Init Socket Service...");
    this._io = new _Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("MESSAGES");
  }

  initListeners() {
    const io = this.io;
    console.log("init socket listeners ....");

    io.on("connect", (socket) => {
      console.log(`New Socket Connected`, socket.id);
      socket.on("event:message", async (message) => {
        console.log("New Message Rec.", message);
        // publish this message to redis
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    sub.on("message", async (channel, message) => {
      if (channel === "MESSAGES") {
        console.log("new message from redis", message);
        io.emit("message", message);
          await produceMessage(message);
        console.log("Message Produced to Kafka Broker");
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default socketService;