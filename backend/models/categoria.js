const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    productos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Producto'
        }
    ]
});

const Categoria = mongoose.model('Categoria', categoriaSchema, 'categorias');

module.exports = Categoria;