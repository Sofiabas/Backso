const mongoose = require('mongoose');

const productoSchema = mongoose.Schema({
    link: {type:String, require:true},
    precioUnitario: {type: Number, required: true, default:0},
    descripcion: {type: String, required: true, max: 100},
    categoria: {type: String, required: true, max: 100},
});

module.exports = mongoose.model("Producto", productoSchema)