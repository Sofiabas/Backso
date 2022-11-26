import {  option_SQLite } from "./config/SQLite3.js";
import knex from "knex";

const db = knex( option_SQLite );

const mensajesIniciales = [
  {
    email: "Marcos@gmail.com",
    fecha: "04/10/2022 08:27:00",
    text: "Hola"
   },
   {
    email: "Nino@gmail.com",
    fecha: "04/10/2022 08:28:50",
    text: "Cómo va?"
   },
   {
    email: "Franco@gmail.com",
    fecha: "04/10/2022 08:29:00",
    text: "Buenas"
   }
];

(async () => {
  try {
    await db.schema
      .dropTableIfExists("mensajes")
      .then(() => console.log("Tabla eliminada"))
      .catch((err) => {
        console.log(err);
        throw err;
      });

    await db.schema
      .createTable("mensajes", (table) => {
        table.string("email").notNullable();
        table.string("fecha").notNullable();
        table.string("text").notNullable();
        table.increments("id").primary().notNullable();
      })
      .then(() => console.log("Tabla de mensajes iniciada"))
      .catch((err) => {
        console.log(err);
        throw err;
      });

    await db("mensajes")
      .insert(mensajesIniciales)
      .then(() => console.log("Mensajes Iniciales creados"))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  } catch (err) {
    console.log(err);
  } finally {
    db.destroy();
  }
})();
