import { loggerConsole } from "../utils/loggers.js";

const loginGet = async (req, res) => {
  req.session.inicio = Date.now();

  const usuario = req.session.user;
  if (usuario) loggerConsole.info(usuario._id);

  res.status(200).render("main", {
    user: req.session.user,
    body: req.session.products,
    lastuser: "",
  });
};

const loginPost = async (req, res) => {
  req.session.user = req.user;
  req.session.inicio = Date.now();
  res.status(200).render("main", {
    user: req.session.user,
    lastuser: "",
  });
};

const loginFailGet = async (req, res) => {
  res.status(200).render("faillogin", {
    user: "",
  });
};

const logoutGet = async (req, res) => {
  const user = req.session.user;
  req.session.destroy((error) => {
    if (!error) {
      res.status(200).render("main", {
        user: "",
        body: "",
        lastuser: user.name,
      });
    } else res.send({ error: error });
  });
};

export { loginGet, loginPost, loginFailGet, logoutGet };
