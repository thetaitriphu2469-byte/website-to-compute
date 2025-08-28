import { SlashCommandBuilder } from 'discord.js';
const command = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Kiểm tra độ trễ (latency) của bot'),
    async execute(interaction) {
        const sent = await interaction.reply({ content: 'Pinging...', ephemeral: true, fetchReply: true });
        const ping = sent.createdTimestamp - interaction.createdTimestamp;
        await interaction.editReply(`Pong! Latency: ${ping}ms`);
    },
};
export default command;
//# sourceMappingURL=ping.js.map