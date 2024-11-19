const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');
const bodyParser = require('body-parser');

router.use(bodyParser.json());  // Para que pueda parsear application/json

router.get('/productos', async (req, res) => {
    Producto.find()
        .then((productos) => {
            res.json(productos);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
});

router.get('/productos/:id', async (req, res) => {
    Producto.findById(req.params.id)
        .then((producto) => {
            res.json(producto);
        })
        .catch((error) => {
            res.send(error);
        });
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

router.put('/productos/:id', (req, res) => {
    Producto.updateOne({ _id: req.params.id }, req.body)
        .then((producto) => {
            res.json(producto);
        })
        .catch((error) => {
            res.send(error);
        });
});

router.post('/productos', async (req, res) => {
    Producto.create(req.body)
        .then((producto) => {
            res.json(producto);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
});

module.exports = router;