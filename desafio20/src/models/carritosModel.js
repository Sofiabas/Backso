import mongoose from "mongoose";

const carritosCollection = "carritos";

const CarritoSchema = new mongoose.Schema({
  id: { type: Number },
  timestamp: { type: Number },
  productos: { type: Array },
  userid: { type: String },
});

const carritosModel = mongoose.model(carritosCollection, CarritoSchema);

export default carritosModel;
