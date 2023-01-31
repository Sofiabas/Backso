import { loggerConsole, loggerFile } from "../utils/loggers.js";
import repoMensajes from "../repos/repoMensajes.js";

class ServiciosMensajes {
  constructor() {
    this.repoMensajes = new repoMensajes();
  }
  async getMessages() {
    try {
      return await this.repoMensajes.getAll();
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async sendMessage(data) {
    try {
      return await this.repoMensajes.save(data);
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
}

export default ServiciosMensajes;
