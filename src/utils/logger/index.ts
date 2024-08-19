import { LoggerInterface } from "./types";
import { createBrowserLogger } from "./logger.browser";
import { createCLILogger } from "./logger.cli";

const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined";

const createLogger = (): LoggerInterface =>
  isBrowser ? createBrowserLogger() : createCLILogger();

export const logger = createLogger();
