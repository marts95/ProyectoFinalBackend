import express from "express";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";
import exphbs from "express-handlebars";
import { Server } from "socket.io";
import "./database.js";

const app = express();
const PUERTO = 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

//Handlebars
app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PUERTO, () =>
  console.log(`Escuchando servidor en http://localhost:${PUERTO}`)
);

import MessageModel from "./models/messages.model.js";

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");

  socket.on("message", async (data) => {
    await MessageModel.create(data);

    const messages = await MessageModel.find();
    console.log(messages);
    io.sockets.emit("messagesLogs", messages);
  });
});
