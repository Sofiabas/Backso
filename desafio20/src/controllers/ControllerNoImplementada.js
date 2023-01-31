import { loggerConsole, loggerFile } from "../utils/loggers.js";

const noImplementada = async (req, res) => {
  loggerConsole.warn(
    `Ruta: '${req.originalUrl}' - Método: '${req.method}' - No implementada`
  );
  loggerFile.warn(
    `Ruta: '${req.originalUrl}' - Método: '${req.method}' - No implementada`
  );
  res.json({
    error: -2,
    descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada`,
  });
};

export default noImplementada;
