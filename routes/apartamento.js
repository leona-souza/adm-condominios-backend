const express = require("express");
const router = express.Router();
const Apartamento = require("../model/apartamento");
const Morador = require("../model/morador");
const Veiculo = require("../model/veiculo");
const Visitante = require("../model/visitante");
const Functions = require("../resources/Functions");
const sort = {numero: 1};

router.get("/", Functions.paginatedResults(Apartamento, sort), (req,res) => {
    try {
        /* const apartamentos = Apartamento.find(); */
        res.json(res.paginatedResults);
    } catch(err) {
        res.send("Erro: "+ err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const apartamentos = await Apartamento.findById(req.params.id);
        res.json(apartamentos);
    } catch(err) {
        res.send("Erro: "+ err);
    }
});

router.get("/list/:string", async (req, res) => {
    try {
        const array = req.params.string.split(",");
        const apartamentos = await Apartamento.find({'_id': { $in: array}});
        res.json(apartamentos);
    } catch(err) {
        res.send("Erro: "+ err);
    }
});

router.get("/:id/moradores", async (req, res) => {
    try {
        const moradores = await Morador.find({ apartamentoMorador: req.params.id });
        res.json(moradores);
    } catch(err) {
        res.send("Erro: "+ err);
    }
});

router.get("/:id/veiculos", async (req, res) => {
    try {
        const veiculos = await Veiculo.find({ apartamentoVeiculo: req.params.id });
        res.json(veiculos);
    } catch(err) {
        res.send("Erro: "+ err);
    }
});

router.get("/:id/visitantes", async (req, res) => {
    try {
        const visitantes = await Visitante.find({ apartamentoVisitante: req.params.id });
        res.json(visitantes);
    } catch(err) {
        res.send("Erro: "+ err);
    }
});

router.post("/", async (req, res) => {
    try {
        const apartamento = new Apartamento(req.body);
        const operacao = await apartamento.save();
        res.json(operacao);
    } catch (err) {
        res.send("Erro: "+ err);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const novoApartamento = req.body;
        const operacao = await Apartamento.findByIdAndUpdate(id, novoApartamento, {new: true});
        res.send(operacao);
    } catch (err) {
        res.send("Erro: "+ err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const apartamento = await Apartamento.findById(req.params.id);
        const operacao = apartamento.deleteOne(apartamento);
        res.json(operacao);
    } catch (err) {
        res.send("Erro: "+ err);
    }
})

module.exports = router;