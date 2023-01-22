const ProductsDTO = require("../../dto/ProductsDTO");

class Contenedor {
    constructor(mongoDB, productsModel) {
        this.mongoDB = mongoDB;
        this.productsModel = productsModel;
    }

    async save(product) {
        try {
            const newProduct = new this.messageModel(product);
          
            this.mongoDB
                .then(_ => newProduct.save())
                .catch(err => console.log(`Error: ${err.message}`));

        } catch (error) {
            throw Error(`Error en save`);
        }
    }

    async getAll() {
        try {
            let docs = false;
            docs = await this.productsModel.find();
            const productDTO = products.map(product => new ProductsDTO(product));
            if (productDTO) {
                return productDTO;
            } else {
                return false;
            }
        } catch (error) {
            throw Error(`Error en getAll`);
        }
    }

}
module.exports = Contenedor;
