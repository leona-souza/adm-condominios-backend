const mongoose = require("mongoose");

const visitaSchema = new mongoose.Schema({
    data: {
        type: Date,
        required: true
    },
    apartamento: {
        type: String,
        required: true
    },
    visitante: {
        type: String,
        required: true
    },
    obs: {
        type: String,
        required: false
    }
});

visitaSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

module.exports = mongoose.model("Visita", visitaSchema);