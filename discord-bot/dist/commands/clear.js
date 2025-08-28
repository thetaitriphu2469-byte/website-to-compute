import { SlashCommandBuilder, PermissionFlagsBits, } from 'discord.js';
const command = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Xóa một số tin nhắn trong kênh hiện tại')
        .addIntegerOption((opt) => opt
        .setName('count')
        .setDescription('Số lượng tin nhắn muốn xóa (1-100)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {
        if (!interaction.channel || !('bulkDelete' in interaction.channel)) {
            await interaction.reply({ content: 'Không thể xóa tin nhắn ở đây.', ephemeral: true });
            return;
        }
        const count = interaction.options.getInteger('count', true);
        await interaction.deferReply({ ephemeral: true });
        try {
            // @ts-ignore - TextBasedChannel has bulkDelete
            const deleted = await interaction.channel.bulkDelete(count, true);
            await interaction.editReply(`Đã xóa ${deleted.size} tin nhắn.`);
        }
        catch (err) {
            await interaction.editReply('Không thể xóa tin nhắn. Có thể tin nhắn quá cũ (<14 ngày).');
        }
    },
};
export default command;
//# sourceMappingURL=clear.js.map