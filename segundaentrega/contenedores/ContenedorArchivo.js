import fs from "fs";

class ContenedorArchivo {
  constructor(connection, nombre) {
    this.connection = connection;
    this.nombre = nombre;
  }
  async saveProduct(Object) {
    try {
      const contenidoArchivo = await this.connection();
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

      console.log(`Registro agregado con id ${nuevoId}`);
      return Object;
    } catch (error) {
      console.log(error);
    }
  }
  async saveCart(Array) {
    try {
      const contenidoArchivo = await this.connection();
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

      console.log(`Registro agregado con id ${nuevoId}`);
      return nuevoId;
    } catch (error) {
      console.log(error);
    }
  }
  async editById(id, Object) {
    try {
      const contenidoArchivo = await this.connection();
      const archivoParseado = JSON.parse(contenidoArchivo);

      const productos = archivoParseado.map((x) => x);

      let producto = productos.find((producto) => producto.id === parseInt(id));

      if (!producto) {
        return { error: "registro no encontrado" };
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

        console.log(`Registro editado con id ${id}`);
        return producto;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async saveById(id, Object) {
    try {
      const contenidoArchivo = await this.connection();
      const archivoParseado = JSON.parse(contenidoArchivo);

      const carritos = archivoParseado.map((x) => x);

      let carrito = carritos.find((carrito) => carrito.id === parseInt(id));

      if (!carrito) {
        return { error: "registro no encontrado" };
      }

      carrito.productos.push(Object);

      let nuevosCarritos = carritos.filter(
        (carrito) => carrito.id !== parseInt(id)
      );

      nuevosCarritos.push(carrito);

      const resultadoATexto = JSON.stringify(nuevosCarritos, null, " ");
      await fs.promises.writeFile(this.nombre, resultadoATexto, "utf-8");

      console.log(`Registro con id ${id} editado.`);
      return carrito;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(Number) {
    try {
      const contenidoArchivo = await this.connection();
      const archivoParseado = JSON.parse(contenidoArchivo);
      let resultado = archivoParseado.find((producto) => producto.id == Number);

      if (!resultado) return (resultado = { error: "registro no encontrado" });

      resultado.productos && (resultado = resultado.productos);

      return resultado;
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      const contenidoArchivo = await this.connection();
      return JSON.parse(contenidoArchivo);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(Number) {
    try {
      const contenidoArchivo = await this.connection();
      const archivoParseado = JSON.parse(contenidoArchivo);

      const productoAEliminar = archivoParseado.find(
        (producto) => producto.id == Number
      );

      if (!productoAEliminar) {
        console.log("El registro no existe.");
        return { error: "registro no encontrado" };
      }

      const resultado = archivoParseado.filter(
        (producto) => producto.id != Number
      );

      const resultadoATexto = JSON.stringify(resultado, null, " ");

      await fs.promises.writeFile(this.nombre, resultadoATexto, "utf-8");
      console.log(`Registro con ID ${Number} eliminado.`);
      return resultado;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAll() {
    try {
      const contenidoArchivo = await this.connection();
      await fs.promises.writeFile(this.nombre, "[]", "utf-8");
      console.log("Registros borrados.");
    } catch (error) {
      console.log(error);
    }
  }
  async deleteByProduct(id, id_prod) {
    try {
      const contenidoArchivo = await this.connection();
      const archivoParseado = JSON.parse(contenidoArchivo);

      const carritos = archivoParseado.map((x) => x);

      let carrito = carritos.find((carrito) => carrito.id === parseInt(id));

      if (!carrito) {
        return { error: "registro no encontrado" };
      }

      let producto = carrito.productos.find(
        (producto) => producto.id === parseInt(id_prod)
      );

      if (!producto) {
        return { error: "registro no encontrado" };
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

      console.log(`Registro con id ${id} editado.`);
      return carrito;
    } catch (error) {
      console.log(error);
    }
  }
}

export { ContenedorArchivo };
