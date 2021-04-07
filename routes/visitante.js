const express = require("express");
const router = express.Router();
const Visitante = require("../model/visitante");
const Functions = require("../resources/Functions");

router.get("/", Functions.paginatedResults(Visitante), (req, res) => {
    try {
        /* const visitantes = await Visitante.find(); */
        res.json(res.paginatedResults);
    } catch(err) {
        res.send("Erro: "+ err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const visitantes = await Visitante.findById(req.params.id);
        res.json(visitantes);
    } catch(err) {
        res.send("Erro: "+ err);
    }
});

router.get("/list/:array", async (req, res) => {
    try {
        const array = req.params.array.split(",");
        const visitantes = await Visitante.find({'_id': { $in: array}});
        res.json(visitantes);
    } catch(err) {
        res.send("Erro: "+ err);
    }
});

router.get("/nome/:nome", async (req, res) => {
    try {
        const regexNome = new RegExp(req.params.nome, "i");
        const visitantes = await Visitante.find({ nome: regexNome });
        res.json(visitantes);
    } catch(err) {
        res.send("Erro: "+ err);
    }
});

router.post("/", async (req, res) => {
    try {
        const visitante = new Visitante(req.body);
        const operacao = await visitante.save();
        res.json(operacao);
    } catch (err) {
        res.send("Erro: "+ err);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const novoVisitante = req.body;
        const operacao = await Visitante.findByIdAndUpdate(id, novoVisitante, {new: true});
        res.send(operacao);
    } catch (err) {
        res.send("Erro: "+ err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const visitante = await Visitante.findById(req.params.id);
        const operacao = visitante.deleteOne(visitante);
        res.json(operacao);
    } catch (err) {
        res.send("Erro: "+ err);
    }
})

module.exports = router;