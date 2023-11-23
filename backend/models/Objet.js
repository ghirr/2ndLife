const mongoose = require('mongoose');  

const objetSchema= mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    categorie:{
        type: String,
        required: true,
    },
    description:String,
    price:{
        type: Number,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    userphone:{
        type: String,
        required: true,
    },
    adresse:String,

})

const objet = mongoose.model("objets",objetSchema) 

module.exports=objet