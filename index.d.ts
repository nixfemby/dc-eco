type User = {
    userID: string;
    wallet: number;
    bank: number;
    lastUpdated: Date;
};

declare module "@wxifu/discord.eco" {
    export default class DcEco {
        static async setMongoURL(dbUrl: string): Promise<typeof import("mongoose")>;
        static async createProfile(userID: string): Promise<User>;
        static async deleteProfile(userID: string): Promise<User>;
        static async addWalletBal(userID: string, wb: number): Promise<User>;
        static async addBankBal(userID: string, bb: number): Promise<User>;
        static async fetch(userID: string): Promise<User>;
    }
}