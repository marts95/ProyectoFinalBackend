import ProductModel from "../models/products.model.js";

class ProductManager {
  async addProduct({
    title,
    description,
    proce,
    img,
    code,
    stock,
    category,
    thumbnail,
  }) {
    try {
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

      const existeProducto = await ProductModel.findOne({ code: code });

      if (existeProducto) {
        console.log("El código debe ser único");
        return;
      }

      const nuevoProducto = new ProductModel({
        title,
        description,
        price,
        img,
        code,
        stock,
        category,
        status: true,
        thumbnail: thumnail || [],
      });

      await nuevoProducto.save();
    } catch (error) {
      console.log("Error al crear producto", error);
      throw error;
    }
  }

  async getProducts() {
    try {
      const productos = await ProductModel.find().lean();
      return productos;
    } catch (error) {
      console.log("Error al recuperar productos");
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const producto = await ProductModel.findById(id);
      if (!producto) {
        console.log("Producto no encontrado");
        return null;
      }

      console.log("Producto encontrado");
      return producto;
    } catch (error) {
      console.log("Error al recuperar producto");
      throw error;
    }
  }

  async updateProduct(id, productoActualizado) {
    try {
      const updateProduct = await ProductModel.findByIdAndUpdate(
        id,
        productoActualizado
      );

      if (!updateProduct) {
        console.log("Producto no encontrado");
        return null;
      }
      console.log("Producto actualizado");
      return updateProduct;
    } catch (error) {
      console.log("Error al actualizar producto", error);
      throw error;
    }
  }

  async deleteProduct(id) {
     try {
            const deleteProduct = await ProductModel.findByIdAndDelete(id);

            if(!deleteProduct) {
                console.log("Producto no encontrado, vamos a morir");
                return null; 
            }
            console.log("Producto eliminado");
            

        } catch (error) {
            console.log("Error eliminar producto por ID", error); 
            throw error; 
        }
    }
  }

export default ProductManager