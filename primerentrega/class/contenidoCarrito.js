const fs = require("fs");

class Carrito {
  constructor(nombre) {
    this.nombre = nombre;
  }
  async save(Array) {
    try {
      const contenidoArchivo = await fs.promises.readFile(this.nombre, "utf-8");
      const archivoParseado = JSON.parse(contenidoArchivo);

      const ids = archivoParseado.map((object) => {
        return object.id;
      });

      let nuevoId = 1;

      if (ids.length > 0) nuevoId = Math.max(...ids) + 1;

      const nuevoCarrito = {
        id: nuevoId,
        timestamp: Date.now(),
        productos: Array,
      };

      archivoParseado.push(nuevoCarrito);

      const resultadoATexto = JSON.stringify(archivoParseado, null, " ");
      await fs.promises.writeFile(this.nombre, resultadoATexto, "utf-8");

      console.log(`Carrito agregado con id ${nuevoId}`);
      return nuevoId;
    } catch (error) {
      console.log(error);
    }
  }
  async saveById(id, Object) {
    try {
      const contenidoArchivo = await fs.promises.readFile(this.nombre, "utf-8");
      const archivoParseado = JSON.parse(contenidoArchivo);

      const carritos = archivoParseado.map((x) => x);

      let carrito = carritos.find((carrito) => carrito.id === parseInt(id));

      if (!carrito) {
        return { error: "carrito no encontrado" };
      }

      carrito.productos.push(Object);

      let nuevosCarritos = carritos.filter(
        (carrito) => carrito.id !== parseInt(id)
      );

      nuevosCarritos.push(carrito);

      const resultadoATexto = JSON.stringify(nuevosCarritos, null, " ");
      await fs.promises.writeFile(this.nombre, resultadoATexto, "utf-8");

      console.log(`Carrito con id ${id} editado.`);
      return carrito;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(Number) {
    try {
      const contenidoArchivo = await fs.promises.readFile(this.nombre, "utf-8");
      const archivoParseado = JSON.parse(contenidoArchivo);
      let resultado = archivoParseado.find((producto) => producto.id == Number);

      if (!resultado) return (resultado = { error: "carrito no encontrado" });

      resultado = resultado.productos;

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
        console.log("El carrito no existe.");
        return { error: "carrito no encontrado" };
      }

      const resultado = archivoParseado.filter(
        (producto) => producto.id != Number
      );

      const resultadoATexto = JSON.stringify(resultado, null, " ");

      await fs.promises.writeFile(this.nombre, resultadoATexto, "utf-8");
      console.log(`Carrito con ID ${Number} eliminado.`);
      return resultado;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteByProduct(id, id_prod) {
    try {
      const contenidoArchivo = await fs.promises.readFile(this.nombre, "utf-8");
      const archivoParseado = JSON.parse(contenidoArchivo);

      const carritos = archivoParseado.map((x) => x);

      let carrito = carritos.find((carrito) => carrito.id === parseInt(id));

      if (!carrito) {
        return { error: "carrito no encontrado" };
      }

      let producto = carrito.productos.find(
        (producto) => producto.id === parseInt(id_prod)
      );

      if (!producto) {
        return { error: "producto no encontrado" };
      }

      let nuevosProductos = carrito.productos.filter(
        (producto) => producto.id !== parseInt(id_prod)
      );

      carrito.productos = nuevosProductos;

      let nuevosCarritos = carritos.filter(
        (carrito) => carrito.id !== parseInt(id)
      );

      nuevosCarritos.push(carrito);

      const resultadoATexto = JSON.stringify(nuevosCarritos, null, " ");
      await fs.promises.writeFile(this.nombre, resultadoATexto, "utf-8");

      console.log(`Carrito con id ${id}`);
      return carrito;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Carrito;
