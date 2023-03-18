const mongoose = require('mongoose');
const { MONGO_URI } = require('../config/globals')

mongoose.connect("mongodb+srv://tomascoder:tomascoder@e-commerceapp.3hfrnuw.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }, () => console.log('Connected'))

const usuariosCollection = 'usuarios';

const UsuarioSchema = new mongoose.Schema({
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100},
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100}
})

module.exports = mongoose.model(usuariosCollection, UsuarioSchema)