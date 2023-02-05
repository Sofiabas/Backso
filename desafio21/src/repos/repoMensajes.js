import { loggerConsole, loggerFile } from "../utils/loggers.js";
import Db from "../daos/factory.js";
import yargs from "yargs";

const args = yargs(process.argv.slice(2))
  .alias({ p: "puerto", m: "modo", db: "database" })
  .default({ p: 8080, m: "fork", db: "mongodb" }).argv;

const factory = new Db(args.db);

class repoMensajes {
  constructor() {
    this.Dao = factory.instanceDao("mensajes");
  }
  async getAll() {
    try {
      return await this.Dao.getAll();
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async save(data) {
    try {
      return await this.Dao.save(data);
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
}

export default repoMensajes;
