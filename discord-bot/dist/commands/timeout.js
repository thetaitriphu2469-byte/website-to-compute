import { SlashCommandBuilder, PermissionFlagsBits, } from 'discord.js';
function parseDuration(input) {
    const match = input.trim().match(/^(\d+)(s|m|h|d)$/i);
    if (!match)
        return null;
    const value = Number(match[1]);
    const unit = match[2].toLowerCase();
    const multipliers = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
    return value * multipliers[unit];
}
const command = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Mute tạm thời một thành viên (timeout)')
        .addUserOption((opt) => opt
        .setName('user')
        .setDescription('Thành viên cần timeout')
        .setRequired(true))
        .addStringOption((opt) => opt
        .setName('duration')
        .setDescription('Thời lượng, ví dụ: 10m, 1h, 1d')
        .setRequired(true))
        .addStringOption((opt) => opt
        .setName('reason')
        .setDescription('Lý do')
        .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction) {
        const user = interaction.options.getUser('user', true);
        const durationInput = interaction.options.getString('duration', true);
        const reason = interaction.options.getString('reason') ?? 'No reason provided';
        const ms = parseDuration(durationInput);
        if (!ms || ms < 1000 || ms > 28 * 24 * 60 * 60 * 1000) {
            await interaction.reply({ content: 'Thời lượng không hợp lệ. Dùng dạng 10m, 1h, 1d (tối đa 28 ngày).', ephemeral: true });
            return;
        }
        const member = await interaction.guild?.members.fetch(user.id).catch(() => null);
        if (!member) {
            await interaction.reply({ content: 'Không tìm thấy thành viên.', ephemeral: true });
            return;
        }
        await interaction.deferReply({ ephemeral: true });
        try {
            await member.timeout(ms, reason);
            const until = Math.round((Date.now() + ms) / 1000);
            await interaction.editReply(`Đã timeout ${user.tag} đến <t:${until}:f>.`);
        }
        catch (err) {
            await interaction.editReply('Không thể timeout người dùng. Kiểm tra quyền của bot.');
        }
    },
};
export default command;
//# sourceMappingURL=timeout.js.map