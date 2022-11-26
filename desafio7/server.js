import { option_MDB } from "./config/m_DB.js";
import {  option_SQLite  } from "./config/SQLite3.js";
import knex from "knex";
const dbMDB = knex(option_MDB);
const dbSQLite3 = knex( option_SQLite );

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));

const getProducts = async () => {
  return await dbMDB
    .from("productos")
    .select("*")
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getMessages = async () => {
  return await dbSQLite3
    .from("mensajes")
    .select("*")
    .catch((err) => {
      console.log(err);
      throw err;
    });
};


import * as hbs from "express-handlebars";

app.set("view engine", "hbs");
app.set("views", "./views"); 

app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
  })
);

app.get("/", async (req, res) => {
  const productos = await getProducts();
  const check = productos.length > 0;
  const mensajesCheck = await getMessages();
  const check2 = mensajesCheck.length > 0;
  res.status(200).render("body", {
    body: check,
    body2: check2,
  });
});

const server = httpServer.listen(8080, (err) => {
  if (err) console.log(err);
  console.log(`Escuchando al puerto ${server.address().port}`);
});

io.on("connection", async (socket) => {
  const productos = await getProducts();
  const mensajes = await getMessages();

  socket.emit("productos", productos);
  socket.emit("mensajes", mensajes);

  socket.on("producto", async (data) => {
    await dbMDB("productos").insert(data);
    const productos = await getProducts();
    io.sockets.emit("productos", productos);
  });
  socket.on("mensaje", async (data) => {
    await dbSQLite3("mensajes").insert(data);
    const mensajes = await getMessages();
    io.sockets.emit("mensajes", mensajes);
  });
});