"use server";

import { prisma } from "@/lib/prisma";

export type InterestSubmission = {
  fullName: string;
  email: string;
  phone?: string;
  roleInterest: string;
  message?: string;
};

export async function submitInterest(data: InterestSubmission) {
  if (!data.fullName.trim() || !data.email.trim() || !data.roleInterest) {
    throw new Error("Missing required fields");
  }

  await prisma.esportsInterest.create({
    data: {
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim() || null,
      roleInterest: data.roleInterest,
      message: data.message?.trim() || null,
    },
  });

  return { ok: true };
}
