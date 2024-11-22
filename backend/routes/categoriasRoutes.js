const express = require('express');
const router = express.Router();
const Categoria = require('../models/categoria');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/categorias', async (req, res) => {
    Categoria.find()
        .then((categorias) => {
            res.json(categorias);;
        })
        .catch((error) => {
            res.status(400).send(error)
        });

});

router.get('/categorias/:id', async (req, res) => {
    Categoria.findById(req.params.id)
        .then((categoria) => {
            res.json(categoria);
        })
        .catch((error) => {
            res.send(error);
        });
});

router.delete('/categorias/:id', async (req, res) => {

    Categoria.deleteOne({ _id: req.params.id })
        .then((categoria) => {
            res.json(categoria);
        })
        .catch((error) => {
            res.send(error);
        });
})

router.put('/categorias/:id', async (req, res) => {
    Categoria.updateOne({ _id: req.params.id }, req.body)
        .then((categoria) => {
            res.json(categoria);
        })
        .catch((error) => {
            res.send(error);
        });

    });


router.post('/categorias', async (req, res) => {
    Categoria.create(req.body)
        .then((categoria) => {
            res.json(categoria);
        })
        .catch((error) => {
            res.status(400).send(error);
});

});

module.exports = router;