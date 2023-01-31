import { loggerConsole, loggerFile } from "../utils/loggers.js";
import Db from "../daos/factory.js";
import yargs from "yargs";

const args = yargs(process.argv.slice(2))
  .alias({ p: "puerto", m: "modo", db: "database" })
  .default({ p: 8080, m: "fork", db: "mongodb" }).argv;

const factory = new Db(args.db);

class repoProductos {
  constructor() {
    this.Dao = factory.instanceDao("productos");
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
  async editById(id, Object) {
    try {
      return await this.Dao.editById(id, Object);
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async getById(Number) {
    try {
      let resultado = await this.Dao.getById(Number);
      return resultado;
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
}

export default repoProductos;
