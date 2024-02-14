const express = require('express');
const controladorLibros = require('../controladores/libros');
const router = express.Router();

router.post('/libros/:id/:titulo/:autores/:editorial/:fechaPublicacion', (peticion, respuesta) => {
    controladorLibros.crearLibros(peticion, respuesta);
});

router.delete('/libros/:id', (peticion, respuesta) => {
    controladorLibros.borrarLibro(peticion, respuesta);
});

router.get('/libros/:id', (peticion, respuesta) => {
    controladorLibros.obtenerLibro(peticion, respuesta);
});

router.put('/libros/:id/:titulo/:autores/:editorial/:fechaPublicacion', (peticion, respuesta) => {
    controladorLibros.modificarLibro(peticion, respuesta);
});

module.exports = router;
