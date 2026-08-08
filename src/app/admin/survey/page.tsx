import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ITEM_OPTIONS, FACTOR_OPTIONS, PRICE_OPTIONS, normalizeItemLabel } from "@/lib/surveyOptions";
import { NavTab } from "@/components/admin/NavTab";
import { logout } from "../actions";

export const dynamic = "force-dynamic";

const dateTimeFormatter = new Intl.DateTimeFormat("ar", {
  calendar: "gregory",
  numberingSystem: "latn",
  timeZone: "Asia/Riyadh",
  dateStyle: "medium",
  timeStyle: "short",
});

function TotalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </svg>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium tracking-wide text-zinc-500">{label}</p>
        <p className="mt-1 text-2xl font-semibold text-zinc-900" dir="ltr">
          {value}
        </p>
      </div>
    </div>
  );
}

function BarList({
  title,
  data,
}: {
  title: string;
  data: { label: string; count: number }[];
}) {
  const total = data.reduce((sum, d) => sum + d.count, 0);
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
      <div className="mt-5 flex flex-col gap-4">
        {data.map((d) => {
          const pct = total ? Math.round((d.count / total) * 100) : 0;
          return (
            <div key={d.label}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium text-zinc-800">{d.label}</span>
                <span className="shrink-0 text-xs text-zinc-500" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {d.count} · {pct}%
                </span>
              </div>
              <div className="relative mt-1.5 h-2 rounded-full bg-zinc-100">
                <div
                  className="absolute inset-y-0 right-0 rounded-s-none rounded-e-full bg-zinc-900"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
        {data.length === 0 && <p className="text-sm text-zinc-400">لا توجد بيانات بعد.</p>}
      </div>
    </div>
  );
}

function tally(values: string[], order?: string[]): { label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const v of values) {
    counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  if (order) {
    return order
      .map((label) => ({ label, count: counts.get(label) ?? 0 }))
      .filter((d) => d.count > 0 || order.length <= 8);
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

export default async function AdminSurveyPage() {
  const responses = await prisma.surveyResponse.findMany({ orderBy: { createdAt: "desc" } });

  const total = responses.length;
  const withEmail = responses.filter((r) => r.email).length;

  const genderData = tally(
    responses.map((r) => r.gender),
    ["ذكر", "أنثى"]
  );

  const favoriteItemData = tally(
    responses.map((r) => normalizeItemLabel(r.favoriteItem)),
    ITEM_OPTIONS
  ).sort((a, b) => b.count - a.count);

  const singleBuyItemData = tally(
    responses.map((r) => normalizeItemLabel(r.singleBuyItem)),
    ITEM_OPTIONS
  ).sort((a, b) => b.count - a.count);

  const purchaseFactorData = tally(
    responses.map((r) => r.purchaseFactor),
    FACTOR_OPTIONS
  ).sort((a, b) => b.count - a.count);

  const priceRangeData = tally(
    responses.map((r) => r.priceRange),
    PRICE_OPTIONS
  );

  const feedback = responses.filter((r) => r.idealAddition || r.missingFromMarket);
  const emails = responses.filter((r) => r.email);

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-10 sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/dudes_logo_transparent.png" alt="دودز كومباني" width={40} height={40} />
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
                دودز كومباني
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-zinc-900">صفحة الإدارة</h1>
            </div>
          </div>
          <form action={logout}>
            <button className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-white">
              تسجيل الخروج
            </button>
          </form>
        </div>

        <nav className="flex w-fit items-center gap-1 rounded-full border border-zinc-200 bg-white p-1">
          <NavTab href="/admin" label="الدعوات" active={false} />
          <NavTab href="/admin/survey" label="استبيان دودز كلوب" active />
          <NavTab href="/admin/esports" label="طلبات Nightmare" active={false} />
        </nav>

        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatCard label="إجمالي الردود" value={total} icon={<TotalIcon />} />
          <StatCard label="سجلوا إيميلهم" value={withEmail} icon={<MailIcon />} />
          <StatCard label="ملاحظات مكتوبة" value={feedback.length} icon={<NoteIcon />} />
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BarList title="الجنس" data={genderData} />
          <BarList title="وش أهم شيء يخلي الشخص يشتري براند رياضي جديد؟" data={purchaseFactorData} />
          <BarList title="أكثر قطعة يتمنى الناس تشوفها من Dudes Club" data={favoriteItemData} />
          <BarList title="لو قطعة وحدة بس، وش بيختارون؟" data={singleBuyItemData} />
          <BarList title="السعر المناسب لتيشيرت رياضي ممتاز" data={priceRangeData} />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-zinc-900">ملاحظات وأفكار الناس ({feedback.length})</h2>
          {feedback.length === 0 && (
            <p className="text-sm text-zinc-500">لا توجد ملاحظات مكتوبة بعد.</p>
          )}
          <div className="flex flex-col gap-3">
            {feedback.map((r) => (
              <div key={r.id} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                {r.idealAddition && <p className="text-sm text-zinc-800">{r.idealAddition}</p>}
                {r.missingFromMarket && (
                  <p className="mt-2 text-sm text-zinc-500">{r.missingFromMarket}</p>
                )}
                <p className="mt-3 text-xs text-zinc-400">
                  {r.gender} · {dateTimeFormatter.format(r.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-zinc-900">إيميلات مهتمة بالعروض ({emails.length})</h2>
          {emails.length === 0 && (
            <p className="text-sm text-zinc-500">ما فيه إيميلات لسا.</p>
          )}
          <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
            {emails.map((r, i) => (
              <div
                key={r.id}
                className={`flex items-center justify-between gap-3 px-5 py-3 ${
                  i !== emails.length - 1 ? "border-b border-zinc-100" : ""
                }`}
              >
                <a href={`mailto:${r.email}`} dir="ltr" className="text-sm text-blue-600 hover:underline">
                  {r.email}
                </a>
                <span className="text-xs text-zinc-400">{dateTimeFormatter.format(r.createdAt)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
