import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateInviteIcs } from "@/lib/generateIcs";
import { isInviteValid } from "@/lib/invite";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const invite = await prisma.invite.findUnique({ where: { slug } });

  if (!invite || !isInviteValid(invite)) {
    return NextResponse.json({ error: "Invitation not found or no longer valid" }, { status: 404 });
  }

  const inviteUrl = new URL(`/invite/${slug}`, request.url).toString();
  const icsContent = generateInviteIcs(invite, inviteUrl);

  return new NextResponse(icsContent, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}.ics"`,
    },
  });
}
