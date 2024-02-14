module.exports = (app) => {

    app.use((peticion, respuesta, siguiente) => {
        let error = new Error('No encontrado')
        error.status = 404
        siguiente(error)
    })

    app.use((error, peticion, respuesta, siguiente) => {
        if (respuesta.headersSent) return
        respuesta.status(error.status || 500)
        respuesta.json({
            message: error.message,
            error: error
        })
    })

}
