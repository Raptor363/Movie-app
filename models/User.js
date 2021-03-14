// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');

// const UserSchema = new Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     }
// });

// UserSchema.plugin(passportLocalMongoose);

// module.exports = mongoose.model('User', UserSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);