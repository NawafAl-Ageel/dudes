import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  const startsAt = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const endsAt = new Date(startsAt.getTime() + 60 * 60 * 1000);
  const expiresAt = new Date(startsAt.getTime() + 60 * 60 * 1000);

  const data = {
    guestName: "فيصل",
    meetingTitle: "دودز كومباني — اجتماع الانطلاقة",
    meetingDescription:
      "ندعوكم لحضور اجتماع الانطلاقة الرسمي لتعريفكم بدودز كومباني ومجموعتنا القادمة.",
    location: "المقر الرئيسي لدودز كومباني، الرياض",
    locationUrl: "https://maps.google.com",
    startsAt,
    endsAt,
    expiresAt,
  };

  await prisma.invite.upsert({
    where: { slug: "faisal-vip-kickoff" },
    update: data,
    create: { slug: "faisal-vip-kickoff", ...data },
  });

  console.log("Seeded invite: /invite/faisal-vip-kickoff");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
