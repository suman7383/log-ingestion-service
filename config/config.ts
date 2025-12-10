import z from "zod";
import { logger } from "../utils/logger.js";

const envSchema = z.object({
  ENV: z.enum(["development", "production"]),
  PORT: z.string().optional().default("5000"),
  MONGODB_URI: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // env variables missing
  const errors: Record<string, unknown> = {};

  parsed.error.issues.forEach((err) => {
    const key = err.path.join(".");

    errors[key] = err.message;
  });

  logger.error("Invalid or missing environment variables", errors);

  logger.error("error", "Exiting due to env validation error");
  process.exit(1);
}

export const config = parsed.data;
