import { loggerConsole, loggerFile } from "../utils/loggers.js";
import { transporter } from "../middlewares/nodemailer.js";
import Db from "../daos/factory.js";
import yargs from "yargs";

const args = yargs(process.argv.slice(2))
  .alias({ p: "puerto", m: "modo", db: "database" })
  .default({ p: 8080, m: "fork", db: "mongodb" }).argv;

const factory = new Db(args.db);

class repoUsuarios {
  constructor() {
    this.Dao = factory.instanceDao("usuarios");
  }
  async sendMail(mailOptions) {
    try {
      const info = await transporter.sendMail(mailOptions);
      loggerConsole.info(info);
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
}

export default repoUsuarios;
