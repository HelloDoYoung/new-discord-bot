import { ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
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
            dm_permission: false,
            cooldown: 0,
            options: []
        });
    }

    Execute(interaction: ChatInputCommandInteraction) {
        interaction.reply({ content: 'Test command executed', ephemeral: true });
    }
}