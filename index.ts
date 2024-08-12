// import mongo from "./core/mongo-client";
import redis from "./core/redis-client";
import express from "express";
import bodyParser from "body-parser";
import SocketService from "./core/socket";
import { startMessageConsumer } from "./core/kafka";

const app = express();

app.set("view engine", "ejs");
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const mongoConn = mongo();

const redisConn = redis();

async function init() {
  startMessageConsumer();
  const socketService = new SocketService();

  
  const server = app.listen("4555", () => {
    console.log("server started at 4555");
  });
  socketService.io.attach(server);
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.post("/submit", (req, res) => {
    const data = req.body.data;
    res.send(data); // Send back the submitted data
  });

  app.get("/ping", (req, res) => {
    res.send({
      msg: "pong",
    });
  });

  // io.on('connection', (socket) => {
  //   console.log('A user connected');
  
  //   socket.on('submitData', (data) => {
  //     console.log('Received data:', data);
  //     socket.emit('responseData', `Received: ${data}`);
  //   });
  
  //   socket.on('disconnect', () => {
  //     console.log('User disconnected');
  //   });
  // });

  socketService.initListeners();
}

init();
