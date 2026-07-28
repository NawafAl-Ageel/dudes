import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { isInviteValid } from "@/lib/invite";
import { InviteStatus } from "@/components/InviteStatus";
import { InviteRowActions } from "@/components/admin/InviteRowActions";
import { createInvite, logout } from "./actions";

const dateTimeFormatter = new Intl.DateTimeFormat("ar", {
  calendar: "gregory",
  numberingSystem: "latn",
  timeZone: "Asia/Riyadh",
  dateStyle: "medium",
  timeStyle: "short",
});

type StatusFilter = "all" | "active" | "expired";

type PageProps = {
  searchParams: Promise<{ q?: string; status?: string }>;
};

function TotalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
    </svg>
  );
}

function ActiveIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  );
}

function ExpiredIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5l5 5" />
      <path d="M14.5 9.5l-5 5" />
    </svg>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
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

function FilterTab({
  label,
  status,
  active,
  query,
}: {
  label: string;
  status: StatusFilter;
  active: boolean;
  query: string;
}) {
  const params = new URLSearchParams();
  if (status !== "all") params.set("status", status);
  if (query) params.set("q", query);
  const href = params.toString() ? `/admin?${params.toString()}` : "/admin";

  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        active ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100"
      }`}
    >
      {label}
    </Link>
  );
}

export default async function AdminPage({ searchParams }: PageProps) {
  const { q = "", status = "all" } = await searchParams;
  const statusFilter = (["all", "active", "expired"] as StatusFilter[]).includes(
    status as StatusFilter
  )
    ? (status as StatusFilter)
    : "all";

  const allInvites = await prisma.invite.findMany({ orderBy: { createdAt: "desc" } });

  const total = allInvites.length;
  const activeCount = allInvites.filter((i) => isInviteValid(i)).length;
  const expiredCount = total - activeCount;

  const query = q.trim().toLowerCase();
  const invites = allInvites.filter((invite) => {
    const valid = isInviteValid(invite);
    if (statusFilter === "active" && !valid) return false;
    if (statusFilter === "expired" && valid) return false;
    if (
      query &&
      !invite.guestName.toLowerCase().includes(query) &&
      !invite.meetingTitle.toLowerCase().includes(query) &&
      !(invite.guestEmail ?? "").toLowerCase().includes(query)
    ) {
      return false;
    }
    return true;
  });

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
          <span className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white">
            الدعوات
          </span>
          <Link
            href="/admin/survey"
            className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100"
          >
            استبيان دودز كلوب
          </Link>
        </nav>

        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatCard label="إجمالي الدعوات" value={total} icon={<TotalIcon />} />
          <StatCard label="دعوات سارية" value={activeCount} icon={<ActiveIcon />} />
          <StatCard label="دعوات منتهية" value={expiredCount} icon={<ExpiredIcon />} />
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-zinc-900">إنشاء دعوة جديدة</h2>
          <form action={createInvite} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              اسم الضيف
              <input
                name="guestName"
                required
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              البريد الإلكتروني للضيف (اختياري)
              <input
                type="email"
                name="guestEmail"
                placeholder="guest@example.com"
                dir="ltr"
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-700 sm:col-span-2">
              رابط مخصص (اختياري)
              <input
                name="slug"
                placeholder="يتم إنشاؤه تلقائياً إذا تُرك فارغاً"
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-700 sm:col-span-2">
              عنوان الاجتماع
              <input
                name="meetingTitle"
                required
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-700 sm:col-span-2">
              وصف الاجتماع
              <textarea
                name="meetingDescription"
                rows={3}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              الموقع
              <input
                name="location"
                required
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              رابط الموقع (اختياري)
              <input
                name="locationUrl"
                placeholder="https://maps.google.com/..."
                dir="ltr"
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              وقت البداية
              <input
                type="datetime-local"
                name="startsAt"
                required
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              وقت النهاية
              <input
                type="datetime-local"
                name="endsAt"
                required
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-700 sm:col-span-2">
              تاريخ انتهاء صلاحية الرابط
              <input
                type="datetime-local"
                name="expiresAt"
                required
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900"
              />
            </label>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
              >
                إنشاء الدعوة
              </button>
            </div>
          </form>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-zinc-900">
              جميع الدعوات ({invites.length})
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white p-1">
                <FilterTab label="الكل" status="all" active={statusFilter === "all"} query={q} />
                <FilterTab
                  label="سارية"
                  status="active"
                  active={statusFilter === "active"}
                  query={q}
                />
                <FilterTab
                  label="منتهية"
                  status="expired"
                  active={statusFilter === "expired"}
                  query={q}
                />
              </div>
              <form className="flex items-center" action="/admin">
                {statusFilter !== "all" && (
                  <input type="hidden" name="status" value={statusFilter} />
                )}
                <input
                  type="search"
                  name="q"
                  defaultValue={q}
                  placeholder="بحث بالاسم أو العنوان..."
                  className="rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-sm outline-none focus:border-zinc-900"
                />
              </form>
            </div>
          </div>

          {invites.length === 0 && (
            <p className="text-sm text-zinc-500">لا توجد دعوات مطابقة.</p>
          )}
          <div className="flex flex-col gap-3">
            {invites.map((invite) => {
              const valid = isInviteValid(invite);
              return (
                <div
                  key={invite.id}
                  className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-zinc-900">{invite.guestName}</p>
                      <InviteStatus valid={valid} />
                    </div>
                    <p className="text-sm text-zinc-600">{invite.meetingTitle}</p>
                    <p className="text-xs text-zinc-400">
                      {dateTimeFormatter.format(invite.startsAt)} ·{" "}
                      <span dir="ltr">/invite/{invite.slug}</span>
                      {invite.guestEmail && (
                        <>
                          {" · "}
                          <span dir="ltr">{invite.guestEmail}</span>
                        </>
                      )}
                    </p>
                  </div>
                  <InviteRowActions
                    inviteId={invite.id}
                    slug={invite.slug}
                    revoked={invite.manuallyRevoked}
                  />
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
