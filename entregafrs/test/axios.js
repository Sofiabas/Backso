const axios = require(`axios`);

/*-----Ir comentando y descomentando en funcion de lo buscado */
const getData = async () => {
    const getProducts = await axios.get(`http://localhost:8315/test/productos`);
    console.log({
        status: getProducts.status,
        data: getProducts.data
    });
}
getData();

/*-----Ir comentando y descomentando en funcion de lo buscado */

// const addProduct = async () => {
//     const addProduct = await axios.post(`http://localhost:8315/test/productos`, {
//         nombre: `CACHAREL`,
//         precio: 14868,
//         thumbnail: `https://www.getthelook.com.ar/arquivos/ids/169270-260-260/229289_edp-cacharel-yes-i-am-delicious-x-75-ml_imagen-1.jpg?v=637962772158200000`,
//         descripcion: `EDP Givenchy L´Interdit x 125 ml + Muestra EDT Givenchy L'interdit x 1 ml`,
//         timestamp: new Date().toDateString(),
//         codigo: 12347,
//         stock: 6,
//     });

//     console.log({
//         status: addProduct.status,
//         data: addProduct.data
//     });
// }
// addProduct();

/*-----Ir comentando y descomentando en funcion de lo buscado */

// const putProduct = async () => {
//     const putProduct = await axios.put(`http://localhost:8315/test/productos/63d16d2fea7d89a508bff9c4`, {
//         nombre: `Modificacion producto desde axios`,
//         precio: 10000,
//         thumbnail: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpiHylv1gJeLH8QHKWECa7dDx1KWwvOfMuPi5QB5wbJI3WYJf5NGvXBOHe1yr2zRgqZHo&usqp=CAU`,
//         descripcion: `Nueva descripción desde Axios`,
//         timestamp: new Date().toDateString(),
//         codigo: 12345,
//         stock: 0,
//     });

//     console.log({
//         status: putProduct.status,
//         data: putProduct.data
//     });
// }
// putProduct();

/*-----Ir comentando y descomentando en funcion de lo buscado */

// const deleteProduct = async () => {
//     const deleteProduct = await axios.delete(`http://localhost:8315/test/productos/63d16d2e9240355fc0574088`);
//     console.log({
//         status: deleteProduct.status,
//         data: deleteProduct.data
//     });
// }
// deleteProduct();



