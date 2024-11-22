const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');
const Categoria = require('../models/categoria');
const bodyParser = require('body-parser');

router.use(bodyParser.json());  // Para que pueda parsear application/json

router.get('/productos', async (req, res) => {
    try {
        // Usar populate para incluir solo los nombres de las categorías
        const productos = await Producto.find().populate('categoriasProducto', 'nombre -_id');
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productos', error });
    }
});

router.get('/productos/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id).populate('categoriasProducto', 'nombre -_id');
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el producto', error });
    }
});

router.delete('/productos/:id', async (req, res) => {
    Producto.deleteOne({ _id: req.params.id })
        .then((producto) => {
            res.json(producto);
        })
        .catch((error) => {
            res.send(error);
        });
});

router.put('/productos/:id', async (req, res) => {
    try {
        const { nombre, precio, categoriasProducto, imagenes } = req.body;
        
        let categoriasIds;
        if (categoriasProducto) {
            categoriasIds = await Categoria.find({ nombre: { $in: categoriasProducto } }, '_id');

            if (categoriasIds.length !== categoriasProducto.length) {
                return res.status(400).json({ mensaje: 'Algunas categorías no existen en la base de datos' });
            }
        }

        //devuelve 2do si se cumple 1ro
        const actualizacion = {
            ...(nombre && { nombre }), // Agregar "nombre" si está presente en req.body
            ...(precio && { precio }),
            ...(imagenes && { imagenes }), 
            ...(categoriasProducto && { categoriasProducto: categoriasIds.map(cat => cat._id) })
        };
        const productoActualizado = await Producto.updateOne({ _id: req.params.id }, actualizacion);

        if (productoActualizado.matchedCount === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.json({ mensaje: 'Producto actualizado exitosamente', productoActualizado });
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ mensaje: 'Error al actualizar producto', error });
    }
});
router.post('/productos', async (req, res) => {
    try {
        const { nombre, precio, categoriasProducto, imagenes } = req.body;

        // Busca en mi base de Categorías (en su variable nombre) si existen las categorías que me pasaron y me regresa el Id
        const categoriasIds = await Categoria.find({ nombre: { $in: categoriasProducto } }, '_id');

        if (categoriasIds.length !== categoriasProducto.length) {
            return res.status(400).json({ mensaje: 'Algunas categorías no existen' });
        }

        const producto = new Producto({
            nombre,
            precio,
            // Convierte el arreglo de objetos (categoriasIds) en un arreglo con solo los _id de las categorías.
            categoriasProducto: categoriasIds.map(cat => cat._id),
            imagenes
        });

        await producto.save();
        //El populate solo afecta al campo que le indico
        //El producto._id es el producto que recien cree
        res.json(await Producto.findById(producto._id).populate('categoriasProducto', 'nombre'));
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear producto', error });
    }
});


module.exports = router;
