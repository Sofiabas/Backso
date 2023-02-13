const {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
} = require("../services/productsGraphql");

const rootValueFn = () => {
    return {
        getAllProducts, 
        getProductById, 
        addProduct, 
        updateProductById, 
        deleteProductById 
    }

}

module.exports = rootValueFn;
