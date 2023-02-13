const mongoDB = require(`../repo/config/mongoDB`);
const productsModel = require(`../repo/models/producto`);
const userModel = require(`../repo/models/user`);
const ordenModel = require(`../repo/models/ordenes`);

const CrudMongoDB = require(`../repo/containers/orders`);

class OrdenesDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, productsModel, userModel, ordenModel);
    };
};

module.exports = OrdenesDAOMongoDB;

