import express from "express";
import upload from "../middlewares/multer.js";
import { passport } from "../middlewares/passport.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import {
  registroGet,
  registroPost,
  registroFailGet,
} from "../controllers/ControllerRegistro.js";

const { Router } = express;
const registro = Router();

registro.use(cookieParser());
registro.use(
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

registro.get("/registro", registroGet);
registro.post(
  "/registro",
  upload.single("avatar"),
  passport.authenticate("signup", { failureRedirect: "/failregistro" }),
  registroPost
);
registro.get("/failregistro", registroFailGet);

export default registro;
