const { Router } = require("express");

const { errorSignup } = require(`../controller/errorSigning`);

const errorSignupRouter = Router();

errorSignupRouter.get(`/`, errorSignup);

module.exports = errorSignupRouter;