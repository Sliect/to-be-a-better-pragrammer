interface LoggerType {
  log?: Function,
  success?: Function,
  fail?: Function,
  [key: string]: any,
}

class Logger {
  successLogEnabled = false;
  failLogEnabled = true;
  logger: LoggerType = {
    log: console.log,
    success: console.log,
    fail: console.log,
  };

  setLogger(logger: Logger){
    this.logger = logger;
  }
  
  log(...args: any[]){
    this.logger.log && this.logger.log(...args);
  }

  success(...args: any[]){
    if (!this.successLogEnabled) return;
    this.logger.success && this.logger.success(...args);
  }

  fail(...args: any[]){
    if (!this.failLogEnabled) return;
    this.logger.fail && this.logger.fail(...args);
  }

  setSuccessLogEnabled(successLogEnabled: boolean = true){
    this.successLogEnabled = successLogEnabled;
  }

  setFailLogEnabled(failLogEnabled: boolean = true){
    this.failLogEnabled = failLogEnabled;
  }
}

export default new Logger();