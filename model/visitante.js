const mongoose = require("mongoose");

const visitanteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    documento: {
        type: String,
        required: false
    },
    telefone: {
        type: String,
        required: false
    },
    obs: {
        type: String,
        required: false
    },
    apartamentoVisitante: {
        type: String,
        required: true
    }
});

visitanteSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

module.exports = mongoose.model("Visitante", visitanteSchema);