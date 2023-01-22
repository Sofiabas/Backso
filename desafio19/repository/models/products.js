const { Schema, model } = require(`mongoose`);

const productsSchema = new Schema({
    title: { type: String, required: true },
    detail: { type: String, required: false },
    code: { type: Number, required: false },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    stock: { type: Number, required: false },
});

module.exports = model(`Productos`, productsSchema);
