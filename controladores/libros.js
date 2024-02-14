const modeloLibro = require('../modelos/libros.js')
var libros = {}
module.exports = {

    crearLibros: (peticion, respuesta) => {
        if (libros[peticion.params.id]) {
            respuesta.status(409).json({
                name: 'ID de libro ya existe',
                message: `Ya existe un libro con el ID ${peticion.params.id}`
            })
            return
        }
    
        libros[peticion.params.id] = modeloLibro(
            peticion.params.id, peticion.params.titulo, peticion.params.autores, peticion.params.editorial, peticion.params.fechaPublicacion
        )
        let urlNuevoLibro = `/Libros/${peticion.params.id}`
        respuesta.status(201).send(urlNuevoLibro)
    },

    borrarLibro: (peticion, respuesta) => {
        delete libros[peticion.params.id]
        let urlLibroBorrado = `/libros/${peticion.params.id}`
        respuesta.send(urlLibroBorrado)
    },

    obtenerLibro: (peticion, respuesta) => {
        if (!libros[peticion.params.id]) {
            respuesta.status(404).json({
                name: 'El libro no esta registrado.',
                message: `No existe ningún Libro con ID ${peticion.params.id}`
            })
        }
        let lbr = libros[peticion.params.id]
        respuesta.send(lbr.toString())
    },

    modificarLibro: (peticion, respuesta) => {
        const id = peticion.params.id;

        if (!libros[id]) {
            return respuesta.status(404).json({
                message: `No se encontró un libro con el ID ${id}`
            });
        }

        libros[id] = modeloLibro(
            id, 
            peticion.params.titulo, 
            peticion.params.autores, 
            peticion.params.editorial, 
            peticion.params.fechaPublicacion
        );

        respuesta.json({
            message: `Libro con ID ${id} modificado exitosamente`
        });
    }

}
