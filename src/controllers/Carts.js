import * as fs from "fs";

class Carts {
  constructor(path) {
    this.path = path;

    if (fs.existsSync(path)) {
      try {
        let carts = fs.readFileSync(path, "utf-8");
        this.carts = JSON.parse(carts);
      } catch (error) {
        this.carts = [];
      }
    } else {
      this.carts = [];
    }
  }

  async saveFile() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.carts, null, "\t")
      );
      return true;
    } catch (error) {
      console.log(`Hubo un error: ${error}`);
      return;
    }
  }

  createCart() {
    const cart = { products: [], id: Number };

    if (this.carts.length === 0) {
      cart.id = 1;
    } else {
      cart.id = this.carts[this.carts.length - 1].id + 1;
    }
    this.carts.push(cart);
    this.saveFile(this.carts);
    return cart;
  }

  getCarts() {
    return this.carts;
  }

  getCartById(id) {
    const cart = this.carts.find((carrito) => carrito.id === id);

    if (cart) {
      return cart;
    } else {
      return console.log("Not Found");
    }
  }

  addProductInCart(pid, cid) {
    const carritoAModificar = this.getCartById(cid);

    if (carritoAModificar) {
      carritoAModificar.products.push({product: pid, quantity: 1});
      this.saveFile();
    } else {
      console.log("No se encontró el carrito");
    }
  }
}

export default Carts;

const manejadorCarts = new Carts("./models/carrito.json");

console.log(manejadorCarts.getCarts());
// manejadorCarts.createCart(); 


// console.log(manejadorCarts.getCartById(2));

// console.log(manejadorCarts.addProductInCart(1, 1));
