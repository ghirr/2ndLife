const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    googleid:String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    photo: {
        type: String,
    },
    password: {
        type: String,
        select: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user' // Set a default role if needed
    }
});
module.exports = mongoose.model('user', userSchema);