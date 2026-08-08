"use client";

import { useState, useTransition, useEffect } from "react";
import { submitInterest } from "@/app/esports/actions";

const ROLE_OPTIONS = [
  "لاعب Overwatch",
  "لاعب Rocket League",
  "ستريمر",
  "محلل",
  "غير ذلك",
];

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  roleInterest: "",
  message: "",
};

export function ApplyButton({ className, label }: { className: string; label: string }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const update = (patch: Partial<typeof initialState>) =>
    setForm((f) => ({ ...f, ...patch }));

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      setForm(initialState);
      setSubmitted(false);
      setError("");
    }, 300);
  };

  const handleSubmit = () => {
    setError("");
    if (!form.fullName.trim() || !form.email.trim() || !form.roleInterest) {
      setError("عبّي الاسم والإيميل والمجال قبل ما ترسل");
      return;
    }
    startTransition(async () => {
      try {
        await submitInterest(form);
        setSubmitted(true);
      } catch {
        setError("صار خطأ، حاول مرة ثانية");
      }
    });
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8"
          onClick={close}
        >
          <div
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-line bg-bg-raised p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {submitted ? (
              <div className="flex flex-col items-center py-10 text-center">
                <h3 className="text-xl font-bold">تسلم!</h3>
                <p className="mt-3 text-sm text-ink-soft">
                  وصلنا اهتمامك، وبنتواصل معك قريبًا.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-8 rounded-full bg-cta px-6 py-2.5 text-sm font-semibold text-cta-ink"
                >
                  إغلاق
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">أبدي اهتمامك</h3>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="إغلاق"
                    className="text-ink-faint transition-colors hover:text-ink"
                  >
                    ✕
                  </button>
                </div>
                <p className="mt-2 text-sm text-ink-soft">
                  عبّي بياناتك ونتواصل معك بخصوص الفرصة المناسبة.
                </p>

                <div className="mt-6 flex flex-col gap-4">
                  <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
                    الاسم الكامل
                    <input
                      value={form.fullName}
                      onChange={(e) => update({ fullName: e.target.value })}
                      className="rounded-xl border border-line bg-bg px-4 py-2.5 text-sm text-ink outline-none focus:border-[var(--accent)]"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
                    البريد الإلكتروني
                    <input
                      type="email"
                      dir="ltr"
                      value={form.email}
                      onChange={(e) => update({ email: e.target.value })}
                      className="rounded-xl border border-line bg-bg px-4 py-2.5 text-sm text-ink outline-none focus:border-[var(--accent)]"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
                    رقم التواصل (واتساب) — اختياري
                    <input
                      dir="ltr"
                      value={form.phone}
                      onChange={(e) => update({ phone: e.target.value })}
                      placeholder="+966"
                      className="rounded-xl border border-line bg-bg px-4 py-2.5 text-sm text-ink outline-none focus:border-[var(--accent)]"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
                    وش المجال اللي يهمك؟
                    <select
                      value={form.roleInterest}
                      onChange={(e) => update({ roleInterest: e.target.value })}
                      className="rounded-xl border border-line bg-bg px-4 py-2.5 text-sm text-ink outline-none focus:border-[var(--accent)]"
                    >
                      <option value="" disabled>
                        اختر مجالك
                      </option>
                      {ROLE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
                    نبذة عنك — اختياري
                    <textarea
                      value={form.message}
                      onChange={(e) => update({ message: e.target.value })}
                      rows={3}
                      placeholder="خبرتك، حساباتك، أي شي حاب تذكره..."
                      className="rounded-xl border border-line bg-bg px-4 py-2.5 text-sm text-ink outline-none focus:border-[var(--accent)]"
                    />
                  </label>
                </div>

                {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isPending}
                  className="mt-6 w-full rounded-full bg-cta px-6 py-3 text-sm font-semibold text-cta-ink transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  {isPending ? "جاري الإرسال..." : "إرسال"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
