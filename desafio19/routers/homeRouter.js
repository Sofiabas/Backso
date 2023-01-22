const { Router } = require("express");

const { getDataHome } = require(`../controller/inHome`);

const homeRouter = Router();

homeRouter.get(`/`, getDataHome);

module.exports = homeRouter;