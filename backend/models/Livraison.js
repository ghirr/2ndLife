const mongoose = require('mongoose');  

const livraisonSchema= mongoose.Schema({
    Objectname:{
        type: String,
        required: true,
    },
    ObjectUsername:{
        type: String,
        required: true,
    },
    ObjectAdresse:{
        type: String,
        required: true,
    },
    ObjectPhone:{
        type: String,
        required: true,
    },
    costumername:{
        type: String,
        required: true,
    },
    costumerphone:{
        type: String,
        required: true,
    },
    costumeradresse:String,
    adresse:String,
})

const livraison = mongoose.model("livraisons",livraisonSchema) 

module.exports=livraison