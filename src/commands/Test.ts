import { Application, ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Category from "../base/enums/Category";
import CustomClient from "../base/classes/CustomClient";
import Command from "../base/classes/Command";

export default class Test extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'test',
            description: 'Test command',
            category: Category.Utilities,
            default_member_permission: PermissionsBitField.Flags.UseApplicationCommands,
            dm_permission: true,
            cooldown: 0,
            options: [
                {
                    name: 'one',
                    description: 'Option one',
                    type: ApplicationCommandOptionType.Subcommand
                },
                {
                    name: 'two',
                    description: 'Option two',
                    type: ApplicationCommandOptionType.Subcommand
                }
            ]
        });
    }
}