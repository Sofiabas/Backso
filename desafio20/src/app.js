import initServer from "./server.js";
import { loggerConsole } from "./utils/loggers.js";
import cluster from "cluster";
import os from "os";
import yargs from "yargs";

const args = yargs(process.argv.slice(2))
  .alias({ p: "puerto", m: "modo", db: "database" })
  .default({ p: 8080, m: "fork", db: "mongodb" }).argv;

const numCPUs = os.cpus().length;

if (args.modo == "cluster") {
  if (cluster.isPrimary) {
    loggerConsole.info(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      loggerConsole.info(`Worker ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    // Workers can share any TCP connection
    initServer();
    loggerConsole.info(`Worker ${process.pid} started`);
  }
} else {
  initServer();
}
