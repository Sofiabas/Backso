import { ContenedorMongoDb } from "../../containers/ContenedorMongoDb.js";
import carritosModel from "../../models/carritosModel.js";

class CarritosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(carritosModel);
  }
}

export default CarritosDaoMongoDb;
