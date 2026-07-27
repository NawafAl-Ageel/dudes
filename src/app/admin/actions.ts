"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";
import { slugify } from "@/lib/invite";
import { parseRiyadhDateTimeLocal } from "@/lib/timezone";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "").trim();
  const expected = (process.env.ADMIN_PASSWORD ?? "").trim();

  if (!expected || password !== expected) {
    redirect("/admin/login?error=1");
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function createInvite(formData: FormData) {
  const guestName = String(formData.get("guestName") ?? "").trim();
  const guestEmail = String(formData.get("guestEmail") ?? "").trim();
  const meetingTitle = String(formData.get("meetingTitle") ?? "").trim();
  const meetingDescription = String(formData.get("meetingDescription") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const locationUrl = String(formData.get("locationUrl") ?? "").trim();
  const startsAt = String(formData.get("startsAt") ?? "");
  const endsAt = String(formData.get("endsAt") ?? "");
  const expiresAt = String(formData.get("expiresAt") ?? "");
  const customSlug = String(formData.get("slug") ?? "").trim();

  if (!guestName || !meetingTitle || !startsAt || !endsAt || !expiresAt) {
    throw new Error("Missing required fields");
  }

  const baseSlug = slugify(customSlug || `${guestName}-${meetingTitle}`);
  let slug = baseSlug;
  let suffix = 1;
  while (await prisma.invite.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  await prisma.invite.create({
    data: {
      slug,
      guestName,
      guestEmail: guestEmail || null,
      meetingTitle,
      meetingDescription,
      location,
      locationUrl: locationUrl || null,
      startsAt: parseRiyadhDateTimeLocal(startsAt),
      endsAt: parseRiyadhDateTimeLocal(endsAt),
      expiresAt: parseRiyadhDateTimeLocal(expiresAt),
    },
  });

  revalidatePath("/admin");
}

export async function toggleRevoke(inviteId: string, revoked: boolean) {
  await prisma.invite.update({
    where: { id: inviteId },
    data: { manuallyRevoked: revoked },
  });
  revalidatePath("/admin");
}

export async function deleteInvite(inviteId: string) {
  await prisma.invite.delete({ where: { id: inviteId } });
  revalidatePath("/admin");
}

/**
 * Stub for future email delivery (e.g. via Resend/SendGrid). Not wired to a
 * provider yet — surfaces a clear "not active" result instead of pretending
 * to send.
 */
export async function sendInvitationEmail(
  inviteId: string
): Promise<{ ok: false; message: string }> {
  void inviteId;
  return {
    ok: false,
    message: "ميزة إرسال الدعوات عبر البريد الإلكتروني قيد التطوير ولم تُفعّل بعد.",
  };
}
