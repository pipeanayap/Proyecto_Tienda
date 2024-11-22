//MVC
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const productosSchema = new Schema({
    nombre:{
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    categoriasProducto: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categoria'
        }
    ],
    imagenes: {
        type: String, // Array de URLs de imágenes
        required: false
    },
    
})

const Producto = mongoose.model('Producto', productosSchema, 'productos');
module.exports = Producto;