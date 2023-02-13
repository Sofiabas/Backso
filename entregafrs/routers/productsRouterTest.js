const { Router } = require("express");

const {
    getAllProductsTest,
    addProductTest,
    deleteProductByIdTest,
    updateProductByIdTest
} = require("../services/productsTest.service");

const productosRouterTest = Router();

productosRouterTest.get(`/`, getAllProductsTest);
productosRouterTest.post(`/`, addProductTest);
productosRouterTest.put(`/:id`, updateProductByIdTest);
productosRouterTest.delete(`/:id`, deleteProductByIdTest);


module.exports = productosRouterTest;