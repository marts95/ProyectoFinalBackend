import express from "express";
import ProductManager from "../controllers/ProductManager.js";

const router = express.Router();

const manejador = new ProductManager("./src/models/productos.json");

router.get("/", async (req, res) => {
  try {
    const productos = await manejador.getProducts();

    res.render("home.hbs", { productos });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts.hbs");
});

export default router;
