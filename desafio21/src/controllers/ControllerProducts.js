import ServiciosProductos from "../services/ServiceProductos.js";
const productos = new ServiciosProductos();

const productsGet = async (req, res) => {
  const products = await productos.getAll();

  res.status(200).render("products", {
    user: req.session.user,
    body: await productos.tablaProductos(products),
  });
};

export default productsGet;
