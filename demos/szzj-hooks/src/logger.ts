interface Logger {
  log?: Function;
  success?: Function;
  fail?: Function;
  [key: string]: any;
}

let logger: Logger = {
  // eslint-disable-next-line no-console
  log: console.log,
  // eslint-disable-next-line no-console
  success: console.log,
  // eslint-disable-next-line no-console
  fail: console.warn,
};

export const setLogger = (logger: Logger) => {
  logger = logger;
};

export const log = (...args: any[]) => {
  if (logger.log) logger.log(...args);
};

export const success = (...args: any[]) => {
  if (logger.success) logger.success(...args);
};

export const fail = (...args: any[]) => {
  if (logger.fail) logger.fail(...args);
};
