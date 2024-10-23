import { Client } from 'discord.js';
import ICustomClient from '../interfaces/ICustomClient';
import IConfig from '../interfaces/IConfig';
import Handler from './Handler';

export default class CustomClient extends Client implements ICustomClient 
{
    config: IConfig;
    handler: Handler;

    constructor()
    {
        super({ intents: [] })

        this.config = require('../../../data/config.json');
        this.handler = new Handler(this);
    }

    Init(): void {
        this.LoadHandlers();
        
        this.login(this.config.token)
            .catch((err) => console.log(err));
    }

    LoadHandlers(): void {
        this.handler.LoadEvents();
    }
}