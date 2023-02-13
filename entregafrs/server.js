const express = require(`express`);
const app = express();
const session = require('express-session');
const isLogged = require('./controller/admission');
const passport = require('passport');
const log4js = require('./utils/logs');
const MongoStore = require(`connect-mongo`);
const { graphqlHTTP } = require(`express-graphql`)
const graphQLSchema = require(`./graphql/schema`);
const graphQLRootValue = require(`./graphql/root`);

const dotenv = require(`dotenv`);
dotenv.config();

app.use(express.static(`./public`));
app.use("/avatar", express.static("./public/avatar"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/graphql`, graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLRootValue(),
    graphiql: true
}))

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGOdb,
        ttl: 10,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}));
app.use(passport.initialize());
app.use(passport.session());

app.set(`views`, `./views`);
app.set(`view engine`, `ejs`);

const loggerConsole = log4js.getLogger(`default`);
const loggerArchiveWarn = log4js.getLogger(`warnArchive`);
const loggerArchiveError = log4js.getLogger(`errorArchive`);

app.use((req, res, next) => {
    loggerConsole.info(`
    Ruta: ${req.originalUrl}
    Metodo ${req.method}`);
    next();
});


const productosRouter = require(`./routers/productsRouter`);
const carritoRouter = require(`./routers/cartRouter`);
const { loginRouter } = require(`./routers/userRouter`);
const { signupRouter } = require(`./routers/userRouter`);
const { logoutRouter } = require(`./routers/userRouter`);
const { profileRouter } = require(`./routers/userRouter`);
const generalViewsRouter = require(`./routers/gralRouter`);
const ordenesRouter = require(`./routers/ordersRouter`);
const productosRouterTest = require(`./routers/productsRouterTest.js`);

app.use(`/`, generalViewsRouter);
app.use(`/api/productos`, isLogged, productosRouter);
app.use(`/api/carrito`, isLogged, carritoRouter);
app.use(`/api/ordenes`, isLogged, ordenesRouter);
app.use(`/login`, loginRouter);
app.use(`/signup`, signupRouter);
app.use('/logout', isLogged, logoutRouter);
app.use(`/profile`, isLogged, profileRouter);
app.use(`/test/productos`, productosRouterTest);


app.use((req, res) => {
    loggerConsole.warn(`
    Estado: 404
    Ruta consultada: ${req.originalUrl}
    Metodo ${req.method}`);

    loggerArchiveWarn.warn(`Status: 404, Ruta: ${req.originalUrl}, Metodo ${req.method}`);
    const msgError = `Status: 404, Ruta: ${req.originalUrl}, Metodo ${req.method}`;

    res.render(`error`, {msgError});

});


//Server
const { Server:HttpServer } = require("http")
const httpServer = new HttpServer(app)

const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs
.default({
    port: 8315
})
.argv

httpServer.listen(args.port, err => {
    if (err) throw err
    console.log(`>>>>> 🪄 Servidor escuchando en el puerto ${args.port}`)
})


