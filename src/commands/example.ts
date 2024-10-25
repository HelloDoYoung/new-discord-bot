import { Application, ApplicationCommandOptionType, ChatInputCommandInteraction, Embed, EmbedBuilder, PermissionsBitField } from "discord.js";
import Category from "../base/enums/Category";
import CustomClient from "../base/classes/CustomClient";
import Command from "../base/classes/Command";

export default class Test extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'example',
            description: 'Test command',
            category: Category.Utilities,
            default_member_permission: PermissionsBitField.Flags.UseApplicationCommands,
            options: [],
            cooldown: 0,
            dev: true,
            dm_permission: true
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        interaction.reply({ 
            embeds: [new EmbedBuilder()
                .setThumbnail(this.client.user?.displayAvatarURL()!)
                .setColor("Green")
                .setDescription(`
                    _**Bot Info**_
                    > **User:** \`${this.client.user?.tag}\` - \`${this.client.user?.id}\`
                    > **Account Created:** <t:${(this.client.user!.createdTimestamp / 1000).toFixed(0)}:R>
                    > **Commands:** \`${this.client.commands.size}\`
                `)
            ]
        });
    }
}