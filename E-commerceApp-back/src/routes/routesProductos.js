const express = require('express');

const { crearProducto, obtenerProductos, obtenerProductoPorId } = require("../controller/productosController");

const router = express.Router();

router.route("/").post(crearProducto).get(obtenerProductos)

router.route("/:id").get(obtenerProductoPorId)

module.exports = router