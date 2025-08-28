import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  type ChatInputCommandInteraction,
  type GuildMember,
} from 'discord.js';
import type { SlashCommand } from '../types.js';

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick một thành viên khỏi server')
    .addUserOption((opt) =>
      opt
        .setName('user')
        .setDescription('Thành viên cần kick')
        .setRequired(true)
    )
    .addStringOption((opt) =>
      opt
        .setName('reason')
        .setDescription('Lý do')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser('user', true);
    const reason = interaction.options.getString('reason') ?? 'No reason provided';
    const member = await interaction.guild?.members.fetch(user.id);
    if (!member) {
      await interaction.reply({ content: 'Không tìm thấy thành viên.', ephemeral: true });
      return;
    }

    if (!member.kickable) {
      await interaction.reply({ content: 'Bot không có quyền kick người này.', ephemeral: true });
      return;
    }

    await interaction.deferReply({ ephemeral: true });
    await member.kick(reason);
    await interaction.editReply(`Đã kick ${user.tag}. Lý do: ${reason}`);
  },
};

export default command;

