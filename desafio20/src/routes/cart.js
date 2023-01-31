import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { cartGet, cartPost } from "../controllers/ControllerCart.js";

const { Router } = express;
const cart = Router();

cart.use(cookieParser());
cart.use(
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

cart.get("/cart", cartGet);
cart.post("/cart", cartPost);

export default cart;
