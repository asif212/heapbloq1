const mongoose = require('mongoose');

const userProfileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String
    },
    email: {
        type: String,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        match: /^(\+\d{1,3}[- ]?)?\d{10}$/
    },
    userType: { type: Number, default:1 },
    age: { type: Number },
    gender: { type: Number },
    weight: { type: Number },
    bio: { type: String },
    profile_pic_path: { type: String },
    isActiveGymer: { type: Boolean, default:false },
    coins: { type: Number, default:0 },
    totalMinutesWithUs: { type: Number, default:0 },
});

module.exports = mongoose.model('UserProfile', userProfileSchema);