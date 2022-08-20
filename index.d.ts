type User = {
    userID: string;
    wallet: number;
    bank: number;
    lastUpdated: Date;
};

type taxReturn = {
    taxedTotal: number;
    taxIncome: number;
}

type ShopItems = {
    guildID: string;
    shopItems: Array<ShopItem>;
    lastUpdated: Date;
}

type guildProfile = {
    guildID: string;
    bank: number;
    lastUpdated: Date;
}

type ShopItem = {
    name: string;
    type: string;
    price: number;
    meta: Object;
}

type Inventory = {
    guildID: string;
    userID: string;
    inventory: Array<Object>;
    lastUpdated: Date;
}

declare module "dc.eco" {
    export default class DcEco {
        static async setMongoURL(dbUrl: string): Promise<typeof import("mongoose")>;
        static async createProfile(userID: string): Promise<User>;
        static async deleteProfile(userID: string): Promise<User>;
        static async addWalletBal(userID: string, wb: number): Promise<User>;
        static async addBankBal(userID: string, bb: number): Promise<User>;
        static async setBankBal(userID: string, bb: number): Promise<User>;
        static async setWalletBal(userID: string, wb: number): Promise<User>;
        static async subtractWalletBal(userID: string, wb: number): Promise<User>;
        static async subtractBankBal(userID: string, bb: number): Promise<User>;
        static async fetch(userID: string): Promise<User>;
        static async taxCalc(amnt: number, tax: number): Promise<taxReturn>;
        static async tax(amnt: number, tax: number, ownerID: string): Promise<number>;
        static async createGuildProfile(guildID: string): Promise<guildProfile>
        static async addGuildBalance(guildID: string, bal: number): Promise<guildProfile>;
        static async setGuildBalance(guildID: string, bal: number): Promise<guildProfile>;
        static async subtractGuildBalance(guildID: string, bal: number): Promise<guildProfile>;
        static async fetchGuildProfile(guildID: string): Promise<guildProfile>;
        static async deleteGuildProfile(guildID: string): Promise<guildProfile>;
        static async createShopItem(guildID: string, name: string, type: string, price: number, meta: Object): Promise<ShopItems>;
        static async deleteShopItem(guildID: string, name: string): Promise<ShopItems>;
        static async fetchShopItem(guildID: string, number: name): Promise<ShopItem>
        static async fetchShopItems(guildID: string): Promise<Array>;
        static async deleteGuildShop(guildID: string): Promise<ShopItems>;
        static async createInventory(guildID: string, userID: string): Promise<Inventory>;
        static async pushToInventory(guildID: string, userID: string, item: Object): Promise<Inventory>;
        static async removeFromInventory(guildID: string, userID: string, item: Object): Promise<Inventory>;
        static async fetchFromInventory(guildID: string, userID: string, item: Object): Promise<Object>;
        static async fetchInventory(guildID: string, userID: string): Promise<Inventory>;
        static async deleteInventory(guildID: string, userID: string): Promise<Inventory>;
    }
}