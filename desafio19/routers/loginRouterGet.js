const { Router } = require("express");

const { getLogin } = require(`../controller/logIn`);

const loginRouterGet = Router();

loginRouterGet.get(`/`, getLogin);

module.exports = loginRouterGet;