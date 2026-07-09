import { NextResponse } from "next/server";

/**
 * TEMPORARY diagnostic route — reveals only presence/length/edge-characters
 * of secrets (never the full value) to confirm whether env vars are reaching
 * the running app. Delete this file once the Amplify env var issue is
 * resolved; it should never ship long-term.
 */
function describe(value: string | undefined) {
  if (!value) return { present: false, length: 0, preview: null };
  const preview = value.length <= 2 ? "*".repeat(value.length) : `${value[0]}***${value[value.length - 1]}`;
  return { present: true, length: value.length, preview };
}

export async function GET() {
  return NextResponse.json({
    ADMIN_PASSWORD: describe(process.env.ADMIN_PASSWORD),
    SESSION_SECRET: describe(process.env.SESSION_SECRET),
    DATABASE_URL: describe(process.env.DATABASE_URL),
    DIRECT_URL: describe(process.env.DIRECT_URL),
    NEXT_PUBLIC_SITE_URL: describe(process.env.NEXT_PUBLIC_SITE_URL),
    DEBUG_CANARY: describe(process.env.DEBUG_CANARY),
    runtime: {
      NODE_ENV: process.env.NODE_ENV ?? null,
      AWS_REGION: process.env.AWS_REGION ?? null,
      AWS_LAMBDA_FUNCTION_NAME: process.env.AWS_LAMBDA_FUNCTION_NAME ?? null,
      AWS_EXECUTION_ENV: process.env.AWS_EXECUTION_ENV ?? null,
    },
  });
}
