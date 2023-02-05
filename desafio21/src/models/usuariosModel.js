import mongoose from "mongoose";

const usuariosCollection = "usuarios";

const UsuarioSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  name: { type: String },
  address: { type: String },
  age: { type: String },
  phone: { type: String },
  avatar: { type: String },
});

const usuariosModel = mongoose.model(usuariosCollection, UsuarioSchema);

export default usuariosModel;
