const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    guildID: { type: String },
    bank: { type: Number, default: 1 },
    lastUpdated: { type: Date, default: new Date() },
});

module.exports = mongoose.model('dceco_guildProfiles', ProfileSchema)