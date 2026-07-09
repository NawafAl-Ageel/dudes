import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";
import { loadArabicFont } from "@/lib/ogFont";

let logoDataUrl: string | undefined;
async function loadLogoDataUrl(): Promise<string> {
  if (!logoDataUrl) {
    const logoPath = path.join(process.cwd(), "public/dudes_logo_transparent.png");
    const buffer = await readFile(logoPath);
    logoDataUrl = `data:image/png;base64,${buffer.toString("base64")}`;
  }
  return logoDataUrl;
}

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const invite = await prisma.invite.findUnique({ where: { slug } });

  const guestName = invite?.guestName ?? "ضيفنا";
  const meetingTitle = invite?.meetingTitle ?? "أنت مدعو";

  const [fontData, logo] = await Promise.all([loadArabicFont(), loadLogoDataUrl()]);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
          backgroundColor: "#ffffff",
          padding: "80px",
          fontFamily: "IBM Plex Arabic",
          direction: "rtl",
          textAlign: "right",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={40} height={40} alt="" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px" }}>
          <span style={{ fontSize: "32px", color: "#71717a" }}>أنت مدعو، {guestName}</span>
          <span
            style={{
              fontSize: "60px",
              fontWeight: 400,
              color: "#18181b",
              lineHeight: 1.3,
              maxWidth: "1000px",
            }}
          >
            {meetingTitle}
          </span>
        </div>

        <div style={{ display: "flex" }}>
          <span style={{ fontSize: "24px", color: "#a1a1aa" }}>اضغط لعرض دعوتك</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "IBM Plex Arabic", data: fontData, weight: 400, style: "normal" }],
    }
  );
}
