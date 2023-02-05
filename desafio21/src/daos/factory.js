import CarritosDaoMongoDb from "./carritos/CarritosDaoMongoDb.js";
import MensajesDaoMongoDb from "./mensajes/MensajesDaoMongoDb.js";
import ProductosDaoMongoDb from "./productos/ProductosDaoMongoDb.js";
import { UsuariosDaoMongoDb } from "./usuarios/UsuariosDaoMongoDb.js";

class Db {
  constructor(db) {
    this.db = db;
  }
  instanceDao(dao) {
    switch (this.db) {
      case "mongodb":
        switch (dao) {
          case "carritos":
            return new CarritosDaoMongoDb();
          case "mensajes":
            return new MensajesDaoMongoDb();
          case "productos":
            return new ProductosDaoMongoDb();
          case "usuarios":
            return new UsuariosDaoMongoDb();
        }
        break;
    }
  }
}

export default Db;
