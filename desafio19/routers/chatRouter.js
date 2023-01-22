const { Router } = require("express");

const { getChat } = require(`../controller/chat`);

const chatRouter = Router();

chatRouter.get(`/`, getChat);

module.exports = chatRouter;