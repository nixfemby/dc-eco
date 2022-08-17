type User = {
    userID: string;
    wallet: number;
    bank: number;
    inventory: Array;
    lastUpdated: Date;
};

type taxReturn = {
    taxedTotal: number;
    taxIncome: number;
}

type ShopItem = {
    guildID: string;
    shopItems: Array;
    lastUpdated: Date;
}

declare module "@wxifu/discord.eco" {
    export default class DcEco {
        static async setMongoURL(dbUrl: string): Promise<typeof import("mongoose")>;
        static async createProfile(userID: string): Promise<User>;
        static async deleteProfile(userID: string): Promise<User>;
        static async addWalletBal(userID: string, wb: number): Promise<User>;
        static async addBankBal(userID: string, bb: number): Promise<User>;
        static async setBankBal(userID: string, bb: number): Promise<User>;
        static async setWalletBal(userID: string, wb: number): Promise<User>;
        static async fetch(userID: string): Promise<User>;
        static async taxCalc(amnt: number, tax: number): Promise<taxReturn>;
        static async tax(amnt: number, tax: number, ownerID: string): Promise<number>;
    }
}