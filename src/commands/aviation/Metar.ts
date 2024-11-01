import { Application, ApplicationCommandOptionType, ChatInputCommandInteraction, Client, EmbedBuilder, Events, Guild, PermissionsBitField } from "discord.js";
import { AvwxService } from "../../base/services/AvwxService";
import Command from "../../base/classes/Command";
import Category from "../../base/enums/Category";
import CustomClient from "../../base/classes/CustomClient";

export default class Emit extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'metar',
            description: 'search metar data',
            category: Category.Utilities,
            default_member_permission: PermissionsBitField.Flags.UseApplicationCommands,
            options: [],
            cooldown: 0,
            dev: false,
            dm_permission: true
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const avwxService = new AvwxService();
        const metardata = await avwxService.fetchMetar('RKSI', ['info', 'translate', 'speech']);
        console.log(metardata);
        interaction.reply({ embeds: [new EmbedBuilder()
            .setColor("Green")
            .setDescription("succes")
        ], ephemeral: true });
    }
}