import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const manejador = new ProductManager();

const router = Router();

// const products = [];

router.get("/", async (req, res) => {
  try {
    const products = await manejador.getProducts();
    console.log(products);
    const { limit } = req.query;

    if (limit) {
      const limitNumber = Number(limit);
      return res.json(products.slice(0, limitNumber));
    } else {
      res.json(products);
    }
  } catch {
    console.error("Error al leer el archivo JSON:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const products = await manejador.getProductById(pid);

    if (!products) {
      return res.json({ error: "Producto no encontrado" });
    }
    res.json(products);
  } catch (error) {
    console.error("Error al obtener el producto", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.post("/", async (req, res) => {
  const nuevoProducto = req.body;

  try {
    await manejador.addProduct(nuevoProducto);
    res.json("Producto agregado exitosamente");
  } catch {
    console.error("Error al agregar producto", error);
    res.status(500).send("Error interno del servidor");
  }

  // {
  //   "title": "Facturas",
  //   "description": "Gran variedad de facturas de crema pastelera, dulce de membrillo y dulce de leche con y sin decoraciones",
  //   "price": 1100,
  //   "img": "https://res.cloudinary.com/dp8auiwtw/image/upload/v1686142069/Panader%C3%ADa%20S%C3%A1nchez/facturastodas_povmah.jpg",
  //   "code": "A16",
  //   "stock": 25,
  //   "category": "dulce"
  // }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const updatedProduct = req.body;
  try {
    await manejador.updateProduct(updatedProduct);
    res.json("Producto actualizado");
  } catch {
    console.error("Error al actualizar producto", error);
    res.status(500).send("Error interno del servidor");
  }

  // {
  //   "title": "Facturas",
  //   "description": "Gran variedad de facturas de crema pastelera, dulce de membrillo y dulce de leche con y sin decoraciones",
  //   "price": 1100,
  //   "img": "https://res.cloudinary.com/dp8auiwtw/image/upload/v1686142069/Panader%C3%ADa%20S%C3%A1nchez/facturastodas_povmah.jpg",
  //   "code": "A17",
  //   "stock": 45,
  //   "category": "dulce"
  // }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    await manejador.deleteProduct(pid);
    res.json("Producto eliminado");
  } catch {
    console.error("Error al leer el archivo JSON:", error);
    res.status(500).send("Error interno del servidor");
  }
});

export default router;
