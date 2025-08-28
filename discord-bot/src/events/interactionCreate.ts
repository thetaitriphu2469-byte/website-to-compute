import { Client, Collection, Events, type ChatInputCommandInteraction } from 'discord.js';
import { logger } from '../utils/logger.js';
import type { SlashCommand } from '../types.js';

export default function registerInteractionHandler(
  client: Client,
  commands: Collection<string, SlashCommand>
): void {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) {
      await safeReply(interaction, {
        content: 'Lệnh không tồn tại hoặc chưa được triển khai.',
        ephemeral: true,
      });
      return;
    }

    try {
      await command.execute(interaction);
    } catch (err) {
      logger.error(`Lỗi khi thực thi lệnh /${interaction.commandName}`, err);
      await safeReply(interaction, {
        content: 'Đã xảy ra lỗi khi xử lý lệnh. Vui lòng thử lại sau.',
        ephemeral: true,
      });
    }
  });
}

async function safeReply(
  interaction: ChatInputCommandInteraction,
  options: Parameters<ChatInputCommandInteraction['reply']>[0]
) {
  if (interaction.deferred || interaction.replied) {
    return interaction.followUp(options as any).catch(() => undefined);
  }
  return interaction.reply(options as any).catch(() => undefined);
}

