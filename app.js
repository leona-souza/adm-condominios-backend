const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const cfgUrlDb = process.env.URL_DB;
const cfgPort = process.env.PORT;
mongoose.connect(cfgUrlDb,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
//const conexao = mongoose.connection;

app.use(express.json(), cors());

const apartamentoRouter = require("./routes/apartamento");
const moradorRouter = require("./routes/morador");
const visitanteRouter = require("./routes/visitante");
const veiculoRouter = require("./routes/veiculo");
const visitaRouter = require("./routes/visita");

app.use("/apartamentos", apartamentoRouter);
app.use("/moradores", moradorRouter);
app.use("/visitantes", visitanteRouter);
app.use("/veiculos", veiculoRouter);
app.use("/visitas", visitaRouter);

app.listen(cfgPort, () => {
    console.log("Connected. Listening on port "+ cfgPort);
});
