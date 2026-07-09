const SESSION_COOKIE = "dudes_admin_session";
const SESSION_VALUE = "authenticated";

async function sign(value: string): Promise<string> {
  const secret = process.env.SESSION_SECRET ?? "";
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Buffer.from(signature).toString("hex");
}

export async function createSessionToken(): Promise<string> {
  const signature = await sign(SESSION_VALUE);
  return `${SESSION_VALUE}.${signature}`;
}

export async function isValidSessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [value, signature] = token.split(".");
  if (value !== SESSION_VALUE || !signature) return false;
  const expected = await sign(SESSION_VALUE);
  return expected === signature;
}

export { SESSION_COOKIE };
