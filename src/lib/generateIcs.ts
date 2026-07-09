import { createEvent, type DateArray, type EventAttributes } from "ics";
import type { Invite } from "@prisma/client";

function toDateArray(date: Date): DateArray {
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  ];
}

export function generateInviteIcs(invite: Invite, inviteUrl: string): string {
  const event: EventAttributes = {
    title: invite.meetingTitle,
    description: `${invite.meetingDescription}\n\nInvitation: ${inviteUrl}`,
    location: invite.location,
    url: invite.locationUrl ?? inviteUrl,
    start: toDateArray(invite.startsAt),
    end: toDateArray(invite.endsAt),
    organizer: { name: "Dudes Company" },
    attendees: [{ name: invite.guestName }],
  };

  const { error, value } = createEvent(event);
  if (error || !value) {
    throw error ?? new Error("Failed to generate .ics file");
  }
  return value;
}
