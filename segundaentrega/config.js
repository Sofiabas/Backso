import fs from "fs";

const connectionArchivo = async () => {
  console.log("DbArchivo conectada");
  return await fs.promises.readFile("./dbArchivo/carts.txt", "utf-8");
};


import mongoose from "mongoose";

const connectionMongoDb = async () => {
  mongoose.connect("mongodb+srv://sofiabas:sofiabas@cluster0.mijpnwn.mongodb.net/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Mongo conectada");
};

import admin from "firebase-admin";
import { createRequire } from "module";

const connectionFirebase = async () => {
  const require = createRequire(import.meta.url);
  const ServiceAccount = require("./databaseFirebase/pizzeria-139d8-firebase-adminsdk-qy1gg-5c07ce572b.json");

  admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount),
  });
  console.log("Firebase conectada");
};

export {
    connectionArchivo,
    connectionMongoDb,
    connectionFirebase,
  };