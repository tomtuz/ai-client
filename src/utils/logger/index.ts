import { createBrowserLogger } from "./logger.browser";
import { createCLILogger } from "./logger.cli";
import { LoggerInterface } from "./types";

const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined";

const createLogger = (): LoggerInterface =>
  isBrowser ? createBrowserLogger() : createCLILogger();

export const logger = createLogger();
