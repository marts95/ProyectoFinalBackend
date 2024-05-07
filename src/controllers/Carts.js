import CartModel from "../models/carts.model.js";

class Carts {

  async createCart() {
    try {
      const nuevoCarrito = new CartModel({ products: [] });
      await nuevoCarrito.save();
      return nuevoCarrito;
    } catch (error) {
      console.log("Error al crear un carrito nuevo", error);
      throw error;
    }
  }

  async getCarts() {
    try {
      const carritos = await CartModel.find();
      return carritos;
    } catch (error) {
      console.log("Error al recuperar carritos", error);
      throw error;
    }
  }

  async getCartById(cid) {
      try {
        const carrito = await CartModel.findById(cid);

        if (!carrito) {
          console.log("No existe carrito con ese ID");
          return null;
        }

        return carrito;
      } catch (error) {
        console.log("Error al obtener un carrito por ID", error);
        throw error;
      }
  }

  async addProductInCart(pid, cid, quantity = 1) {
    try {
      const carrito = await this.getCartById(cid);
      const existeProducto = carrito.products.find(
        (item) => item.product.toString() === productId
      );

      if (existeProducto) {
        existeProducto.quantity += quantity;
      } else {
        carrito.products.push({ product: pid, quantity });
      }

      carrito.markModified("products");

      await carrito.save();
      return carrito;
    } catch (error) {
      console.log("Error al agregar un producto", error);
      throw error;
    }
  }
}

export default Carts;
