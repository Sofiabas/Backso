import { ContenedorMongoDb } from "../../contenedores/ContenedorMongo.js";
import { connectionMongoDb as connection } from "../../config.js";

import mongoose from "mongoose";

const productosCollection = "productos";

const ProductoSchema = new mongoose.Schema({
  nombre: { type: String },
  descripcion: { type: String },
  codigo: { type: Number },
  precio: { type: Number },
  stock: { type: Number },
  timestamp: { type: Number },
  foto: { type: String },
  id: { type: Number },
});

const productosModel = mongoose.model(productosCollection, ProductoSchema);

class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(connection, productosModel);
  }
}

export default ProductosDaoMongoDb;
