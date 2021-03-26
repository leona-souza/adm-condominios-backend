const mongoose = require("mongoose");

const apartamentoSchema = new mongoose.Schema({
    numero: {
        type: Number,
        required: true
    },
    torre: {
        type: String,
        required: true
    },
    vaga: {
        type: String,
        required: false
    },
    obs: {
        type: String,
        required: false
    }
});

apartamentoSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

module.exports = mongoose.model("Apartamento", apartamentoSchema);