-- CreateTable
CREATE TABLE "Invite" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "guestName" TEXT NOT NULL,
    "meetingTitle" TEXT NOT NULL,
    "meetingDescription" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "locationUrl" TEXT,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "manuallyRevoked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invite_slug_key" ON "Invite"("slug");
