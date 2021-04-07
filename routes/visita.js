const express = require("express");
const router = express.Router();
const Visita = require("../model/visita");
const Functions = require("../resources/Functions");
const sort = {data: -1};

router.get("/", Functions.paginatedResults(Visita, sort), (req, res) => {
    try {
        /* const visitas = await Visita.find().sort({data: -1}); */
        res.json(res.paginatedResults);
    } catch(err) {
        res.send("Erro: "+ err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const visitas = await Visita.findById(req.params.id);
        res.json(visitas);
    } catch(err) {
        res.send("Erro: "+ err);
    }
});

router.post("/", async (req, res) => {
    try {
        const visita = new Visita(req.body);
        const operacao = await visita.save();
        res.json(operacao);
    } catch (err) {
        res.send("Erro: "+ err);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const novaVisita = req.body;
        const operacao = await Visita.findByIdAndUpdate(id, novaVisita, {new: true});
        res.send(operacao);
    } catch (err) {
        res.send("Erro: "+ err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const visita = await Visita.findById(req.params.id);
        const operacao = visita.deleteOne(visita);
        res.json(operacao);
    } catch (err) {
        res.send("Erro: "+ err);
    }
})

module.exports = router;