import type { Invite } from "@prisma/client";

export function isInviteValid(invite: Pick<Invite, "manuallyRevoked" | "expiresAt">): boolean {
  return !invite.manuallyRevoked && new Date() < new Date(invite.expiresAt);
}

export function slugify(input: string): string {
  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (slug) return slug;

  // Latin-stripping leaves nothing for non-Latin input (e.g. Arabic names) —
  // fall back to a short random slug instead of an empty one.
  return `invite-${Math.random().toString(36).slice(2, 8)}`;
}
