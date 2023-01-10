const ProductosDAOMongoDB = require(`../daos/productos/ProductosDAOMongoDB`);
const CarritoDAOMongoDB = require(`../daos/carritos/CarritoDAOMongoDB`);
const OrdenesDAOMongoDB = require(`./ordenes/OrdenesDAOMongoDB`)

const getStorage = () => {
    const storage = process.env.STORAGE;

    switch (storage) {

        case `MongoDB`:
            return {
                productos: new ProductosDAOMongoDB(),
                carrito: new CarritoDAOMongoDB(),
                ordenes: new OrdenesDAOMongoDB()
            }
            break

        default:
            return {
                productos: new ProductosDAOMongoDB(),
                carrito: new CarritoDAOMongoDB(),
                ordenes: new OrdenesDAOMongoDB()
            }
            break
    }
}

module.exports = getStorage;