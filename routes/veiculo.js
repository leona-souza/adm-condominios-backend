const express = require("express");
const router = express.Router();
const Veiculo = require("../model/veiculo");

router.get("/", async (req,res) => {
    try {
        const veiculos = await Veiculo.find();
        res.json(veiculos);
    } catch(err) {
        res.send("Erro: "+ err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const veiculo = await Veiculo.findById(req.params.id);
        res.json(veiculo);
    } catch(err) {
        res.send("Erro: "+ err);
    }
});

router.post("/", async (req, res) => {
    try {
        const veiculo = new Veiculo(req.body);
        const operacao = await veiculo.save();
        res.json(operacao);
    } catch (err) {
        res.send("Erro: "+ err);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const novoVeiculo = req.body;
        const operacao = await Veiculo.findByIdAndUpdate(id, novoVeiculo, {new: true});
        res.send(operacao);
    } catch (err) {
        res.send("Erro: "+ err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const veiculo = await Veiculo.findById(req.params.id);
        const operacao = veiculo.deleteOne(veiculo);
        res.json(operacao);
    } catch (err) {
        res.send("Erro: "+ err);
    }
})

module.exports = router;