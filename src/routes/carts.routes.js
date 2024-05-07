import { Router } from "express";
import Carts from "../controllers/Carts.js";

const nuevoCart = new Carts();

const router = Router();

router.get("/", async (req, res) => {
  const carts = await nuevoCart.getCarts();
  res.json(carts);
});

router.post("/", async (req, res) => {
  try {
    const carts = await nuevoCart.createCart();
    res.json(carts);
  } catch {
    console.error("Error al crear carrito", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const carts = await nuevoCart.getCartById(cid);
    res.json(carts.products);
  } catch {
    console.error("Error al obtener carrito", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const quantity = req.body.quantity || 1;

  try {
    const carts = await nuevoCart.addProductInCart(cid, pid, quantity);
    res.json(carts.products);
  } catch {
    console.error("Error al agregar productos", error);
    res.status(500).send("Error interno del servidor");
  }
});

export default router;
