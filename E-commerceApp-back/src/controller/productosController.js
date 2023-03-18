const Producto = require("../models/productos");

const crearProducto = async(req, res) => {
    try {
        const { body } = req
        const productoAcrear = new Producto( body )
        const productoAlmacenado = await productoAcrear.save()
        res.status(201).json( productoAlmacenado )

    } catch (er) {
        const error = new Error("No se pudo crear el producto")
        return res.status(404).json({msg:error.message})
    }
}

const obtenerProductos = async(req, res) => {
    try {
        const productos = await Producto.find()
        res.status(200).json(productos)
    } catch (er) {
        const error = new Error("No se pudo obtener el producto")
        return res.status(404).json({msg:error.message})
        
    }
}

const obtenerProductoPorId = async(req, res) => {
    try {
        const {id} = req.params
        const productos = await Producto.findById(id)
        res.status(200).json(productos)
    } catch (er) {
        const error = new Error("No se pudo obtener el producto por id")
        return res.status(404).json({msg:error.message})
        
    }
}



module.exports = {crearProducto, obtenerProductos, obtenerProductoPorId}
