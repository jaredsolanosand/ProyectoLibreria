module.exports = (idlibro, titulolibro, autoreslibro, editoriallibro, fechaPublicacionlibros) => {
    let id = idlibro.valueOf()
    let titulo = titulolibro.valueOf()
    let autores = autoreslibro.valueOf()
    let editorial = editoriallibro.valueOf()
    let fechaPublicacion = fechaPublicacionlibros.valueOf()

    return {
        obtenerId: () => {
            return id;
        },
        obtenerTitulo: () => {
            return titulo;
        },
        obtenerAutores: () => {
            return autores;
        },
        obtenerEditorial: () => {
            return editorial;
        },
        obtenerFechaPublicacion: () => {
            return fechaPublicacion;
        },
        toString: () => {
            return `${titulo} ${autores} ${editorial} ${fechaPublicacion}`;
        }
    };
};

