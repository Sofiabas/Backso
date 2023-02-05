import winston from "winston";

const loggerConsole = winston.createLogger({
  transports: [new winston.transports.Console({ level: "info" })],
});

const loggerWarn = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "../logs/warn.log",
      name: "warn",
      level: "warn",
    }),
  ],
});

const loggerError = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "../logs/error.log",
      name: "error",
      level: "error",
    }),
  ],
});

const loggerFile = {
  warn: (params) => {
    return loggerWarn.warn(params);
  },
  error: (params) => {
    return loggerError.error(params);
  },
};

export { loggerConsole, loggerFile };
