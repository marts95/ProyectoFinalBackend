import express from "express";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";
import exphbs from "express-handlebars";
import { Server } from "socket.io";

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

const io = new Server(httpServer);

import ProductManager from "./controllers/ProductManager.js";
const manejador = new ProductManager("./src/models/productos.json");

io.on("connection", async (socket) => {
  console.log("Un cliente conectado");

  socket.emit("productos", await manejador.getProducts());

  socket.on("eliminarProducto", async (id) => {
    await manejador.deleteProduct(id);
    socket.emit("productos", await manejador.getProducts());
  });

  socket.on("agregarProducto", async (producto) => {
    await manejador.addProduct(producto);
    socket.emit("productos", await manejador.getProducts());
  });
});