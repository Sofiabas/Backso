const ProductosDAOMongoDB = require(`./ProductsDAOMongoDB`);

const getStorage = () => {
    const storage = process.env.STORAGE;

    switch (storage) {

        case `MongoDB`:
            return {
                productos: new ProductosDAOMongoDB(),
            }
            break

        default:
            return {
                productos: new ProductosDAOMongoDB(),
            }
            break
    }
}

module.exports = getStorage;