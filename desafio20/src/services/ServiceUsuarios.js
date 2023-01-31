import { loggerConsole, loggerFile } from "../utils/loggers.js";
import { usuariosModel } from "../daos/usuarios/UsuariosDaoMongoDb.js";
import repoUsuarios from "../repos/repoUsuarios.js";

class ServiciosUsuarios {
  constructor() {
    this.repoUsuarios = new repoUsuarios();
  }
  async sendMail(mailOptions) {
    try {
      const info = await this.repoUsuarios.sendMail(mailOptions);
      loggerConsole.info(info);
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
}

export { ServiciosUsuarios, usuariosModel };
