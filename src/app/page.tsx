import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ThemeToggle } from "@/components/ThemeToggle";

const brands = [
  {
    name: "Dudes Club",
    tag: "القسم الرياضي — جاهز",
    desc: "براند الملابس الرياضية، موجّه للشباب.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 4l-4 3v3l2-1v11h12V9l2 1V7l-4-3-2 2h-4L8 4z" />
      </svg>
    ),
  },
  {
    name: "Fuel",
    tag: "براند داعم",
    desc: "برنامج تمارين وخطة تغذية رقمية، يعزز هوية دودز كلوب.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c1.8 3-1 4.2-1 7.2a3 3 0 106 0c0-1-.5-1.8-1-2.3.8 2.6-1 5.6-4 7.6-3-2-5-5-4-9 .5-2 2-2.6 4-3.5z" />
      </svg>
    ),
  },
  {
    name: "Bug Rush",
    tag: "قيد الإنشاء",
    desc: "أمن سيبراني وذكاء اصطناعي — مختبرو اختراق وترجمة آلية للشركات.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z" />
        <path d="M9.5 12l1.8 1.8L14.5 10" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="grain relative overflow-x-hidden">
      {/* ---------------- NAV ---------------- */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-10">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/logo_transparent_background.png"
            alt="Dudes"
            width={130}
            height={52}
            className="logo-mark"
          />
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/club"
            className="rounded-full bg-cta px-4 py-2 text-xs font-semibold tracking-wide text-cta-ink transition-transform hover:scale-105"
          >
            دودز كلوب
          </Link>
        </div>
      </header>

      {/* ---------------- HERO ---------------- */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 pb-16 text-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-drift absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-ink-faint/25 blur-3xl" />
          <div className="animate-drift-slow absolute -bottom-32 -left-20 h-[380px] w-[380px] rounded-full bg-ink-faint/20 blur-3xl" />
        </div>

        <Reveal>
          <p className="relative z-10 mb-4 text-xs font-semibold tracking-[0.3em] text-ink-soft uppercase">
            دودز كومباني
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="relative z-10 text-[13vw] leading-[0.95] font-bold tracking-tight text-balance sm:text-7xl">
            شركة سعودية، علامات متعددة
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="relative z-10 mt-6 max-w-lg text-lg text-ink-soft">
            دودز كومباني براند رئيسي سعودي، تنطلق منه علامات تجارية متنوعة
            في الرياضة والتقنية وغيرها.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/club"
              className="rounded-full bg-cta px-7 py-3 text-sm font-semibold text-cta-ink transition-transform hover:scale-105"
            >
              تعرّف على دودز كلوب
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ---------------- BRANDS ---------------- */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <Reveal className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-ink-soft uppercase">المظلة</p>
          <h2 className="text-3xl font-bold sm:text-5xl">علاماتنا التجارية</h2>
          <p className="mx-auto mt-4 max-w-lg text-ink-soft">
            براند رئيسي واحد، تتفرّع منه علامات فرعية متنوعة.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {brands.map((b, i) => (
            <Reveal key={b.name} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-line p-8 transition-colors hover:border-ink-soft">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-soft">
                  <div className="h-5 w-5">{b.icon}</div>
                </div>
                <h3 className="text-xl font-bold">{b.name}</h3>
                <p className="mt-1 text-xs font-medium tracking-wide text-ink-soft">{b.tag}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="border-t border-line px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-right">
          <Image src="/assets/logo_transparent_background.png" alt="Dudes" width={80} height={30} className="logo-mark opacity-70" />
          <p className="text-xs text-ink-faint">© دودز كومباني. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
