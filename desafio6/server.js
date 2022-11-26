const express = require("express");
const app = express();
const fetch = require("node-fetch");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));

const contenedor = require("./index.js");
let archivoMensajes = new contenedor.Contenedor("./data/mensajes.txt");

const getProducts = async () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const respuesta = await fetch(
    "https://res.cloudinary.com/deqsgq7p0/raw/upload/v1664886317/Back-app/productos_t7tdx.txt",
    requestOptions
  )
    .then((response) => response.text())
    .catch((error) => console.log("error", error));

  return JSON.parse(respuesta);
};

const hbs = require("express-handlebars");

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
  const mensajesCheck = await archivoMensajes.getAll();
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
  const mensajes = await archivoMensajes.getAll();

  console.log("¡Nuevo cliente conectado!");

 
  socket.emit("productos", productos);
  socket.emit("mensajes", mensajes);


  socket.on("producto", (data) => {
    productos.push(data);
    io.sockets.emit("productos", productos);
  });
  socket.on("mensaje", async (data) => {
    await archivoMensajes.save(data);
    const mensajes = await archivoMensajes.getAll();
    io.sockets.emit("mensajes", mensajes);
  });
});