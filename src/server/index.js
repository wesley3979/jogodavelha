const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();
app.use(cors());

// Config JSON response
app.use(express.json());

const routes = require("./routes");
routes(app);

const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        credentials: true,
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", async (socket) => {
    console.log("A client connected!");

    socket.on("EnterGame", (data) => {
        socket.broadcast.emit("EnterGame", data);
    });

    socket.on("EndGame", (data) => {
        socket.broadcast.emit("EndGame", data);
    });

    socket.on("PlayGame", (data) => {
        socket.broadcast.emit("PlayGame", data);
    });

    socket.on("disconnect", () => {
        console.log("usuário desconectado");
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
