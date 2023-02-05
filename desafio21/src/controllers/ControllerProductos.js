import ServiciosProductos from "../services/ServiceProductos.js";
const productos = new ServiciosProductos();

const administrador = process.env.admin;

const productosGetAll = async (req, res) => {
  const resultado = await productos.getAll();
  return resultado;
};

const productosGetId = async (req, res) => {
  const id = req.id;
  const resultado = await productos.getById(id);
  return resultado;
};

const productosPost = async (req, res) => {
  if (administrador) {
    const productoAdicional = req.datos;
    const resultado = await productos.saveProduct(productoAdicional);
    return resultado;
  } else {
    return {
      error: -1,
      descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
    };
  }
};

const productosPut = async (req, res) => {
  if (administrador) {
    const id = req.id;
    const productoAEditar = req.datos;
    const resultado = await productos.editById(id, productoAEditar);
    return resultado;
  } else {
    return {
      error: -1,
      descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
    };
  }
};

const productosDelete = async (req, res) => {
  if (administrador) {
    const id = req.id;
    const resultado = await productos.deleteById(id);
    return resultado;
  } else {
    return {
      error: -1,
      descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
    };
  }
};

export {
  productosGetAll,
  productosGetId,
  productosPost,
  productosPut,
  productosDelete,
};
