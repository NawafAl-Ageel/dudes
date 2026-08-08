import Image from "next/image";
import { prisma } from "@/lib/prisma";
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

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
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

export default async function AdminEsportsPage() {
  const submissions = await prisma.esportsInterest.findMany({ orderBy: { createdAt: "desc" } });

  const total = submissions.length;
  const withPhone = submissions.filter((s) => s.phone).length;

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
          <NavTab href="/admin/survey" label="استبيان دودز كلوب" active={false} />
          <NavTab href="/admin/esports" label="طلبات Nightmare" active />
        </nav>

        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatCard label="إجمالي الطلبات" value={total} icon={<TotalIcon />} />
          <StatCard label="سجلوا رقم تواصل" value={withPhone} icon={<PhoneIcon />} />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-zinc-900">الطلبات ({submissions.length})</h2>
          {submissions.length === 0 && (
            <p className="text-sm text-zinc-500">ما وصل أي طلب انضمام لسا.</p>
          )}
          <div className="flex flex-col gap-3">
            {submissions.map((s) => (
              <div key={s.id} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-zinc-900">{s.fullName}</p>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                    {s.roleInterest}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                  <a href={`mailto:${s.email}`} dir="ltr" className="text-blue-600 hover:underline">
                    {s.email}
                  </a>
                  {s.phone && (
                    <a href={`tel:${s.phone}`} dir="ltr" className="text-blue-600 hover:underline">
                      {s.phone}
                    </a>
                  )}
                </div>
                {s.message && <p className="mt-3 text-sm text-zinc-600">{s.message}</p>}
                <p className="mt-3 text-xs text-zinc-400">{dateTimeFormatter.format(s.createdAt)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
