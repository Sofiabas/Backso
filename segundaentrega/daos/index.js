import ProductosDaoArchivo from "./productos/productoArchivo.js";
import CarritosDaoArchivo from "./carrito/carritoArchivo.js";

import ProductosDaoMongoDb from "./productos/productoMongo.js";
import CarritosDaoMongoDb from "./carrito/carritoMongo.js";

import ProductosDaoFirebase from "./productos/productoFirebase.js";
import CarritosDaoFirebase from "./carrito/carritoFirebase.js";


let productosDao;
let carritosDao;

process.env.DB = "MongoDb";

console.log(process.env.DB);

switch (process.env.DB) {
  case "Archivo":
    productosDao = ProductosDaoArchivo;
    carritosDao = CarritosDaoArchivo;
    break;
  case "MongoDb":
    productosDao = ProductosDaoMongoDb;
    carritosDao = CarritosDaoMongoDb;
    break;
  case "Firebase":
    productosDao = ProductosDaoFirebase;
    carritosDao = CarritosDaoFirebase;
    break;
}

export { productosDao, carritosDao };
