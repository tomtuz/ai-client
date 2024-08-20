import c from "picocolors";
import { LoggerInterface, OutputLevel } from "./types";

export function createCLILogger(): LoggerInterface {
  const level: OutputLevel = {
    Info: true,
    Debug: false,
    Verbose: false,
  };

  const status_prefix = {
    success: { ascii: "[OK]" },
    error: { ascii: "[X]" },
    info: { ascii: "[i]" },
  };

  const setLevels = (levelObj: Partial<OutputLevel>): void => {
    Object.assign(level, levelObj);
    verbose("\nlog_level: ", level);
  };

  const setLevel = (levelKey: keyof OutputLevel, value: boolean): void => {
    level[levelKey] = value;
    verbose(`Log level '${levelKey}' set to ${value}`);
  };

  const getLevels = (): OutputLevel => ({ ...level });

  const error = (message?: any, ...optionalParams: any[]): void => {
    console.error(c.red(message), ...optionalParams);
  };

  const warn = (message?: any, ...optionalParams: any[]): void => {
    console.warn(c.yellow(message), ...optionalParams);
  };

  const info = (message?: any, ...optionalParams: any[]): void => {
    if (level.Info) console.log(message, ...optionalParams);
  };

  const debug = (message?: any, ...optionalParams: any[]): void => {
    if (level.Debug) console.warn(message, ...optionalParams);
  };

  const verbose = (message?: any, ...optionalParams: any[]): void => {
    if (level.Verbose) console.log(message, ...optionalParams);
  };

  const header = (message?: any, ...optionalParams: any[]): void => {
    const divider = "=".repeat(String(message).length);
    console.log(`\n${message}\n${divider}`);
  };

  const step = (message?: any, ...optionalParams: any[]): void => {
    const divider = "-".repeat(String(message).length);
    console.log(`\n${c.blue(message)}\n${divider}`);
  };

  const struct = (message: string, obj: any, verbose = true): void => {
    if (verbose) {
      console.log(`${message}\n${JSON.stringify(obj, null, 2)}`);
    }
  };

  const status = (
    message?: any,
    status_type?: "success" | "error" | "info" | "custom",
  ): void => {
    switch (status_type) {
      case "success":
        console.log(`${c.green(status_prefix.success.ascii)} ${message}`);
        break;
      case "error":
        console.log(`${c.red(status_prefix.error.ascii)} ${message}`);
        break;
      case "info":
        console.log(`${c.blue(status_prefix.info.ascii)} ${message}`);
        break;
      default:
        console.log(message);
    }
  };

  return {
    setLevels,
    setLevel,
    getLevels,
    error,
    warn,
    info,
    debug,
    verbose,
    header,
    step,
    struct,
    status,
  };
}
