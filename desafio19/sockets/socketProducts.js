const ProductsDAOMongoDB = require(`../daos/ProductsDAOMongoDB`);

const storageProducts = new ProductsDAOMongoDB();

const socketIoProducts = (io) => {
    io.on(`connection`, socket => {
        socket.on(`sendProduct`, async () => {
            const allProductsFromDB = await storageProducts.getAll();
            socket.emit(`allProducts`, allProductsFromDB);

        });

        socket.on(`addProducts`, async data => {
            const newProducto = {
                title: `${data.name}`,
                price: Number(data.price),
                thumbnail: `${data.img}`
            };

            const product = await storageProducts.save(newProducto);

            io.sockets.emit(`refreshTable`, product);

        });
    });

}

module.exports = socketIoProducts;