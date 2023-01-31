import { loggerConsole, loggerFile } from "../utils/loggers.js";
import connectionMongoDb from "../db/configMongoDb.js";

connectionMongoDb.connection();

class ContenedorMongoDb {
  constructor(model) {
    this.model = model;
  }
  async getAll() {
    try {
      let registros = await this.model.find({});

      return registros;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async getById(Number) {
    try {
      let registros = await this.model.find({});

      let registro = registros.find((elem) => elem.id == Number);

      if (!registro) return (registro = { error: "registro no encontrado" });

      return registro;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async save(Object) {
    try {
      const nuevoRegistro = new this.model(Object);
      const registroGuardado = await nuevoRegistro.save();

      if (Object.id) {
        loggerConsole.info(`Registro agregado con id ${Object.id}`);
      } else {
        loggerConsole.info(`Registro agregado con id ${registroGuardado._id}`);
      }

      return registroGuardado;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async editById(id, Objeto) {
    try {
      let registros = await this.model.find({});

      let registro = registros.find((registro) => registro.id === parseInt(id));

      if (!registro) {
        return { error: "registro no encontrado" };
      } else {
        let keys = Object.keys(Objeto);

        await keys.forEach(async (elem) => {
          const objeto = {};
          objeto[elem] = Objeto[elem];
          await this.model.updateOne({ id: id }, { $set: objeto });
        });

        loggerConsole.info(`Registro editado con id ${id}`);

        const registroEditado = await this.model.findOne({ id: id });

        return registroEditado;
      }
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async deleteById(Number) {
    try {
      let registros = await this.model.find({});

      const registro = registros.find((elem) => elem.id == Number);

      if (!registro) {
        loggerConsole.info("El registro no existe.");
        return { error: "registro no encontrado" };
      }

      await this.model.deleteOne({ id: Number });

      loggerConsole.info(`Registro con ID ${Number} eliminado.`);

      return registro;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
}

export { ContenedorMongoDb };
