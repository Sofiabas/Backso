
const Koa = require('koa')
const {koaBody} = require('koa-body')

// Require the Router we defined in parfumKoaRouter
const parfums = require('./routers/parfumKoaRouter.js')

const app = new Koa()
app.use(koaBody())

app.use(parfums.routes())

const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`Servidor Koa escuchando en el puerto 🪄 ${server.address().port}`)
})
server.on('error', error => console.log(' ⚠️ Error en Servidor Koa:', error))
