const { Router } = require("express");

const { getForm } = require(`../controller/form`);

const formRouter = Router();

formRouter.get(`/`, getForm);

module.exports = formRouter;