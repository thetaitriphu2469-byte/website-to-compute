import 'dotenv/config';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { logger } from './utils/logger.js';
// Import commands statically for simplicity
import ping from './commands/ping.js';
import clear from './commands/clear.js';
import kick from './commands/kick.js';
import ban from './commands/ban.js';
import timeout from './commands/timeout.js';
import registerReadyHandler from './events/ready.js';
import registerInteractionHandler from './events/interactionCreate.js';
const token = process.env.DISCORD_TOKEN;
if (!token) {
    logger.error('Thiếu biến môi trường DISCORD_TOKEN trong file .env');
    process.exit(1);
}
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
    ],
});
const commands = new Collection();
for (const cmd of [ping, clear, kick, ban, timeout]) {
    commands.set(cmd.data.name, cmd);
}
// Expose commands on client for potential future access
client.commands = commands;
registerReadyHandler(client);
registerInteractionHandler(client, commands);
client.login(token).catch((err) => {
    logger.error('Không thể đăng nhập bot', err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map