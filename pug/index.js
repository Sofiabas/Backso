const fs = require("fs");

class Contenedor {
  constructor(nombre) {
    this.nombre = nombre;
  }
  async save(Object) {
    try {
      const contenidoArchivo = await fs.promises.readFile(this.nombre, "utf-8");
      const archivoParseado = JSON.parse(contenidoArchivo);

      Object.price = parseInt(Object.price);

      archivoParseado.push(Object);

      const resultadoATexto = JSON.stringify(archivoParseado, null, " ");
      await fs.promises.writeFile(this.nombre, resultadoATexto, "utf-8");

      console.log(`Se añadio un producto`);
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      const contenidoArchivo = await fs.promises.readFile(this.nombre, "utf-8");
      console.log(JSON.parse(contenidoArchivo));
      return JSON.parse(contenidoArchivo);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile(this.nombre, "[]", "utf-8");
      console.log("Se ha borrado la base de datos");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {Contenedor};