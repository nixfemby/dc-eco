const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    userID: { type: String },
    wallet: { type: Number, default: 1 },
    bank: { type: Number, default: 1 },
    inventory: { type: Array, default: [], required: true },
    lastUpdated: { type: Date, default: new Date() },
});

module.exports = mongoose.model('dceco_Profiles', ProfileSchema)