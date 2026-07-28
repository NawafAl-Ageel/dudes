"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitSurvey } from "@/app/survey/actions";
import { ITEM_OPTIONS, FACTOR_OPTIONS, PRICE_OPTIONS } from "@/lib/surveyOptions";

type FormState = {
  gender: string;
  favoriteItem: string;
  favoriteItemOther: string;
  singleBuyItem: string;
  singleBuyItemOther: string;
  purchaseFactor: string;
  priceRange: string;
  idealAddition: string;
  email: string;
};

const initialState: FormState = {
  gender: "",
  favoriteItem: "",
  favoriteItemOther: "",
  singleBuyItem: "",
  singleBuyItemOther: "",
  purchaseFactor: "",
  priceRange: "",
  idealAddition: "",
  email: "",
};

function OptionGrid({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`rounded-xl border px-4 py-3 text-right text-sm font-medium transition-colors ${
            value === opt
              ? "border-ink bg-ink text-bg"
              : "border-line text-ink hover:border-ink-soft"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function SurveyForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const update = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }));

  const steps = [
    {
      title: "قبل ما نبدأ",
      valid: () => form.gender !== "",
      content: (
        <OptionGrid
          options={["ذكر", "أنثى"]}
          value={form.gender}
          onChange={(v) => update({ gender: v })}
        />
      ),
    },
    {
      title: "وش أكثر قطعة تتمنى تشوفها من Dudes Club؟",
      subtitle: "اختر واحدة",
      valid: () =>
        form.favoriteItem !== "" &&
        (form.favoriteItem !== "شيء آخر" || form.favoriteItemOther.trim() !== ""),
      content: (
        <div className="flex flex-col gap-4">
          <OptionGrid
            options={ITEM_OPTIONS}
            value={form.favoriteItem}
            onChange={(v) => update({ favoriteItem: v })}
          />
          {form.favoriteItem === "شيء آخر" && (
            <input
              value={form.favoriteItemOther}
              onChange={(e) => update({ favoriteItemOther: e.target.value })}
              placeholder="اكتب اقتراحك"
              className="rounded-xl border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-ink"
            />
          )}
        </div>
      ),
    },
    {
      title: "إذا بتشتري قطعة وحدة فقط، وش بتختار؟",
      valid: () =>
        form.singleBuyItem !== "" &&
        (form.singleBuyItem !== "شيء آخر" || form.singleBuyItemOther.trim() !== ""),
      content: (
        <div className="flex flex-col gap-4">
          <OptionGrid
            options={ITEM_OPTIONS}
            value={form.singleBuyItem}
            onChange={(v) => update({ singleBuyItem: v })}
          />
          {form.singleBuyItem === "شيء آخر" && (
            <input
              value={form.singleBuyItemOther}
              onChange={(e) => update({ singleBuyItemOther: e.target.value })}
              placeholder="اكتب اقتراحك"
              className="rounded-xl border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-ink"
            />
          )}
        </div>
      ),
    },
    {
      title: "وش أهم شيء يخليك تشتري براند رياضي جديد؟",
      valid: () => form.purchaseFactor !== "",
      content: (
        <OptionGrid
          options={FACTOR_OPTIONS}
          value={form.purchaseFactor}
          onChange={(v) => update({ purchaseFactor: v })}
        />
      ),
    },
    {
      title: "كم تعتبر سعر مناسب لتيشيرت رياضي ممتاز؟",
      valid: () => form.priceRange !== "",
      content: (
        <OptionGrid
          options={PRICE_OPTIONS}
          value={form.priceRange}
          onChange={(v) => update({ priceRange: v })}
        />
      ),
    },
    {
      title: "خلك مبدع (اختياري)",
      subtitle:
        "إذا تقدر تضيف قطعة أو ميزة لبراند رياضي مثالي، وش بتكون؟ لك الحرية، ولا تحس إنك ملزم تكتب شي.",
      valid: () => true,
      content: (
        <textarea
          value={form.idealAddition}
          onChange={(e) => update({ idealAddition: e.target.value })}
          placeholder={
            "مثال: مقاسات توصل XXL، ألوان أهدى، خامة أخف بالصيف، تعاون مع رياضي معروف...\n\nاكتب أي فكرة تخطر في بالك (اختياري)"
          }
          rows={5}
          className="w-full rounded-xl border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-ink"
        />
      ),
    },
    {
      title: "آخر شيء",
      subtitle:
        "لو حبيت توصلك عروض خاصة وخصم الافتتاح أول ما نطلق، خلّي لنا إيميلك — اختياري تماماً.",
      valid: () => true,
      content: (
        <input
          type="email"
          dir="ltr"
          value={form.email}
          onChange={(e) => update({ email: e.target.value })}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-ink"
        />
      ),
    },
  ];

  const current = steps[step];
  const isLast = step === steps.length - 1;

  const handleNext = () => {
    setError("");
    if (!current.valid()) {
      setError("اختر إجابة قبل ما تكمل");
      return;
    }
    if (isLast) {
      startTransition(async () => {
        try {
          await submitSurvey({
            gender: form.gender,
            favoriteItem: form.favoriteItem,
            favoriteItemOther: form.favoriteItemOther,
            singleBuyItem: form.singleBuyItem,
            singleBuyItemOther: form.singleBuyItemOther,
            purchaseFactor: form.purchaseFactor,
            priceRange: form.priceRange,
            idealAddition: form.idealAddition,
            email: form.email,
          });
          setSubmitted(true);
        } catch {
          setError("صار خطأ، حاول مرة ثانية");
        }
      });
      return;
    }
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setError("");
    setStep((s) => Math.max(0, s - 1));
  };

  if (submitted) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center justify-center px-6 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">تسلم!</h2>
        <p className="mt-4 text-ink-soft">
          وصلنا ردك، وياك نبني دودز كلوب بالشكل اللي تستاهله.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg px-6 py-16">
      <div className="mb-8 flex items-center gap-1.5">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= step ? "bg-ink" : "bg-line"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold sm:text-3xl">{current.title}</h2>
          {current.subtitle && (
            <p className="mt-2 text-sm text-ink-soft">{current.subtitle}</p>
          )}
          <div className="mt-8">{current.content}</div>
        </motion.div>
      </AnimatePresence>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      <div className="mt-10 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 0 || isPending}
          className="text-sm font-medium text-ink-soft transition-colors hover:text-ink disabled:opacity-0"
        >
          رجوع
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={isPending}
          className="rounded-full bg-cta px-7 py-3 text-sm font-semibold text-cta-ink transition-transform hover:scale-105 disabled:opacity-60"
        >
          {isPending ? "جاري الإرسال..." : isLast ? "إرسال" : "التالي"}
        </button>
      </div>
    </div>
  );
}
