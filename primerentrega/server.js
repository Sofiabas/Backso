const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const { Router } = express;

const Contenedor = require("./class/contenedor.js");
const Carrito = require("./class/contenidoCarrito.js");


const administrator = true;
const productos = new Contenedor("./data/products.txt");
const apiProductosPath = Router();
app.use("/api/productos", apiProductosPath);


apiProductosPath.get("/", async (req, res) => {
  const resultado = await productos.getAll();
  res.send(resultado);
});


apiProductosPath.get("/:id", async (req, res) => {
  const { id } = req.params;
  const resultado = await productos.getById(id);
  res.send(resultado);
});


apiProductosPath.post("/", async (req, res) => {
  if (administrator) {
    const productoAdicional = req.body;
    const resultado = await productos.save(productoAdicional);
    res.send(resultado);
  } else {
    res.send({
      error: -1,
      descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
    });
  }
});


apiProductosPath.put("/:id", async (req, res) => {
  if (administrator) {
    const { id } = req.params;
    const productoAEditar = req.body;
    const resultado = await productos.saveById(id, productoAEditar);
    res.send(resultado);
  } else {
    res.send({
      error: -1,
      descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
    });
  }
});


apiProductosPath.delete("/:id", async (req, res) => {
  if (administrator) {
    const { id } = req.params;
    const resultado = await productos.deleteById(id);
    res.send(resultado);
  } else {
    res.send({
      error: -1,
      descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
    });
  }
});

const carrito = new Carrito("./data/cart.txt");
const apiCarrito = Router();
app.use("/api/carrito", apiCarrito);


apiCarrito.get("/", async (req, res) => {
  const resultado = await carrito.getAll();
  res.send(resultado);
});


apiCarrito.post("/", async (req, res) => {
  const carritoAdicional = req.body;
  const resultado = await carrito.save(carritoAdicional);
  res.send({ idNuevoCarrito: resultado });
});


apiCarrito.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const resultado = await carrito.deleteById(id);
  res.send(resultado);
});


apiCarrito.get("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const resultado = await carrito.getById(id);
  res.send(resultado);
});


apiCarrito.post("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const productoAdicional = req.body;
  const resultado = await carrito.saveById(id, productoAdicional);
  res.send(resultado);
});


apiCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
  const { id, id_prod } = req.params;
  const resultado = await carrito.deleteByProduct(id, id_prod);
  res.send(resultado);
});

//error Ruta
app.use((req, res) => {
  res.json({
    error: -2,
    descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada`,
  });
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Escuchando al puerto ${server.address().port}`);
});