import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { isInviteValid } from "@/lib/invite";
import { IntroSplash } from "@/components/IntroSplash";
import { InviteCard } from "@/components/InviteCard";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const invite = await prisma.invite.findUnique({ where: { slug } });

  if (!invite) {
    return { title: "دعوة | دودز كومباني" };
  }

  const title = `${invite.guestName}، أنت مدعو — ${invite.meetingTitle}`;
  const description = invite.meetingDescription;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [`/invite/${slug}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/invite/${slug}/opengraph-image`],
    },
  };
}

export default async function InvitePage({ params }: PageProps) {
  const { slug } = await params;
  const invite = await prisma.invite.findUnique({ where: { slug } });

  if (!invite) {
    return (
      <IntroSplash>
        <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-zinc-50 px-6 text-center">
          <h1 className="text-2xl font-semibold text-zinc-900">الدعوة غير موجودة</h1>
          <p className="text-sm text-zinc-500">
            قد يكون هذا الرابط غير صحيح. يرجى التواصل مع دودز كومباني للحصول على دعوة صالحة.
          </p>
        </div>
      </IntroSplash>
    );
  }

  const valid = isInviteValid(invite);

  return (
    <IntroSplash>
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 py-16">
        <InviteCard
          slug={invite.slug}
          guestName={invite.guestName}
          meetingTitle={invite.meetingTitle}
          meetingDescription={invite.meetingDescription}
          location={invite.location}
          locationUrl={invite.locationUrl}
          startsAt={invite.startsAt}
          endsAt={invite.endsAt}
          valid={valid}
        />
      </div>
    </IntroSplash>
  );
}
