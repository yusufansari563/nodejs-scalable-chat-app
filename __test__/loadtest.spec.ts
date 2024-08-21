import { Server } from 'socket.io';


async function init() {
    for (let index = 0; index < 1000; index++) {
        const socket = new Server(4555,{
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            },
        });
        const randomString = Math.random().toString();
        socket.emit("event:message", { message: randomString });
    }
}

init();

