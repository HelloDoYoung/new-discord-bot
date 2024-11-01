import { Application, ApplicationCommandOptionType, ChatInputCommandInteraction, Client, EmbedBuilder, Events, Guild, Message, PermissionsBitField } from "discord.js";
import { AvwxService } from "../../base/services/AvwxService";
import Command from "../../base/classes/Command";
import Category from "../../base/enums/Category";
import CustomClient from "../../base/classes/CustomClient";

export default class Metar extends Command {
    constructor(client: CustomClient) {
        const description = 'Get the METAR for a specific airport';
        super(client, {
            name: 'metar',
            category: Category.Utilities,
            default_member_permission: PermissionsBitField.Flags.UseApplicationCommands,
            options: [
                {
                    name: 'icao',
                    description: 'ICAO code of the airport',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ],
            cooldown: 0,
            dev: true,
            description: description + (true ? ' [Development Command]' : ''),
            dm_permission: true
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const avwxService = new AvwxService();
        const icao = interaction.options.getString('icao')?.toUpperCase() || '';
        const data = await avwxService.fetchMetar(icao, ['info', 'translate']);
        
        if (!data.error) {
            const unix_timestamp = Math.floor(new Date(data.time.dt).getTime() / 1000);

            let wind_variable = '';
            if (data.wind_variable_direction?.length >= 2) {
                wind_variable = ` Variable between ${data.wind_variable_direction[0].repr} and ${data.wind_variable_direction[1].repr}`;
            }
            let wind_gust_speed = '';
            if (data.wind_gust == null ) {
            } else {
                wind_gust_speed = ` Gust ${data.wind_gust.repr}${data.units.wind_speed}`;
            }
            interaction.reply({ embeds: [new EmbedBuilder()
                .setColor("Green")
                .setTitle(`**METAR - ${icao}**`)
                .addFields({ name: '**[Raw Text]**', value: `\`\`\`${data.raw}\`\`\`` })
                .addFields({ name: '🗺️ **Airport**', value: `\`\`${data.info.name}\`\``, inline: false })
                .addFields({ name: '⏰ **Observed Time**', value: `\`\`${data.time.repr}\`\` (<t:${unix_timestamp}:R>)`, inline: true })
                .addFields({ name: '🌬️ **Wind**', value: `\`\`${data.wind_direction.repr} at ${data.wind_speed.repr}${data.units.wind_speed}${wind_variable}${wind_gust_speed}\`\``, inline: true })
                .addFields({ name: '🛰️ **Visibility**', value: `\`\`${data.translate.visibility}\`\``, inline: true })
                .addFields({ name: '🌡️ **Temperature**', value: `\`\`${data.translate.temperature}\`\``, inline: true })
                .addFields({ name: '💧 **Dew Point**', value: `\`\`${data.translate.dewpoint}\`\``, inline: true })
                .addFields({ name: '🌐 **Altimeter**', value: `\`\`${data.translate.altimeter}\`\``, inline: true })
                .addFields({ name: '☁️ **Clouds**', value: `\`\`${data.translate.clouds}\`\``, inline: false })
                .addFields({ name: '✅ **Flight Rule**', value: `\`\`${data.flight_rules}\`\``, inline: true })
                .setFooter({ text: `${interaction.user.username} • VIA AVWX API`, })
                .setTimestamp()
            ], ephemeral: false });
            
        } else {
            interaction.reply({ embeds: [new EmbedBuilder()
                .setColor("Red")
                .setDescription(`❌ Error fetching METAR for ${icao}`)
            ], ephemeral: true });
        }
    }
}