const fs = require("fs");

class Contenedor {
  constructor(nombre) {
    this.nombre = nombre;
  }
  async save(Object) {
    try {
      const contenidoArchivo = await fs.promises.readFile(this.nombre, "utf-8");
      const archivoParseado = JSON.parse(contenidoArchivo);

      const ids = archivoParseado.map((object) => {
        return object.id;
      });

      let nuevoId = 1;

      if (ids.length > 0) nuevoId = Math.max(...ids) + 1;

      Object.id = nuevoId;
      Object.timestamp = Date.now();

      archivoParseado.push(Object);

      const resultadoATexto = JSON.stringify(archivoParseado, null, " ");
      await fs.promises.writeFile(this.nombre, resultadoATexto, "utf-8");

      console.log(`Producto agregado con id ${nuevoId}`);
      return Object;
    } catch (error) {
      console.log(error);
    }
  }
  async saveById(id, Object) {
    try {
      const contenidoArchivo = await fs.promises.readFile(this.nombre, "utf-8");
      const archivoParseado = JSON.parse(contenidoArchivo);

      const productos = archivoParseado.map((x) => x);

      let producto = productos.find((producto) => producto.id === parseInt(id));

      if (!producto) {
        return { error: "producto no encontrado" };
      } else {
        const { nombre, descripcion, codigo, precio, stock, timestamp, foto } =
          Object;

        nombre && (producto.nombre = nombre);
        descripcion && (producto.descripcion = descripcion);
        codigo && (producto.codigo = codigo);
        precio && (producto.precio = precio);
        stock && (producto.stock = stock);
        timestamp && (producto.timestamp = timestamp);
        foto && (producto.foto = foto);

        let nuevosProductos = productos.filter(
          (producto) => producto.id !== parseInt(id)
        );

        nuevosProductos.push(producto);

        const resultadoATexto = JSON.stringify(nuevosProductos, null, " ");
        await fs.promises.writeFile(this.nombre, resultadoATexto, "utf-8");

        console.log(`Producto editado con id ${id}`);
        return producto;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getById(Number) {
    try {
      const contenidoArchivo = await fs.promises.readFile(this.nombre, "utf-8");
      const archivoParseado = JSON.parse(contenidoArchivo);
      let resultado = archivoParseado.find((producto) => producto.id == Number);

      if (!resultado) resultado = { error: "producto no encontrado" };

      console.log(resultado);
      return resultado;
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      const contenidoArchivo = await fs.promises.readFile(this.nombre, "utf-8");
      //console.log(JSON.parse(contenidoArchivo));
      return JSON.parse(contenidoArchivo);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(Number) {
    try {
      const contenidoArchivo = await fs.promises.readFile(this.nombre, "utf-8");
      const archivoParseado = JSON.parse(contenidoArchivo);

      const productoAEliminar = archivoParseado.find(
        (producto) => producto.id == Number
      );

      if (!productoAEliminar) {
        console.log("El producto no existe.");
        return { error: "producto no encontrado" };
      }

      const resultado = archivoParseado.filter(
        (producto) => producto.id != Number
      );

      const resultadoATexto = JSON.stringify(resultado, null, " ");

      await fs.promises.writeFile(this.nombre, resultadoATexto, "utf-8");
      console.log(`Producto con ID ${Number} eliminado.`);
      return resultado;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile(this.nombre, "[]", "utf-8");
      console.log("Productos borrados.");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Contenedor;
