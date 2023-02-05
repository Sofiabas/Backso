import express from "express";
import {
  productosGetAll,
  productosGetId,
  productosPost,
  productosPut,
  productosDelete,
} from "../controllers/ControllerProductos.js";

import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const { Router } = express;
const apiProductos = Router();

const schema = buildSchema(`
type Producto {
  _id: ID,
  nombre: String,
  descripcion: String,
  codigo: Int,
  precio: Float,
  stock: Int,
  timestamp: Float,
  foto: String,
  id: Int,
}
input ProductoInput {
  nombre: String,
  descripcion: String,
  codigo: Int,
  precio: Float,
  stock: Int,
  foto: String,
}
  type Query {
    productosGetAll: [Producto]
    productosGetId(id: Int): Producto,
  }
  type Mutation {
    productosPost(datos: ProductoInput): Producto
    productosPut(id: Int, datos: ProductoInput): Producto,
    productosDelete(id: Int): Producto,
  }
`);

apiProductos.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: {
      productosGetAll,
      productosGetId,
      productosPost,
      productosPut,
      productosDelete,
    },
    graphiql: true,
  })
);

export default apiProductos;
