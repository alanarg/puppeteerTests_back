const mongoose = require('mongoose')

const objetoAnteriorSchema = new mongoose.Schema({
    Objeto: {
        type:String,
        required:true
    },
    Sistema:{
        type:String,
        require:true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
},{collection: "Objetos"})

module.exports = mongoose.model('ObjetoAnterior', objetoAnteriorSchema);
