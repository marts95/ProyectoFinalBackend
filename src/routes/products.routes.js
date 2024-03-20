import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const nuevoProductManager = new ProductManager("./src/models/productos.json");

const router = Router();

// const products = [];

router.get("/", async (req, res) => {
  try {
    const products = await nuevoProductManager.getProducts();
    console.log(products);
    const { limit } = req.query;

    if (limit) {
      const limitNumber = Number(limit);
      return res.send(products.slice(0, limitNumber));
    } else {
      res.json(products);
    }
  } catch {
    console.error("Error al leer el archivo JSON:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const products = await nuevoProductManager.getProducts();
    const { pid } = req.params;

    const producto = products.find((prod) => prod.id === Number(pid));
    if (producto) {
      return res.json(producto);
    }

    res.json({ error: "Producto no encontrado" });
  } catch {
    console.error("Error al leer el archivo JSON:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.post("/", async (req, res) => {
  try {
    const products = await nuevoProductManager.getProducts();
    const { id, title, description, code, price, status, stock, category } =
      req.body;

    const { pid } = req.params;
    const product = products.find((prod) => prod.id === Number(pid));

    if (products.length === 0) {
      product.id = 1;
    } else {
      products.push({
        id: products.length + 1,
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
      });

      res.json({
        product: {
          title,
          description,
          code,
          price,
          status,
          stock,
          category,
        },
      });
      
    }

    nuevoProductManager.saveFile(products);

  } catch {
    console.error("Error al leer el archivo JSON:", error);
    res.status(500).send("Error interno del servidor");
  }

  //Fede te dejo los objetos para que copies y pegues para probar si se agregan
  //     {
  //     "title": "Cañoncitos",
  //     "description": "Con relleno de dulce de leche",
  //     "code": "A4",
  //     "price": 3500,
  //     "stock": 18,
  //     "category": "dulce"
  // }
  // {
  //     "title": "Chipaquitos",
  //     "description": "No apto para vegetarianos",
  //     "code": "A4",
  //     "price": 1600,
  //     "stock": 12,
  //     "category": "salado"
  // }
});

router.put("/:pid", async (req, res) => {
  try {
    const products = await nuevoProductManager.getProducts();
    const { pid } = req.params;

    const index = products.findIndex((prod) => prod.id === Number(pid));

    const { title, description, code, price, status, stock, category } =
      req.body;

    if (index == -1) {
      return res.json({ error: "Producto no encontrado" });
    }

    products[index] = {
      id: Number(pid),
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
    };

    res.json({
      product: {
        id: Number(pid),
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
      },
    });
    nuevoProductManager.saveFile(products);
  } catch {
    console.error("Error al leer el archivo JSON:", error);
    res.status(500).send("Error interno del servidor");
  }
  // {
  //     "title": "Chipaquitos",
  //     "description": "No apto para vegetarianos",
  //     "code": "A6",
  //     "price": 1600,
  //     "stock": 12,
  //     "category": "salado"
  // }
});

router.delete("/:pid", async (req, res) => {
try{
 const products = await nuevoProductManager.getProducts();
   const { pid } = req.params;

  const index = products.findIndex((user) => user.id === Number(pid));

  if (index === -1) {
    res.json({
      error: "Usuario no encontrado",
    });
  }

  products.splice(index, 1);

  res.json({
    status: "Usuario eliminado",
  });

  nuevoProductManager.saveFile(products);
}catch{
   console.error("Error al leer el archivo JSON:", error);
   res.status(500).send("Error interno del servidor");
}
});

export default router;
