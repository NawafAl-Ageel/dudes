export function Marquee({ text }: { text: string }) {
  const items = Array.from({ length: 8 });
  return (
    <div className="relative overflow-hidden border-y border-line bg-bg-raised py-4">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {[...items, ...items].map((_, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-sm font-semibold tracking-[0.2em] text-ink-soft uppercase"
          >
            {text}
            <span className="text-ink-faint">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
