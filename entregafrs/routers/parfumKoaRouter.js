const Router = require('koa-router')

// Prefix all routes with /books
const router = new Router({
  prefix: '/api/parfums',
})

const parfums = [
  { id: 101, nombre: '212 Vip Rose', descripcion: 'EDP Carolina Herrera 212 Vip Rosé x 80 ml + EDP' , precio: 22000, stock: 12},
  { id: 102, nombre: 'Good Girl', descripcion: 'EDP Good Girl Supreme 30ml', precio: 30150, stock: 10 },
  { id: 103, nombre: 'Gentlemen', descripcion: 'EDT Givenchy Gentleman Intense x 100 ml', precio: 35000, stock: 20 },
  { id: 104, nombre: 'Very Irresistible', descripcion: 'EDP Givenchy Very Irresistible x 75 ml', precio: 30000, stock: 8 },
  { id: 105, nombre: 'Very Irresistible', descripcion: 'EDP Givenchy Very Irresistible x 75 ml', precio: 30000, stock: 8 },
]

/* ---------------------- Routes ----------------------- */
/* API REST Get All */
router.get('/', ctx => {
  ctx.body = {
    status: 'success',
    message: parfums,
  }
})

/* API REST Get x ID */
router.get('/:id', ctx => {
  const getCurrentParfum = parfums.filter(function (parfum) {
    if (parfum.id == ctx.params.id) {
      return true
    }
  })

  if (getCurrentParfum.length) {
    ctx.body = getCurrentParfum[0]
  } else {
    ctx.response.status = 404
    ctx.body = {
      status: 'error!',
      message: 'Perfume no encontrado con ese Id!',
    }
  }
})

/* API REST Post */
router.post('/', ctx => {
  // Check if any of the data field not empty
  if (
    !ctx.request.body.id ||
    !ctx.request.body.nombre ||
    !ctx.request.body.descripcion||
    !ctx.request.body.precio ||
    !ctx.request.body.stock
  ) {
    ctx.response.status = 400
    ctx.body = {
      status: 'error',
      message: 'Por favor, verifique los datos ingresados',
    }
  } else {
    const newBook = parfums.push({
      id: ctx.request.body.id,
      nombre: ctx.request.body.nombre,
      descripcion: ctx.request.body.descripcion,
      precio: ctx.request.body.precio,
      stock: ctx.request.body.stock,
    })
    ctx.response.status = 201
    ctx.body = {
      status: 'success',
      message: `Nuevo perfume agregado con id: ${ctx.request.body.id} & nombre: ${ctx.request.body.nombre}`,
    }
  }
})

/* API REST Put */
router.put('/update/:id', ctx => {
  // Check if any of the data field not empty
  if (
    !ctx.request.body.id ||
    !ctx.request.body.nombre ||
    !ctx.request.body.descripcion||
    !ctx.request.body.precio||
    !ctx.request.body.stock
  ) {
    ctx.response.status = 400
    ctx.body = {
      status: 'error',
      message: 'Por favor, ingrese los datos',
    }
  } else {
    const id = ctx.params.id
    const index = parfums.findIndex(parfum => parfum.id == id)
    parfums.splice(index, 1, ctx.request.body)
    ctx.response.status = 201
    ctx.body = {
      status: 'success',
      message: `Perfume modificado con id: ${ctx.request.body.id} & name: ${ctx.request.body.nombre}`,
    }
  }
})

/* API REST Delete */
router.delete('/delete/:id', ctx => {
  const id = ctx.params.id
  const index = parfums.findIndex(parfum => parfum.id == id)
  parfums.splice(index, 1)
  ctx.response.status = 200
  ctx.body = {
    status: 'success',
    message: `El perfume con id: ${id} ha sido borrado`,
  }
})

module.exports = router