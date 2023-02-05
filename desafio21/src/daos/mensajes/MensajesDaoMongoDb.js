import { ContenedorMongoDb } from "../../containers/ContenedorMongoDb.js";
import mensajesModel from "../../models/mensajesModel.js";

class MensajesDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(mensajesModel);
  }
}

export default MensajesDaoMongoDb;
