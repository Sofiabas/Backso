const mongoDB = require(`../repo/config/mongoDB`);
const productsModel = require(`../repo/models/producto`);

const CrudMongoDB = require(`../repo/containers/products`);

class ProductosDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, productsModel);
    };
};

module.exports = ProductosDAOMongoDB;