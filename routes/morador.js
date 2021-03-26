const express = require("express");
const router = express.Router();
const Morador = require("../model/morador");

router.get("/", async (req,res) => {
    try {
        const moradores = await Morador.find();
        res.json(moradores);
    } catch(err) {
        res.send("Erro: "+ err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const moradores = await Morador.findById(req.params.id);
        res.json(moradores);
    } catch(err) {
        res.send("Erro: "+ err);
    }
});

router.post("/", async (req, res) => {
    try {
        const morador = new Morador(req.body);
        const operacao = await morador.save();
        res.json(operacao);
    } catch (err) {
        res.send("Erro: "+ err);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const novoMorador = req.body;
        const operacao = await Morador.findByIdAndUpdate(id, novoMorador, {new: true});
        res.send(operacao);
    } catch (err) {
        res.send("Erro: "+ err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const morador = await Morador.findById(req.params.id);
        const operacao = morador.deleteOne(morador);
        res.json(operacao);
    } catch (err) {
        res.send("Erro: "+ err);
    }
})

module.exports = router;