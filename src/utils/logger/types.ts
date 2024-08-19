export interface LoggerInterface {
  setLevels(levelObj: Partial<OutputLevel>): void;
  setLevel(level: keyof OutputLevel, value: boolean): void;
  getLevels(): OutputLevel;
  error(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  debug(message?: any, ...optionalParams: any[]): void;
  verbose(message?: any, ...optionalParams: any[]): void;
  header(message?: any, ...optionalParams: any[]): void;
  step(message?: any, ...optionalParams: any[]): void;
  struct(message: string, obj: any, verbose?: boolean): void;
  status(message?: any, status_type?: "success" | "error" | "info" | "custom"): void;
}

export enum LogLevel {
  // native levels
  Silent = 0,
  Error = 1,
  Warn = 2,
  // custom levels
  Info = 3, // info
  Debug = 4, // info + debug
  Verbose = 5, // info + debug + verbose
}

export type OutputLevel = {
  Info?: boolean;
  Debug?: boolean;
  Verbose?: boolean;
};
