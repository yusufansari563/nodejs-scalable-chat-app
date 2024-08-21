// import mongo from "./core/mongo-client";
import redis from "./core/redis-client";
import express from "express";
import bodyParser from "body-parser";
import SocketService from "./core/socket";
import { startMessageConsumer } from "./core/kafka";
import { init as promClient } from './core/prom-client';

const app = express();
promClient(app);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

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

  socketService.initListeners();
}

init();
