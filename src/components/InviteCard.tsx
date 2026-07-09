"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { InviteStatus } from "./InviteStatus";

type InviteCardProps = {
  slug: string;
  guestName: string;
  meetingTitle: string;
  meetingDescription: string;
  location: string;
  locationUrl: string | null;
  startsAt: Date;
  endsAt: Date;
  valid: boolean;
};

const dateFormatter = new Intl.DateTimeFormat("ar", {
  calendar: "gregory",
  numberingSystem: "latn",
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("ar", {
  calendar: "gregory",
  numberingSystem: "latn",
  hour: "numeric",
  minute: "2-digit",
});

export function InviteCard({
  slug,
  guestName,
  meetingTitle,
  meetingDescription,
  location,
  locationUrl,
  startsAt,
  endsAt,
  valid,
}: InviteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className="w-full max-w-xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl shadow-zinc-900/5"
    >
      <div className="flex flex-col items-center border-b border-zinc-100 bg-zinc-50 px-8 py-8 text-center">
        <Image src="/dudes_logo_transparent.png" alt="دودز كومباني" width={96} height={96} />
      </div>

      <div className="flex flex-col gap-6 px-8 py-8">
        <div>
          <p className="text-sm text-zinc-500">أنت مدعو، {guestName}</p>
          <h1 className="mt-1 text-2xl font-semibold text-zinc-900">{meetingTitle}</h1>
        </div>

        <p className="text-sm leading-relaxed text-zinc-600">{meetingDescription}</p>

        <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <dt className="text-xs font-medium tracking-wide text-zinc-500">التاريخ</dt>
            <dd className="mt-1 font-medium text-zinc-900">{dateFormatter.format(startsAt)}</dd>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <dt className="text-xs font-medium tracking-wide text-zinc-500">الوقت</dt>
            <dd className="mt-1 font-medium text-zinc-900" dir="ltr">
              {timeFormatter.format(startsAt)} – {timeFormatter.format(endsAt)}
            </dd>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:col-span-2">
            <dt className="text-xs font-medium tracking-wide text-zinc-500">
              الموقع
            </dt>
            <dd className="mt-1 font-medium text-zinc-900">{location}</dd>
            {locationUrl && (
              <a
                href={locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="mt-1 block break-all text-sm text-blue-600 hover:underline"
              >
                {locationUrl}
              </a>
            )}
          </div>
        </dl>

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <InviteStatus valid={valid} />
          {valid && (
            <a
              href={`/invite/${slug}/ics`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4" />
                <path d="M8 2v4" />
                <path d="M3 10h18" />
                <path d="M12 14v4" />
                <path d="M10 16h4" />
              </svg>
              أضف إلى التقويم
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
