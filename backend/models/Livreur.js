const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const livreurSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    numcin:{
        type:String,
        required:true,
        unique:true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    photo: {
        type: String,
    },
    password: {
        type: String,
        select: true,
    }
});
module.exports = mongoose.model('livreur', livreurSchema);