const { Router } = require("express");

const { logout } = require(`../controller/logout`);

const logoutRouter = Router();

logoutRouter.get(`/`, logout);

module.exports = logoutRouter;
