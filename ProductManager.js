const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;

    if (fs.existsSync(path)) {
      try {
        let products = fs.readFileSync(path, "utf-8");
        this.products = JSON.parse(products);
      } catch (error) {
        this.products = [];
      }
    } else {
      this.products = [];
    }
  }

  async saveFile(product) {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(product, null, "\t")
      );
      return true;
    } catch (error) {
      console.log(`Hubo un error: ${error}`);
      return;
    }
  }

  async addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.code ||
      !product.thumbnail ||
      !product.stock
    ) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some((prod) => prod.code === product.code)) {
      console.log("Ya existe un producto con ese código");
      return;
    }

    if (this.products.length === 0) {
      product.id = 1;
    } else {
      product.id = this.products[this.products.length - 1].id + 1;
    }

    this.products.push(product);

    const respuesta = await this.saveFile(this.products);

    if (respuesta) {
      console.log("Producto creado");
    } else {
      console.log(`Hubo un error al crear el producto`);
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);

    if (product) {
      return product;
    } else {
      return console.log("Not found");
    }
  }

  async updateProduct(id, campo, value) {
    const productId = this.products.findIndex((product) => product.id === id);

    if (productId === -1) {
      console.log("Producto no encontrado");
      return;
    }

    this.products[productId][campo] = value;

    const respuesta = await this.saveFile(this.products);

    if (respuesta) {
      console.log("Producto actualizado");
    } else {
      console.log("Hubo un error al actualizar el producto");
    }
  }

  async deleteProduct(id) {
    const productId = this.products.find((product) => product.id === id);

    if (productId) {
      const nuevoArray = this.products.filter((product) => product.id != id);
      this.products = nuevoArray;

      await this.saveFile(this.products);
    } else {
      console.log("No se pudo borrar el producto");
    }
  }
}

class Product {
  constructor(title, description, price, code, thumbnail, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

//prueba
const product1 = new Product(
  "Zapatos",
  "Cómodos y baratos",
  2500,
  "A1",
  "FotoZapatos",
  25
);

const product2 = new Product(
  "Sandalias",
  "Las mejores de la temporada",
  4500,
  "A2",
  "FotoSandalias",
  35
);

const product3 = new Product(
  "Zapatillas",
  "Las más cómodas que encontraras",
  3000,
  "A3",
  "FotoZapatillas",
  15
);

const manejadorProducto = new ProductManager("./Productos.json");

manejadorProducto.addProduct(product1);
manejadorProducto.addProduct(product2);
manejadorProducto.addProduct(product3);

console.log(manejadorProducto.getProductById(2));

// manejadorProducto.updateProduct(2, "description", "Como nuevitas");
// console.log(manejadorProducto.getProducts());

// manejadorProducto.deleteProduct(7);
// console.log(manejadorProducto.getProducts());

// manejadorProducto.deleteProduct(1);
// console.log(manejadorProducto.getProducts());