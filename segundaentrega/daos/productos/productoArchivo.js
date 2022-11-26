import { ContenedorArchivo } from "../../contenedores/ContenedorArchivo.js";
import { connectionArchivo as connection } from "../../config.js";

class ProductosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super(connection, "../../dbArchivo/products.txt");
  }
}

export default ProductosDaoArchivo;
