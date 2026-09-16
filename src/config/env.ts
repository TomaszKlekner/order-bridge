import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  TOYA_API_BASE_URL: z.url().default("https://b2b.toya.pl/api"),
  TOYA_API_KEY_ORDER: z.string().min(1, "TOYE_API_KEY_ORDER is required"),
  TOYA_PURCHASER_LOGIN: z.string().min(1, "TOYA_PURCHASER_LOGIN is required"),

  WOO_WEBHOOK_SECRET: z.string().optional().default(""),

  ALLEGRO_CLIENT_ID: z.string().optional().default(""),
  ALLEGRO_CLIENT_SECRET: z.string().optional().default(""),
  ALLEGRO_ACCESS_TOKEN: z.string().optional().default(""),
  ALLEGRO_API_BASE_URL: z.url().default("https://api.allegro.pl"),
  ALLEGRO_POLL_INTERVAL_MS: z.coerce.number().int().positive().default(120_000),
  ALLEGRO_ENABLED: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environmental variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
export type Env = z.infer<typeof envSchema>;
