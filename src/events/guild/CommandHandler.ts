import { ChatInputCommandInteraction, Collection, EmbedBuilder, Events } from "discord.js";
import CustomClient from "../../base/classes/CustomClient";
import Event from "../../base/classes/Event";
import Command from "../../base/classes/Command";

export default class CommandHandler extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.InteractionCreate,
            description: 'Command Handler Event',
            once: false
        });
    }

    Execute(interaction: ChatInputCommandInteraction) {
        if (!interaction.isChatInputCommand()) return;

        const command: Command = this.client.commands.get(interaction.commandName)!;

        // @ts-ignore
        if (!command) return interaction.reply({ content: 'this command does not exist', ephemeral: true }) && this.client.commands.delete(interaction.commandName);

        const { cooldowns } = this.client;
        if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());

        const now = Date.now();
        const timestamps = cooldowns.get(command.name)!;
        const cooldownAmount = (command.cooldown) * 1000;

        if (timestamps.has(interaction.user.id) && (now < (timestamps.get(interaction.user.id) || 0) + cooldownAmount))
            return interaction.reply({ embeds: [new EmbedBuilder()
                .setColor("Red")
                .setDescription(`❌ Please wait another \`${((((timestamps.get(interaction.user.id) || 0) + cooldownAmount) - now) / 1000).toFixed(1)}\` seconds before reusing the \`${command.name}\` command`)
            ], ephemeral: true });

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        try {
            const SubCommandGroup = interaction.options.getSubcommandGroup(false);
            const SubCommand = `${interaction.commandName}${SubCommandGroup ? `.${SubCommandGroup}` : ''}.${interaction.options.getSubcommand(false) || ""}`;

            return this.client.subCommands?.get(SubCommand)?.Execute(interaction) || command.Execute(interaction);
        } catch (error) {
            console.log(error);
        }
    }
}