const { Router } = require(`express`);
const passport = require('passport');

const {
    login,
    signup,
    serializeUser,
    deserializeUser
} = require(`../controller/userAuthentication`);

const {
    signupFormController,
    loginFormController,
    logoutController,
    profileController
} = require(`../controller/userController`);

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

//Signup
signupRouter.get(`/`, signupFormController);
signupRouter.post('/', upload.single('avatar'), passport.authenticate('signup', {
    successRedirect: '/', 
    failureRedirect: `/error/ Error al crear la cuenta`, 
    failureFlash: true 
}));


profileRouter.get(`/`, profileController);
logoutRouter.get(`/`, logoutController);

module.exports = {
    signupRouter,
    loginRouter,
    logoutRouter,
    profileRouter
};