import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { loggerConsole } from "../utils/loggers.js";

dotenv.config();
const URL = process.env.URL;

let instance = null;
let timestamp = null;

class connectionMongoDb {
  constructor() {}

  static connection = async () => {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "boring-shop",
    });

    if (!instance) {
      instance = new connectionMongoDb();
      timestamp = Date.now();
    }

    loggerConsole.info(`Conexión a la base de datos ${timestamp}`);
  };
}

export default connectionMongoDb;
