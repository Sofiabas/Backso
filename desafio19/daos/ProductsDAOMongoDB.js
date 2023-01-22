const mongoDB = require(`../repository/options/mongoDB`);

const productsModel = require(`../repository/models/products`);

const ContenedorProducts = require(`../repository/container/ContainerMessage`);

class ProductsDAOMongoDB extends ContenedorProducts {
    constructor() {
        super(mongoDB, productsModel);
    };
};

module.exports = ProductsDAOMongoDB;