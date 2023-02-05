import { loggerConsole, loggerFile } from "../utils/loggers.js";
import ProductosCarritoDto from "../dtos/ProductosCarritoDto.js";
import Db from "../daos/factory.js";
import yargs from "yargs";

const args = yargs(process.argv.slice(2))
  .alias({ p: "puerto", m: "modo", db: "database" })
  .default({ p: 8080, m: "fork", db: "mongodb" }).argv;

const factory = new Db(args.db);

class repoCarritos {
  constructor() {
    this.Dao = factory.instanceDao("carritos");
    this.DaoProductos = factory.instanceDao("productos");
  }
  async getAll() {
    try {
      return await this.Dao.getAll();
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async save(Object) {
    try {
      await this.Dao.save(Object);
      return Object;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async deleteById(Number) {
    try {
      return await this.Dao.deleteById(Number);
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async getById(Number) {
    try {
      let carrito = await this.Dao.getById(Number);
      let productos = await this.DaoProductos.getAll();
      let carritoDetallado = [];

      if (carrito.productos) {
        carrito.productos.forEach((elem) => {
          const producto = productos.find(
            (producto) => producto.id === parseInt(elem.id)
          );
          const qty = elem.qty;
          let productoDetallado = new ProductosCarritoDto(producto, qty);
          productoDetallado = productoDetallado._doc;
          carritoDetallado.push(productoDetallado);
        });
      }

      return carritoDetallado;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async editById(id, objeto) {
    try {
      return await this.Dao.editById(id, objeto);
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async getByUserId(ID) {
    try {
      let carritos = await this.Dao.getAll();

      let carrito = carritos.find((elem) => elem.userid == ID);

      let productos = await this.DaoProductos.getAll();
      let carritoDetallado = [];

      if (carrito.productos) {
        carrito.productos.forEach((elem) => {
          const producto = productos.find(
            (producto) => producto.id === parseInt(elem.id)
          );
          const qty = elem.qty;
          let productoDetallado = new ProductosCarritoDto(producto, qty);
          productoDetallado = productoDetallado._doc;
          carritoDetallado.push(productoDetallado);
        });
      }

      return carritoDetallado;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
}

export default repoCarritos;
