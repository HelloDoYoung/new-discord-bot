import { Client } from 'discord.js';
import ICustomClient from '../interfaces/ICustomClient';
import IConfig from '../interfaces/IConfig';

export default class CustomClient extends Client implements ICustomClient 
{
    config: IConfig;

    constructor()
    {
        super({ intents: [] })

        this.config = require('../../../data/config.json');
    }

    Init(): void {
        this.login(this.config.token)
            .then(() => console.log(`${this.user?.username}#${this.user?.discriminator} is online!`))
            .catch((err) => console.log(err));
    }

}