import express from "express";
import { passport } from "../middlewares/passport.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import {
  loginGet,
  loginPost,
  loginFailGet,
  logoutGet,
} from "../controllers/ControllerLogin.js";

const { Router } = express;
const login = Router();

login.use(cookieParser());
login.use(
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

login.get("/login", loginGet);
login.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  loginPost
);
login.get("/faillogin", loginFailGet);
login.get("/logout", logoutGet);

export default login;
