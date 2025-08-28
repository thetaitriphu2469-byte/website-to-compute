import { SlashCommandBuilder, PermissionFlagsBits, } from 'discord.js';
const command = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban một thành viên khỏi server')
        .addUserOption((opt) => opt
        .setName('user')
        .setDescription('Thành viên cần ban')
        .setRequired(true))
        .addIntegerOption((opt) => opt
        .setName('days')
        .setDescription('Số ngày xóa lịch sử tin nhắn (0-7)')
        .setMinValue(0)
        .setMaxValue(7)
        .setRequired(false))
        .addStringOption((opt) => opt
        .setName('reason')
        .setDescription('Lý do')
        .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        const user = interaction.options.getUser('user', true);
        const reason = interaction.options.getString('reason') ?? 'No reason provided';
        const days = interaction.options.getInteger('days') ?? 0;
        const member = await interaction.guild?.members.fetch(user.id).catch(() => null);
        await interaction.deferReply({ ephemeral: true });
        try {
            if (member) {
                await member.ban({ deleteMessageDays: days, reason });
            }
            else if (interaction.guild) {
                await interaction.guild.members.ban(user.id, { deleteMessageDays: days, reason });
            }
            await interaction.editReply(`Đã ban ${user.tag}. Lý do: ${reason}`);
        }
        catch (err) {
            await interaction.editReply('Không thể ban người dùng. Kiểm tra quyền của bot.');
        }
    },
};
export default command;
//# sourceMappingURL=ban.js.map