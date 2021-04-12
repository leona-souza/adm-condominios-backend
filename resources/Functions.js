paginatedResults = (modelo, sort) => {
    return async (req, res, next) => {
        const pagina = parseInt(req.query.pagina);
        const limite = parseInt(req.query.limite);
        const inicioIndex = (pagina - 1) * limite;
        const finalIndex = pagina * limite;
        const total = await modelo.countDocuments().exec();
        const listaResultados = {};

        if (inicioIndex > 0) {
            listaResultados.anterior = {
                paginaAnterior: pagina - 1,
                limite: limite
            };
        }
        if (finalIndex < total) {
            listaResultados.proximo = {
                paginaProxima: pagina + 1,
                limite: limite
            };
        }

        listaResultados.total = total;
        listaResultados.resultados = await modelo.find().sort(sort).limit(limite).skip(inicioIndex).exec();
        res.paginatedResults = listaResultados;
        next();
    }
}

exports.paginatedResults = paginatedResults;