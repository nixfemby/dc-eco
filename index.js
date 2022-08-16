const mongoose = require('mongoose');
// Add Models Here
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
}


module.exports = DcEco;