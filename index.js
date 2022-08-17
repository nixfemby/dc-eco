const mongoose = require('mongoose');
const profile = require('./models/profile');
const shop = require('./models/guildShop');
let mongoUrl;

if (process.version.slice(1, 3) - 0 < 16) {
    throw new Error(
        `NodeJS Version 16 or newer is required, but you are using ${process.version}. See https://nodejs.org to update.`,
    );
}

class DcEco {

    /**
     * 
     * @param {string} dbUrl
     * @preserve
     */
    static async setMongoURL(dbUrl) {
        if (!dbUrl) throw new TypeError('A MongoDB database URL is required.');

        mongoUrl = dbUrl;
        return mongoose.connect(dbUrl);
    }

    /**
     * 
     * @param {string} userID
     * @returns User
     */
    static async createProfile(userID) {
        if (!userID) throw new TypeError("An user ID was not provided!");

        const isUser = await profile.findOne({ userID });
        if (isUser) return false;

        const user = new profile({
            userID
        });

        await user.save().catch(e => console.log(`Failed to create user! \nError: ${e}`));

        return user;
    }

    /**
     * 
     * @param {string} userID
     * @returns 
     */
    static async deleteProfile(userID) {
        if (!userID) throw new TypeError("An user ID was not provided!");

        const user = await profile.findOne({ userID });
        if (!user) return false;

        await profile.findOneAndDelete({ userID }).catch(e => console.log(`Failed to delete user! \nError: ${e}`));

        return user;
    }

    /**
     * 
     * @param {string} userID
     * @param {number} wb
     * @preserve
     * @returns 
     */
    static async addWalletBal(userID, wb) {
        if (!userID) throw new TypeError("An userID was not provided but is required!");
        if (wb === 0 || !wb || isNaN(parseInt(wb))) throw new TypeError("Amount to add to balance was not provided or invalid!");

        const user = await profile.findOne({ userID });

        if (!user) {
            const newUser = new profile({
                userID,
                wallet: wb,
            });

            await newUser.save().catch(e => console.log("Failed to save new user with given balance!"));

            return newUser;
        }

        user.wallet += parseInt(wb, 10);
        user.lastUpdated = new Date();

        await user.save().catch(e => console.log(`Failed to add wallet balance! \nError: ${e}`));

        return user;
    }

    /**
     * 
     * @param {string} userID
     * @param {number} bb
     * @preserve
     * @returns 
     */
    static async addBankBal(userID, bb) {
        if (!userID) throw new TypeError("An userID was not provided but is required!");
        if (bb === 0 || !bb || isNaN(parseInt(bb))) throw new TypeError("Amount to add to balance was not provided or invalid!");

        const user = await profile.findOne({ userID });

        if (!user) {
            const newUser = new profile({
                userID,
                bank: bb,
            });

            await newUser.save().catch(e => console.log("Failed to save new user with given balance!"));

            return newUser;
        }

        user.bank += bb;
        user.lastUpdated = new Date();

        await user.save().catch(e => console.log(`Failed to add bank balance! \nError: ${e}`));

        return user;
    }

    /**
     * 
     * @param {string} userID
     * @param {number} bb
     * @preserve
     * @returns 
     */
    static async setBankBal(userID, bb) {
        if (!userID) throw new TypeError("An userID was not provided but is required!");
        if (bb === 0 || !bb || isNaN(parseInt(bb))) throw new TypeError("Amount to set as balance was not provided or invalid!");

        const user = await profile.findOne({ userID });
        if (!user) return false;

        user.bank = bb;
        user.lastUpdated = new Date();

        await user.save().catch(e => console.log(`Failed to set bank balance! \nError: ${e}`));

        return user;
    }

    /**
     * 
     * @param {string} userID
     * @param {number} wb
     */
    static async setWalletBal(userID, wb) {
        if (!userID) throw new TypeError("An userID was not provided but is required");
        if (wb === 0 || !wb || isNaN(parseInt(wb))) throw new TypeError("Amount to set as balance was not provided or is invalid");

        const user = await profile.findOne({ userID });
        if (!user) return false;

        user.wallet = wb;
        user.lastUpdated = new Date();

        await user.save().catch(e => console.log(`Failed to set wallet balance! \nError: ${e}`));

        return user;
    }

    /**
     * 
     * @param {string} userID
     * @returns
     * @preserve
     */
    static async fetch(userID) {
        if (!userID) throw new TypeError("An userID was not provided but is required!");

        const user = await profile.findOne({ userID });
        if (!user) return false;

        return user;
    }

    /**
     * 
     * @param {string} guildID
     * @param {string} name
     * @param {string} type
     * @param {number} price
     * @param {*} meta
     */
    static async createShopItem(guildID, name, type, price, meta) {
        if(!guildID || !name || !price || price == "0" || isNaN(parseInt(price)) || !type || !meta) throw new TypeError("A required argument has not been provided!");

        const guildEntry = await shop.findOne({ guildID });
        const isShopItem = await shop.findOne({
            guildID,
            shopItems: {
                $elemMatch: {
                    name: name,
                },
            },
        });

        if(!guildEntry) {
            const newEntry = new shop({
                guildID,
                shopItems: { name: name, type: type, price: price, meta: meta},
            });

            await newEntry.save().catch(e => console.log(`Failed to create new entry! \nError: ${e}`));

            return newEntry;
        }

        if(guildEntry && isShopItem) return false;
        if(guildEntry && !isShopItem) {
            guildEntry.shopItems.push({name: name, type: type, price: price, meta: meta});
            await guildEntry.save().catch(e => console.log(`Failed to create new entry! \nError: ${e}`));

            return guildEntry;
        }
    }

    /**
     * 
     * @param {string} guildID 
     * @param {string} name 
     * @returns 
     */
    static async deleteShopItem(guildID, name) {
        if(!guildID) throw new TypeError("A guildID is required but has not been provided!");
        if(!name) throw new TypeError("The item name is required but hasn't been provided!");

        const isShopItem = await shop.findOne({
            guildID,
            shopItems: {
                $elemMatch: {
                    name: name,
                },
            },
        });
        if(!isShopItem) return false;

        const filteredItems = isShopItem.shopItems.filter(item => item.name !== name);

        isShopItem.shopItems = filteredItems;
        isShopItem.lastUpdated = new Date();

        await isShopItem.save().catch(e => console.log(`Failed to delete entry! \nError: ${e}`));

        return isShopItem;
    }

    /**
     * 
     * @param {string} guildID 
     * @param {string} name 
     * @returns 
     */
    static async fetchShopitem(guildID, name) {
        if(!guildID) throw new TypeError("A guildID is required but has not been provided!");
        if(!name) throw new TypeError("The item name is required but hasn't been provided!");

        const isShopItem = await shop.findOne({
            guildID,
            shopItems: {
                $elemMatch: {
                    name: name,
                },
            },
        });
        if(!isShopItem) return false;

        const filteredItems = isShopItem.shopItems.filter(item => item.name === name);

        return filteredItems[0];
    }

    /**
     * 
     * @param {string} guildID 
     * @returns 
     */
    static async deleteGuildShop(guildID) {
        if(!guildID) throw new TypeError("A guildID is required but has not been provided!");

        const deleted = await shop.findOneAndDelete({ guildID }).catch(e => console.log(`Deleting entry failed! \nError: ${e}`));

        return deleted;
    }
}


module.exports = DcEco;