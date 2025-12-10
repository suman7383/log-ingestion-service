import winston from "winston";
import { blue, yellow, red, magenta, green, bold } from "colorette";

const isDev = process.env.NODE_ENV !== "production";

// ---- Colorizer for dev environment ----
const colorizeLevel = (level: string) => {
  switch (level) {
    case "error":
      return red(bold(level));
    case "warn":
      return yellow(level);
    case "info":
      return blue(level);
    case "debug":
      return magenta(level);
    default:
      return green(level);
  }
};

// ---- Dev formatter ----
const devFormat = winston.format.printf(
  ({ level, message, timestamp, ...meta }) => {
    const colored = colorizeLevel(level);
    const metaStr = Object.keys(meta).length
      ? ` ${green(JSON.stringify(meta))}`
      : "";
    return `${bold(timestamp as string)} [${colored}] ${message as string}${metaStr}`;
  },
);

// ---- Production format (JSON logs) ----
const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

// ---- Create logger instance ----
export const logger = winston.createLogger({
  level: isDev ? "debug" : "info",
  format: isDev
    ? winston.format.combine(winston.format.timestamp(), devFormat)
    : prodFormat,
  transports: [new winston.transports.Console()],
});
