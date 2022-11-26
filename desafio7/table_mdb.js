import { option_MDB } from "./config/m_DB.js";
import knex from "knex";

const db = knex(option_MDB);

const productosIniciales = [
  {
    title: "Pizza Peperoni",
    price: "2900",
    thumbnail: "https://cdn3.iconfinder.com/data/icons/food-and-drink-color/64/food_pizza_fastfood_snack_italian_fat_restaurant-512.png"
},
{
    title: "Pizza Vegeta",
    price: "2700",
    thumbnail: "https://cdn2.iconfinder.com/data/icons/pizza-9/500/SingleCartoonDifferentPizzaAlice_14-512.png"
},
{
    title: "Pizza Meat",
    price: "2950",
    thumbnail: "https://cdn2.iconfinder.com/data/icons/food-1136/512/pizza-food-cheese-recipe-homemade-512.png"
},
{
    title: "Pizza Margarita",
    price: "2500",
    thumbnail: "https://cdn4.iconfinder.com/data/icons/international-food-2/48/01-neapolitan_pizza_italy-512.png"
},
];

(async () => {
  try {
    await db.schema
      .dropTableIfExists("productos")
      .then(() => console.log("Tabla eliminada"))
      .catch((err) => {
        console.log(err);
        throw err;
      });

    await db.schema
      .createTable("productos", (table) => {
        table.string("title").notNullable();
        table.float("price");
        table.string("thumbnail").notNullable();
        table.increments("id").primary().notNullable();
      })
      .then(() => console.log("Tabla productos iniciada"))
      .catch((err) => {
        console.log(err);
        throw err;
      });

    await db("productos")
      .insert(productosIniciales)
      .then(() => console.log("Data base de productos"))
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
