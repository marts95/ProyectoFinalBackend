import express from "express";
import ProductManager from "../controllers/ProductManager.js";

const router = express.Router();

const manejador = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const productos = await manejador.getProducts();

    res.render("home.hbs", { productos });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/chat", (req, res) => {
  res.render("chat.hbs");
});

export default router;
