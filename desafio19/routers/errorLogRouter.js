const { Router } = require("express");

const { errorLog } = require(`../controller/errorInLog`);

const errorLogRouter = Router();

errorLogRouter.get(`/`, errorLog);

module.exports = errorLogRouter;