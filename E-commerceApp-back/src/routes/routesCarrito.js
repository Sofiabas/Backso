const express = require('express');

const { crearCarrito, eliminarCarritoPorId, obtenerCarritos, obtenerCarritoPorId, modificarItemsCarrito } = require("../controller/carritoController");

const router = express.Router();

router.route("/").post(crearCarrito).get(obtenerCarritos)

router.route("/:id").get(obtenerCarritoPorId)

router.route("/:id").put(modificarItemsCarrito)

router.route("/:id").delete(eliminarCarritoPorId)


module.exports = router