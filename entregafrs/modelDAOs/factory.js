const ProductosDAOMongoDB = require(`./ProductosDAOMongoDB`);
const CarritoDAOMongoDB = require(`./CarritoDAOMongoDB`);
const OrdenesDAOMongoDB = require(`./OrdenesDAOMongoDB`)

const getStorage = () => {
    const storage = `MongoDb`; 

    switch (storage) {

        case `MongoDb`:
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