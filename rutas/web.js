const express = require('express');
const controladorLibros = require('../controladores/libros');
const router = express.Router();
const vistasAnteriores = ['Libro', 'DetallesLibro'];
const nombreVistaActual = 'Index'; // o cualquier otro nombre que corresponda a tu vista actual


router.get('/', (peticion, respuesta) => {
     var vistasAnteriores =[''];
     var nombreVistaActual = 'Pantalla Principal';
    respuesta.render('Index', { vistasAnteriores, nombreVistaActual });
});


router.post('/libros/:id/:titulo/:autores/:editorial/:fechaPublicacion', (peticion, respuesta) => {
    controladorLibros.crearLibros(peticion, respuesta);
});

router.delete('/libros/:id', (peticion, respuesta) => {
    controladorLibros.borrarLibro(peticion, respuesta);
});

router.get('/buscar-libros', (peticion, respuesta) => {
    const { titulo, autores, fechaPublicacion } = peticion.query;
    const librosEncontrados = controladorLibros.buscarLibros(titulo, autores, fechaPublicacion);
    const vistasAnteriores = ['Pantalla Principal'];
    const nombreVistaActual = 'libros Buscados';

    respuesta.render('libro', { 
        libros: librosEncontrados, 
        vistasAnteriores: vistasAnteriores, 
        nombreVistaActual: nombreVistaActual 
    });
});

router.get('/libros/:id', (peticion, respuesta) => {
    controladorLibros.obtenerLibro(peticion, respuesta);
});

router.get('/libros/detalles/:id', (peticion, respuesta) => {
    const libroId = peticion.params.id;
    console.log('Datos del libro:', controladorLibros.obtenerDetallesDelLibro(libroId)); // Agrega este console.log para verificar los datos del libro
    const libro = controladorLibros.obtenerDetallesDelLibro(libroId); ;
    const vistasAnteriores = ['Pantalla Principal' , 'Libro'];
    const nombreVistaActual = 'Detalles Libro';
    respuesta.render('detallesLibro', { libro: libro, vistasAnteriores: vistasAnteriores, 
        nombreVistaActual: nombreVistaActual  }); 
});

router.put('/libros/:id/:titulo/:autores/:editorial/:fechaPublicacion', (peticion, respuesta) => {
    controladorLibros.modificarLibro(peticion, respuesta);
});

router.get('/libros/:id/editar', controladorLibros.mostrarFormularioModificarLibro);


module.exports = router;

