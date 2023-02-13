
const isLogged = ((req, res, next) => {
    let msgError = `Debe iniciar sesión`
    if (req.user) {
        next();
    } else {
        return res.render('error', { msgError })
    }
});

module.exports = isLogged