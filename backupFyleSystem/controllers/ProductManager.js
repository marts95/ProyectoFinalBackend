import * as fs from "fs";

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

export default ProductManager;
//import ProductManager from "ProductManager.cjs"
export {ProductManager}
//import {ProductManager} from "ProductManager.cjs"

//prueba
const product1 = new Product(
  "Alfajores",
  "Alfajores de dulce de leche tipo marplatenses y de maicena",
  1500,
  "A1",
  "https://res.cloudinary.com/dp8auiwtw/image/upload/v1686142068/Panader%C3%ADa%20S%C3%A1nchez/alfajorescuadrado_zbc1bj.jpg",
  25
);

const product2 = new Product(
  "Bizcochos",
  "Los clásicos redonditos o cuadraditos hojaldrados",
  1500,
  "A2",
  "https://res.cloudinary.com/dp8auiwtw/image/upload/v1686142068/Panader%C3%ADa%20S%C3%A1nchez/bizcosalados_y2fkoc.jpg",
  35
);

const product3 = new Product(
  "Cañoncitos",
  "Con relleno de dulce de leche",
  3500,
  "A3",
  "https://res.cloudinary.com/dp8auiwtw/image/upload/v1686142068/Panader%C3%ADa%20S%C3%A1nchez/ca%C3%B1oncitos_aiqs19.jpg",
  15
);

const product4 = new Product(
  "Chipaquitos",
  "No apto para vegetarianos",
  1600,
  "A4",
  "https://res.cloudinary.com/dp8auiwtw/image/upload/v1686142069/Panader%C3%ADa%20S%C3%A1nchez/chipaquitos_t3j6kc.jpg",
  15
);

const product5 = new Product(
  "Cupcakes",
  "Con o sin baño de chocolate negro",
  2500,
  "A5",
  "https://res.cloudinary.com/dp8auiwtw/image/upload/v1686142068/Panader%C3%ADa%20S%C3%A1nchez/cupcakes_choc_aaioeb.jpg",
  15
);

const product6 = new Product(
  "Facturas",
  "Gran variedad de facturas de crema pastelera, dulce de membrillo y dulce de leche con y sin decoraciones",
  1100,
  "A6",
  "https://res.cloudinary.com/dp8auiwtw/image/upload/v1686142069/Panader%C3%ADa%20S%C3%A1nchez/facturastodas_povmah.jpg",
  15
);

const product7 = new Product(
  "Galletas",
  "Gran variedad de galletas, entre ellas, galletas con chips de chocolate",
  1500,
  "A7",
  "https://res.cloudinary.com/dp8auiwtw/image/upload/v1686142070/Panader%C3%ADa%20S%C3%A1nchez/galle_chips_choc_einnte.jpg",
  15
);

const product8 = new Product(
  "Lengüitas",
  "Con dulce de leche de la mejor calidad",
  2500,
  "A8",
  "https://res.cloudinary.com/dp8auiwtw/image/upload/v1686142071/Panader%C3%ADa%20S%C3%A1nchez/leng%C3%BCitas_qk9f0u.jpg",
  15
);

const product9 = new Product(
  "Palitos",
  "Bañados en chocolate de leche",
  1500,
  "A9",
  "https://res.cloudinary.com/dp8auiwtw/image/upload/v1686142071/Panader%C3%ADa%20S%C3%A1nchez/palitoschocolate_gepktt.jpg",
  15
);

const product10 = new Product(
  "Pan de miga",
  "Disponible solo durante el mes de diciembre",
  3500,
  "A10",
  "https://res.cloudinary.com/dp8auiwtw/image/upload/v1686142072/Panader%C3%ADa%20S%C3%A1nchez/panmiga_dyjsn9.jpg",
  15
);

const product11 = new Product(
  "Pan dulce",
  "Disponible solo durante el mes de diciembre",
  2000,
  "A11",
  "https://res.cloudinary.com/dp8auiwtw/image/upload/v1686142072/Panader%C3%ADa%20S%C3%A1nchez/pandulce_gkdrjv.jpg",
  15
);

const product12 = new Product(
  "Pan francés",
  "Pan francés tipo mignon",
  500,
  "A12",
  "https://res.cloudinary.com/dp8auiwtw/image/upload/v1686142071/Panader%C3%ADa%20S%C3%A1nchez/panfranc%C3%A9s_lqecx1.jpg",
  15
);

const product13 = new Product(
  "Pepitas",
  "Con dulce de membrillo de la mejor calidad",
  2200,
  "A13",
  "https://res.cloudinary.com/dp8auiwtw/image/upload/v1686142071/Panader%C3%ADa%20S%C3%A1nchez/pepitas_lfs6wt.jpg",
  15
);

const product14 = new Product(
  "Rosca de pascua",
  "Disponible solo durante Pascuas",
  800,
  "A14",
  "https://res.cloudinary.com/dp8auiwtw/image/upload/v1686142072/Panader%C3%ADa%20S%C3%A1nchez/rosca-pascua_oldshe.jpg",
  15
);

const product15 = new Product(
  "Tortas",
  "Variedad de tortas disponibles y se realizan por encargue",
  1500,
  "A15",
  "https://res.https://res.cloudinary.com/dp8auiwtw/image/upload/v1686142072/Panader%C3%ADa%20S%C3%A1nchez/tortas_rqv2aj.jpg.com/dp8auiwtw/image/upload/v1686142072/Panader%C3%ADa%20S%C3%A1nchez/rosca-pascua_oldshe.jpg",
  15
);

const manejadorProducto = new ProductManager("./src/models/productos.json");

// manejadorProducto.addProduct(product1);
// manejadorProducto.addProduct(product2);
// manejadorProducto.addProduct(product3);
// manejadorProducto.addProduct(product4);
// manejadorProducto.addProduct(product5);
// manejadorProducto.addProduct(product6);
// manejadorProducto.addProduct(product7);
// manejadorProducto.addProduct(product8);
// manejadorProducto.addProduct(product9);
// manejadorProducto.addProduct(product10);
// manejadorProducto.addProduct(product11);
// manejadorProducto.addProduct(product12);
// manejadorProducto.addProduct(product13);
// manejadorProducto.addProduct(product14);
// manejadorProducto.addProduct(product15);

// manejadorProducto.getProducts();

// console.log(manejadorProducto.getProductById(2));

// manejadorProducto.updateProduct(2, "description", "Como nuevitas");
// console.log(manejadorProducto.getProducts());

// manejadorProducto.deleteProduct(7);
// console.log(manejadorProducto.getProducts());

// manejadorProducto.deleteProduct(1);
// console.log(manejadorProducto.getProducts());
