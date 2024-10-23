"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class CustomClient extends discord_js_1.Client {
    constructor() {
        super({ intents: [] });
        this.config = require('../../../data/config.json');
    }
    Init() {
        this.login(this.config.token)
            .then(() => { var _a, _b; return console.log(`${(_a = this.user) === null || _a === void 0 ? void 0 : _a.username}#${(_b = this.user) === null || _b === void 0 ? void 0 : _b.discriminator} is online!`); })
            .catch((err) => console.log(err));
    }
}
exports.default = CustomClient;
