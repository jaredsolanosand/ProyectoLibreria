const modeloLibro = require('../modelos/libros.js');
const { v4: uuidv4 } = require('uuid');
var libros = {};

module.exports = {

    crearLibros: (peticion, respuesta) => {
        const id = uuidv4(); 
        const nuevoLibro = modeloLibro(
            id, peticion.params.titulo, peticion.params.autores, peticion.params.editorial, peticion.params.fechaPublicacion
        );

        libros[id] = nuevoLibro;

        let urlNuevoLibro = `/libros/${id}`;
        respuesta.status(201).send(urlNuevoLibro);
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

    buscarLibros: (titulo, autores, fechaInicio, fechaFin) => {

        const tituloMinusculas = titulo ? titulo.toLowerCase() : '';
        const autoresMinusculas = autores ? autores.toLowerCase() : '';

        const librosEncontrados = Object.values(libros).filter(libro => {

            const tituloLibro = libro.obtenerTitulo().toLowerCase();
            const autoresLibro = libro.obtenerAutores().toLowerCase();
            
            const tituloCoincide = !titulo || tituloLibro.includes(tituloMinusculas);
        
            const autoresCoinciden = !autores || autoresLibro.includes(autoresMinusculas);
            
            let fechaPublicacion = libro.obtenerFechaPublicacion();
            const fechaInicioValida = !fechaInicio || fechaPublicacion >= fechaInicio;
            const fechaFinValida = !fechaFin || fechaPublicacion <= fechaFin;
            
            return tituloCoincide && autoresCoinciden && fechaInicioValida && fechaFinValida;
        }).map(libro => {
            return {
                id: libro.obtenerId(),
                titulo: libro.obtenerTitulo(),
                autores: libro.obtenerAutores(),
                editorial: libro.obtenerEditorial(),
                fechaPublicacion: libro.obtenerFechaPublicacion()
            };
        });
    
        console.log("Libros encontrados:", librosEncontrados);
    
        return librosEncontrados;
    },
     
    obtenerDetallesDelLibro: (id) => {
        const libro = libros[id];
        if (libro) {
            return {
                id: libro.obtenerId(),
                titulo: libro.obtenerTitulo(),
                autores: libro.obtenerAutores(),
                editorial: libro.obtenerEditorial(),
                fechaPublicacion: libro.obtenerFechaPublicacion()
            };
        } else {
            return null; 
        }
    },
    
    mostrarFormularioModificarLibro: (peticion, respuesta) => {
        const id = peticion.params.id;
        console.log("ID QUE SE VA A MODIFICAR:", id);
        const libro = libros[id]; 
        if (!libro) {
            return respuesta.status(404).json({
                message: `No se encontró un libro con el ID ${id}`
            });
        }
        const vistasAnteriores = ['Pantalla Principal', 'Libros Buscados', 'Detalles Libro'];
        const nombreVistaActual = 'Editar Libro';
    
        respuesta.render('ModificarLibro', { id, libro, vistasAnteriores, nombreVistaActual });
    },
    
    modificarLibro: (peticion, respuesta) => {
        const id = peticion.params.id;
        console.log("ID QUE SE VA A MODIFICAR JEJEJE:", id);
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
    
        // Respuesta JSON para confirmar la modificación exitosa
        respuesta.json({
            message: `Libro con ID ${id} modificado exitosamente`
        });
    }
    
    
    
}

