const { Router } = require("express");

const { bienvenida } = require(`../controller/welcome`);

const bienvenidaRouter = Router();

bienvenidaRouter.get(`/`, bienvenida);

module.exports = bienvenidaRouter;