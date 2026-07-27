import { createEvent, type DateArray, type EventAttributes } from "ics";
import type { Invite } from "@prisma/client";
import { getRiyadhDateParts } from "./timezone";

function toDateArray(date: Date): DateArray {
  const { year, month, day, hour, minute } = getRiyadhDateParts(date);
  return [year, month, day, hour, minute];
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
