const {Schema, model} = require('mongoose');
const validator = require('validator');

const User = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 70
    },
    birthday: {
        type: Date,
        required: true
    },
    batch: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        required: true,
        maxlength: 40,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Introduzca un correo válido.']
    },
    password:{
        required: true,
        type: String,
        minlength: 8
    },
    profilePic: {
        type: String
    },
    coverPic: {
        type: String
    },
    gender: {
        type: String,
        enum: ['masculino', 'femenino']
    },
    about: {
        type: String,
        maxlength: 300,
        trim: true
    },
    role: {
        type: String,
        enum: ['IRONHACKER', 'STAFF'],
        default: 'IRONHACKER'
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, {
    timestamps: true
});

module.exports = model('User', User);






