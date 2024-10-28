import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, PermissionsBitField } from "discord.js";
import Category from "../../base/enums/Category";
import CustomClient from "../../base/classes/CustomClient";
import Command from "../../base/classes/Command";
import ms from 'ms';
import os from 'os';
const { version, dependencies } = require('../../../package.json');

export default class Metar extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'metar',
            description: 'show metar information',
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
                    **Bot Info**
                    > **User : ** \`${this.client.user?.tag}\`
                    > **Account Created : ** <t:${(this.client.user!.createdTimestamp / 1000).toFixed(0)}:R>
                    > **Commands : ** \`${this.client.commands.size}\`
                    > **DJS Version : ** \`${version}\`
                    > **NodeJS Version : ** \`${process.version}\`
                    > **Dependencies : **\`${Object.keys(dependencies).map((p) => (`${p}@${dependencies[p]}`).replace(/\^/g, "")).join(", ")}\`
                    > **Uptime : ** \`${ms(this.client.uptime!, { long: false })}\`

                    **Guild Info**
                    > **Total Guilds : ** \`${(await this.client.guilds.fetch()).size}\`

                    **System Info**
                    > **Operating System : ** \`${process.platform}\`
                    > **CPU : ** \`${os.cpus()[0].model.trim()}\`
                    > **Ram Usage : ** \`${this.formatBytes(process.memoryUsage().heapUsed)}\`/\`${this.formatBytes(os.totalmem())}\`

                    **Development Team**
                    > **Creator/Owner : ** \`DoYoung Kim\`
                    > **Developer : ** \`DoYoung Kim\`
                `)
            ], ephemeral: true,
            components: [new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                    .setLabel("Invite me!")
                    .setStyle(ButtonStyle.Link)
                    .setURL(`https://discord.com/oauth2/authorize?client_id=${this.client.user?.id}&permissions=8&scope=applications.commands%20bot`),
            )]
        });
    }

    private formatBytes(bytes: number) {
        if (bytes == 0) return "0";

        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`
    }
}