import { ContenedorMongoDb } from "../../containers/ContenedorMongoDb.js";
import productosModel from "../../models/productosModel.js";

class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(productosModel);
  }
}

export default ProductosDaoMongoDb;
