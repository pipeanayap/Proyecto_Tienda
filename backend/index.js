const express = require('express');
const app = express();
const mongoose = require('mongoose');
const conexion = require('./conexion');
const cors = require('cors');
app.use(cors());


const productosRoutes = require('./routes/productosRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');



mongoose.connect(conexion)
    .then(() => {
        console.log('Conectado a la base de datos')
    })
    .catch((error) => {
    console.log('Error al conectar a la base de datos')
    console.log(error)
    })

app.listen(3000, () => {
    console.log('Servidor iniciado')
});

app.use(productosRoutes);
app.use(categoriasRoutes);
app.use(usuariosRoutes);

//


