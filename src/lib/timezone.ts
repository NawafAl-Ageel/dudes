/**
 * All invite times are entered and shown as Saudi Arabia wall-clock time
 * (Asia/Riyadh, a fixed UTC+3 with no daylight saving). The admin form's
 * `datetime-local` inputs have no timezone info, and the server (AWS Lambda)
 * runs in UTC — without treating the value as explicitly Riyadh time, a time
 * typed as e.g. 7:00 PM ends up stored as 7:00 PM UTC and displayed to a
 * Riyadh-based viewer as 10:00 PM.
 */
const RIYADH_OFFSET = "+03:00";

/** Converts a `datetime-local` input value ("YYYY-MM-DDTHH:mm") into the
 * correct absolute Date, treating it as Riyadh local time. */
export function parseRiyadhDateTimeLocal(value: string): Date {
  return new Date(`${value}:00${RIYADH_OFFSET}`);
}

/** Extracts the Riyadh wall-clock date/time components for a Date,
 * regardless of the server or viewer's own timezone. */
export function getRiyadhDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Riyadh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);

  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour") === 24 ? 0 : get("hour"),
    minute: get("minute"),
  };
}
