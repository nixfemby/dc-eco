const mongoose = require('mongoose');
const profile = require('./models/profile');
let mongoUrl;

if(process.version.slice(1, 3) - 0 < 16) {
	throw new Error(
		`NodeJS Version 16 or newer is required, but you are using ${process.version}. See https://nodejs.org to update.`,
	);
}

class DcEco {

    /**
     * 
     * @param {string} dbUrl - MongoDB Database String
     */
    static async setMongoURL(dbUrl) {
        if(!dbUrl) throw new TypeError('A MongoDB database URL is required.');

        mongoUrl = dbUrl;
        return mongoose.connect(dbUrl);
    }

    static async createProfile(userID) {
        if(!userID) throw new TypeError("An user ID was not provided!");

        const isUser = await profile.findOne({ userID });
        if(isUser) return false;

        const user = new profile({
            userID
        });

        await user.save().catch(e => console.log(`Failed to create user! \nError: ${e}`));

        return user;
    }

    static async deleteProfile(userID) {
        if(!userID) throw new TypeError("An user ID was not provided!");

        const user = await profile.findOne({ userID });
        if(!user) return false;

        await profile.findOneAndDelete({ userID }).catch(e => console.log(`Failed to delete user! \nError: ${e}`));

        return user;
    }

    /**
     * 
     * @param {string} userID - The users ID 
     * @param {number} wb - Wallet Balance to add 
     * @returns 
     */
    static async addWalletBal(userID, wb) {
        if(!userID) throw new TypeError("An userID was not provided but is required!");
        if(wb === 0 || !wb || isNaN(parseInt(wb))) throw new TypeError("Amount to add to balance was not provided or invalid!");

        const user = await profile.findOne({ userID });

        if(!user) {
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
     * @param {string} userID - User ID to add balance to
     * @param {number} bb - Balance to add
     * @returns 
     */
    static async addBankBal(userID, bb) {
        if(!userID) throw new TypeError("An userID was not provided but is required!");
        if(bb === 0 || !bb || isNaN(parseInt(bb))) throw new TypeError("Amount to add to balance was not provided or invalid!");

        const user = await profile.findOne({ userID });

        if(!user) {
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
     * @param {string} userID - User ID to set balance to 
     * @param {number} bb - Balance to set the user to
     * @returns 
     */
    static async setBankBal(userID, bb) {
        if(!userID) throw new TypeError("An userID was not provided but is required!");
        if(bb === 0 || !bb || isNaN(parseInt(bb))) throw new TypeError("Amount to set as balance was not provided or invalid!");

        const user = await profile.findOne({ userID });
        if(!user) return false;

        user.bank = bb;
        user.lastUpdated = new Date();

        return user;
    }

    /**
     * 
     * @param {string} userID - User ID to fetch 
     * @returns 
     */
    static async fetch(userID) {
        if(!userID) throw new TypeError("An userID was not provided but is required!");

        const user = await profile.findOne({ userID });
        if(!user) return false;

        return user;
    }
}


module.exports = DcEco;