export function InviteStatus({ valid }: { valid: boolean }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5">
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          valid ? "bg-emerald-500 status-dot-live" : "bg-red-500"
        }`}
      />
      <span className="text-xs font-medium tracking-wide text-zinc-600">
        {valid ? "الدعوة سارية" : "الدعوة منتهية"}
      </span>
    </div>
  );
}
