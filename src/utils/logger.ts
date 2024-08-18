export const logger = {
  info: (message: string) => log('INFO', message),
  warn: (message: string) => log('WARN', message),
  error: (message: string) => log('ERROR', message),
  debug: (message: string) => log('DEBUG', message),
};

function log(level: string, message: string) {
  const logMessage = `[${level}] ${message}\n`;

  console.log(logMessage.trim());
}
