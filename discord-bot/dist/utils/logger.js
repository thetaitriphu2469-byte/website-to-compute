const format = (level, message) => {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
};
export const logger = {
    info(message) {
        console.log(format('INFO', message));
    },
    warn(message) {
        console.warn(format('WARN', message));
    },
    error(message, err) {
        const detail = err instanceof Error ? `\n${err.name}: ${err.message}\n${err.stack ?? ''}` : '';
        console.error(format('ERROR', `${message}${detail}`));
    },
    debug(message) {
        if (process.env.NODE_ENV !== 'production') {
            console.debug(format('DEBUG', message));
        }
    },
};
//# sourceMappingURL=logger.js.map