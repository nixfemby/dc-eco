const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    guildID: { type: String },
    shopItems: { type: Array, default: [], required: true, },
    lastUpdated: { type: Date, default: new Date(), }
});

module.exports = mongoose.model('dceco_Shops', ShopSchema)