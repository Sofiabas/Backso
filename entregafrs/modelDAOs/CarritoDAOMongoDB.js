
const mongoDB = require(`../repo/config/mongoDB`);
const carritoModel = require(`../repo/models/carrito`);
const productsModel = require(`../repo/models/producto`);
const userModel = require(`../repo/models/user`);

const CrudMongoDB = require(`../repo/containers/carts`);

class CarritoDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, carritoModel, productsModel, userModel);
    };
};

module.exports = CarritoDAOMongoDB;

