import { Application, ApplicationCommandOptionType, ChatInputCommandInteraction, Client, EmbedBuilder, Events, Guild, PermissionsBitField } from "discord.js";
import { AvwxService } from "../../base/services/AvwxService";
import Command from "../../base/classes/Command";
import Category from "../../base/enums/Category";
import CustomClient from "../../base/classes/CustomClient";

export default class Emit extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'taf',
            description: 'call the metar data',
            dev: true,
            default_member_permission: PermissionsBitField.Flags.Administrator,
            dm_permission: false,
            category: Category.Developer,
            cooldown: 0,
            options: [
            ]
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const avwxService = new AvwxService();
        const metardata = await avwxService.fetchTaf('RKSI', ['info', 'translate', 'speech']);
        console.log(metardata);
        interaction.reply({ embeds: [new EmbedBuilder()
            .setColor("Green")
            .setDescription("succes")
        ], ephemeral: true });
    }
}