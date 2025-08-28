const format = (level: string, message: string) => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level}] ${message}`;
};

export const logger = {
  info(message: string) {
    console.log(format('INFO', message));
  },
  warn(message: string) {
    console.warn(format('WARN', message));
  },
  error(message: string, err?: unknown) {
    const detail = err instanceof Error ? `\n${err.name}: ${err.message}\n${err.stack ?? ''}` : '';
    console.error(format('ERROR', `${message}${detail}`));
  },
  debug(message: string) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(format('DEBUG', message));
    }
  },
};

