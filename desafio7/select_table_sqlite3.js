import { option_SQLite  } from "./config/SQLite3.js";
import knex from "knex";

const db = knex( option_SQLite );

db.from("mensajes")
  .select("*")
  .then((rows) => {
    for (const row of rows) {
      console.log(
        `${row["id"]} ${row["fecha"]} ${row["email"]} ${row["text"]}`
      );
    }
  })
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    db.destroy();
  });
