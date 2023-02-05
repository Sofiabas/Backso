import { ContenedorMongoDb } from "../../containers/ContenedorMongoDb.js";
import usuariosModel from "../../models/usuariosModel.js";

class UsuariosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(usuariosModel);
  }
}

export { UsuariosDaoMongoDb, usuariosModel };
