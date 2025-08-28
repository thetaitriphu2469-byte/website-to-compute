import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import ping from './commands/ping.js';
import clear from './commands/clear.js';
import kick from './commands/kick.js';
import ban from './commands/ban.js';
import timeout from './commands/timeout.js';
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;
if (!token || !clientId) {
    console.error('Thiếu DISCORD_TOKEN hoặc DISCORD_CLIENT_ID trong .env');
    process.exit(1);
}
const commands = [ping, clear, kick, ban, timeout].map((c) => c.data.toJSON());
const rest = new REST({ version: '10' }).setToken(token);
async function main() {
    try {
        if (guildId) {
            console.log('Đăng ký lệnh ở phạm vi GUILD...');
            await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
                body: commands,
            });
        }
        else {
            console.log('Đăng ký lệnh ở phạm vi GLOBAL (có thể mất đến 1h để hiển thị)...');
            await rest.put(Routes.applicationCommands(clientId), { body: commands });
        }
        console.log('Đăng ký lệnh thành công.');
    }
    catch (err) {
        console.error('Đăng ký lệnh thất bại:', err);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=register-commands.js.map