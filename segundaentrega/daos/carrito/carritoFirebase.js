import { ContenedorFirebase } from "../../contenedores/ContenedorFirebase.js";
import { connectionFirebase as connection } from "../../config.js";

const collection = "carritos";

class CarritosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super(connection, collection);
  }
}

export default CarritosDaoFirebase;