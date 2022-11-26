import { ContenedorFirebase } from "../../contenedores/ContenedorFirebase.js";
import { connectionFirebase as connection } from "../../config.js";

const collection = "productos";

class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super(connection, collection);
  }
}

export default ProductosDaoFirebase;
