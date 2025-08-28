import { Client, Events } from 'discord.js';
import { logger } from '../utils/logger.js';
export default function registerReadyHandler(client) {
    client.once(Events.ClientReady, (c) => {
        logger.info(`Đã đăng nhập thành công: ${c.user.tag}`);
    });
}
//# sourceMappingURL=ready.js.map