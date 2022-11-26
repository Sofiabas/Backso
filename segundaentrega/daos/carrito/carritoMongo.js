import { ContenedorMongoDb } from "../../contenedores/ContenedorMongo.js";
import { connectionMongoDb as connection } from "../../config.js";

import mongoose from "mongoose";

const carritosCollection = "carritos";

const CarritoSchema = new mongoose.Schema({
  id: { type: Number },
  timestamp: { type: Number },
  productos: { type: Array },
});

const carritosModel = mongoose.model(carritosCollection, CarritoSchema);

class CarritosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(connection, carritosModel);
  }
}

export default CarritosDaoMongoDb;
