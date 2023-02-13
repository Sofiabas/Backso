//MOCHA

const ProductosDAOMongoDB = require(`../modelDAOs/ProductosDAOMongoDB`);
const assert = require(`assert`);

//Describe: agrupa pruebas similares
//it: contiene nuestro codigo de prueba

describe(`Test sobre Productos`, () => {

    //VER TODOS LOS PRODUCTOS

    it(`Debería obtener todos los productos`, async () => {
        const productoDAO = new ProductosDAOMongoDB();
        const allProducts = await productoDAO.getAll();

        assert(allProducts.length > 0);
    });

    //AGREGAR PRODUCTO

    // it(`Debería crear un producto`, async () => {
    //     const productoDAO = new ProductosDAOMongoDB();

    //     const allProductsBefore = await productoDAO.getAll();

    //     const newProducto = {
    //         nombre: `perfume desde test mocha `,
    //         precio: 12345,
    //         url: `URL desde test mocha`,
    //         descripcion: `descripción desde test mocha 26enero`,
    //         timestamp: new Date().toDateString(),
    //         thumbnail: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpiHylv1gJeLH8QHKWECa7dDx1KWwvOfMuPi5QB5wbJI3WYJf5NGvXBOHe1yr2zRgqZHo&usqp=CAU`,
    //         codigo: 123458,
    //         stock: 5,
    //         cantidad: 0
    //     }

    //     await productoDAO.save(newProducto);

    //     const allProductsAfter = await productoDAO.getAll();

    //     assert(allProductsAfter.length > allProductsBefore.length);
    // });

    //UPDATE nota: cambiar el nombre cada vez, sino no se modifica

    // it(`Debería modificar un producto`, async () => {
    //     const productoDAO = new ProductosDAOMongoDB();

    //                //id a modificar
    //     const id = `63d0a7df92941d7df1c2eefa`;

    //     const productBefore = await productoDAO.getById(id);
    //     console.log(`productBefore`);
    //     console.log(productBefore);

    //     const productUpdate = await productoDAO.updateById(
    //         id,
    //         `Perfume con modificacion desde test`,
    //         5300,
    //         `Foto modificada desde test`,
    //         `Descripción modificada desde test 26enero`,
    //         new Date().toDateString(),
    //         9999,
    //         10
    //     );
    //     console.log(`productUpdate`);
    //     console.log(productUpdate);

    //     assert(productBefore.nombre != productUpdate.nombre);

    // });

   // DELETE

    // it(`Debería borrar un producto`, async () => {
    //     const productoDAO = new ProductosDAOMongoDB();
    //     const allProductsBefore = await productoDAO.getAll();

    //     //Colocar un id conocido de la DB
    //     await productoDAO.deleteById(`63d298795d9f9efa496a35b7`);
    //     const allProductsAfter = await productoDAO.getAll();
    // });

});


