import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import chatGet from "../controllers/ControllerChat.js";

const { Router } = express;
const chat = Router();

chat.use(cookieParser());
chat.use(
  session({
    secret: "keyboard cat",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 10 * 60 * 1000,
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);

chat.get("/chat", chatGet);

export default chat;
