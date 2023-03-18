const Carrito = require("../models/carrito");

const crearCarrito = async(req, res) => {
    try {
        const { body } = req;
        const carritoAcrear = new Carrito( body )
        const carritoAlmacenado = await carritoAcrear.save()
        res.status(201).json( carritoAlmacenado )
    } catch (er) {
        const error = new Error("No se pudo crear el carrito")
        return res.status(404).json({msg:error.message})
    }
}

const obtenerCarritos = async(req, res) => {
    try {
        const carritos = await Carrito.find().populate('items')
        res.status(200).json(carritos)
    } catch (er) {
        const error = new Error("No se pudo obtener el carrito")
        return res.status(404).json({msg:error.message})
        
    }
}

const obtenerCarritoPorId = async(req, res) => {
    try {
        const {id} = req.params
        const carrito = await Carrito.findById(id).populate('items')
        res.status(200).json(carrito)
    } catch (er) {
        const error = new Error("No se pudo obtener el carrito por id")
        return res.status(404).json({msg:error.message})
        
    }
}

const eliminarCarritoPorId = async(req, res) => {
    try {
        const {id} = req.params
        await Carrito.deleteOne( {"_id": id});
        res.status(200);
    } catch (er) {
        const error = new Error("No se pudo eliminar el carrito")
        return res.status(404).json({msg:error.message})
        
    }
}

const modificarItemsCarrito = async(req, res) => {
    
    try {
        const {id} = req.params
        const { body } = req;
        await Carrito.updateOne
        (
            {
                _id : id
            },
            {
                $set :
                {
                    "items" : body.items
                }
            }
        )
        res.status(200);
    } catch (er) {
        const error = new Error("No se pudo modificar el carrito")
        return res.status(404).json({msg:error.message})
    }
}

module.exports = {crearCarrito, obtenerCarritoPorId, eliminarCarritoPorId, obtenerCarritos, modificarItemsCarrito }