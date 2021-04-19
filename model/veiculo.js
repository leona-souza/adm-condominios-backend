const mongoose = require("mongoose");

const veiculoSchema = new mongoose.Schema({
    modelo: {
        type: String,
        required: false
    },
    marca: {
        type: String,
        required: false
    },
    cor: {
        type: String,
        required: false
    },
    placa: {
        type: String,
        required: true
    },
    obs: {
        type: String,
        required: false
    },
    apartamentoVeiculo: {
        type: String,
        required: true
    }
});

veiculoSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

module.exports = mongoose.model("Veiculo", veiculoSchema);