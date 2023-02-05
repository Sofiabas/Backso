import ServiciosCarritos from "../services/ServiceCarritos.js";
const carrito = new ServiciosCarritos();

const carritosGetAll = async (req, res) => {
  const resultado = await carrito.getAll();
  res.send(resultado);
};

const carritosPost = async (req, res) => {
  const carritoAdicional = req.body;
  const products = carritoAdicional.products;
  const userid = carritoAdicional.userid;
  const resultado = await carrito.saveCart(products, userid);
  res.send({ idNuevoCarrito: resultado });
};

const carritosDelete = async (req, res) => {
  const { id } = req.params;
  const resultado = await carrito.deleteById(id);
  res.send(resultado);
};

const carritosGetId = async (req, res) => {
  const { id } = req.params;
  const resultado = await carrito.getById(id);
  res.send(resultado);
};

const carritosPostId = async (req, res) => {
  const { id } = req.params;
  const productoAdicional = req.body;
  const resultado = await carrito.saveById(id, productoAdicional);
  res.send(resultado);
};

const carritosDeleteId = async (req, res) => {
  const { id, id_prod } = req.params;
  const resultado = await carrito.deleteByProduct(id, id_prod);
  res.send(resultado);
};

export {
  carritosGetAll,
  carritosPost,
  carritosDelete,
  carritosGetId,
  carritosPostId,
  carritosDeleteId,
};
