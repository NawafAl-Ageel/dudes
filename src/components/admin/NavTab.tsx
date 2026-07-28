"use client";

import Link from "next/link";
import { useLinkStatus } from "next/link";

function PendingDot() {
  const { pending } = useLinkStatus();
  return (
    <span
      aria-hidden
      className={`ms-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current transition-opacity ${
        pending ? "animate-pulse opacity-100" : "opacity-0"
      }`}
    />
  );
}

export function NavTab({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  if (active) {
    return (
      <span className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white">
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100"
    >
      {label}
      <PendingDot />
    </Link>
  );
}
