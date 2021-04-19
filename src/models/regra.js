const mongoose = require('mongoose')

const RegraSchema = new mongoose.Schema({
    sistema: {
        type:String,
        required:true

    },
    titulo:{
        type:String,
        required: true
    },
    funcionalidade: {
        type:String,
        required: true
       
    },
    descricao:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Regra', RegraSchema)
