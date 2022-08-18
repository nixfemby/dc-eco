const mongoose = require('mongoose');

const InvSchema = new mongoose.Schema({
    guildID: { type: String }, 
    userID: { type: String },
    inventory: { type: Array, default: [], required: true },
    lastUpdated: { type: Date, default: new Date() },
});

module.exports = mongoose.model('dceco_Inventories', InvSchema);