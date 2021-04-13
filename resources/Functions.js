paginatedResults = (modelo, sort) => {
    return async (req, res, next) => {
        const pagina = parseInt(req.query.pagina);
        const limite = parseInt(req.query.limite);
        const inicioIndex = (pagina - 1) * limite;
        const finalIndex = pagina * limite;
        const total = await modelo.countDocuments().exec();
        const listaResultados = {
            paginas: {},
            resultados: []
        };

        if (inicioIndex > 0) {
            listaResultados.paginas.paginaAnterior = pagina - 1;
        }
        if (finalIndex < total) {
            listaResultados.paginas.paginaProxima = pagina + 1;
        }

        listaResultados.paginas.total = total;
        listaResultados.paginas.limite = limite;
        listaResultados.resultados = await modelo.find().sort(sort).limit(limite).skip(inicioIndex).exec();

        res.paginatedResults = listaResultados;
        next();
    }
}

exports.paginatedResults = paginatedResults;