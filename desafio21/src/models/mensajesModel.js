import mongoose from "mongoose";

const mensajesCollection = "mensajes";

const MensajeSchema = new mongoose.Schema({
  author: {
    id: { type: String },
    nombre: { type: String },
    apellido: { type: String },
    edad: { type: String },
    alias: { type: String },
    avatar: { type: String },
  },
  fecha: { type: String },
  text: { type: String },
});

const mensajesModel = mongoose.model(mensajesCollection, MensajeSchema);

export default mensajesModel;
