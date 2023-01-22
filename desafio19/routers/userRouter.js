const { Router } = require(`express`);
const login = require("../authentication/login");
const signup = require("../authentication/signup");
const serializeUser = require(`../authentication/serializeUser`);
const deserializeUser = require(`../authentication/deserializeUser`);
const passport = require('passport');

const {
    signupFormController,
    loginFormController,
    logoutController,
    profileController
} = require(`../controller/user`);


const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/avatar')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({ storage });

login();
signup();
serializeUser();
deserializeUser();

const loginRouter = Router();
const signupRouter = Router();
const logoutRouter = Router();
const profileRouter = Router();


loginRouter.get(`/`, loginFormController);
loginRouter.post('/', passport.authenticate('login', { 
    successRedirect: '/bienvenida', 
    failureRedirect: `/error/ Error al iniciar sesión`, 
    failureFlash: true  
}));


signupRouter.get(`/`, signupFormController);
signupRouter.post('/', upload.single('avatar'), passport.authenticate('signup', {
    failureRedirect: `/error/ Error al crear la cuenta`, 
    failureFlash: true 
}));


profileRouter.get(`/`, profileController);


logoutRouter.get(`/`, logoutController);

module.exports = {
    signupRouter,
    loginRouter,
    logoutRouter,
    profileRouter,
};