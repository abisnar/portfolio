type Level = 'info' | 'warn' | 'error';

export const logger = {
  log(level: Level, msg: string, data: Record<string, unknown> = {}): void {
    const line = JSON.stringify({ level, msg, ...data, t: new Date().toISOString() });
    if (level === 'error') console.error(line);
    else console.log(line);
  },
  info(msg: string, data?: Record<string, unknown>) { this.log('info', msg, data); },
  warn(msg: string, data?: Record<string, unknown>) { this.log('warn', msg, data); },
  error(msg: string, data?: Record<string, unknown>) { this.log('error', msg, data); },
};
