const { Router } = require(`express`);
const isLogged = require('../controller/admission');

const {
    homeController,
    signupController,
    bienvenidaController,
    viewFormAddProductController,
    viewErrorController
} = require(`../controller/generalControl`);

const viewsRouter = Router();

viewsRouter.get(`/`, homeController);
viewsRouter.get(`/signup`, signupController);
viewsRouter.get('/bienvenida',isLogged, bienvenidaController);
viewsRouter.get('/formAddProduct',isLogged, viewFormAddProductController);
viewsRouter.get('/error/:msg', viewErrorController);

module.exports = viewsRouter;