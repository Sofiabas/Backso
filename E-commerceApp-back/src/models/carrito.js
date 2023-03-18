const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carritoCollection = "Carrito";

const CarritoSchema = new mongoose.Schema({
  created_at: { 
    type: Date ,
    default: Date.now 
  },
  items: [{
    type: Schema.Types.ObjectId, 
    ref: 'Producto'
  }],
  address: { type: String }
});

module.exports = mongoose.model(carritoCollection, CarritoSchema);