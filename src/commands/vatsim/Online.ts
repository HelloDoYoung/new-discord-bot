import { Application, ApplicationCommandOptionType, ChatInputCommandInteraction, Client, EmbedBuilder, Events, Guild, PermissionsBitField } from "discord.js";
import { VatsimCoreService } from "../../base/services/VatsimCoreService";
import Command from "../../base/classes/Command";
import Category from "../../base/enums/Category";
import CustomClient from "../../base/classes/CustomClient";

export default class Emit extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'online',
            category: Category.Utilities,
            default_member_permission: PermissionsBitField.Flags.UseApplicationCommands,
            options: [],
            cooldown: 0,
            dev: true,
            description: 'Test Command for VATSIM API',
            dm_permission: true
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const avwxService = new VatsimCoreService();
        const metardata = await avwxService.fetchVatsimCore_Community('579517457086283776', 'discord');
        console.log(metardata);
        interaction.reply({ embeds: [new EmbedBuilder()
            .setColor("Green")
            .setDescription("succes")
        ], ephemeral: true });
    }
}