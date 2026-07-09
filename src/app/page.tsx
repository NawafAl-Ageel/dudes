"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { ThemeToggle } from "@/components/ThemeToggle";

const collection = [
  { name: "Compression T-Shirt", ar: "تي شيرت ضاغط", img: "/assets/weared_shirt_from_front.png" },
  { name: "Slim Fit T-Shirt", ar: "تي شيرت سليم فت", img: "/assets/weared_shirt_from_back.png" },
  { name: "Oversize T-Shirt", ar: "تي شيرت أوفرسايز", img: "/assets/dudesclub_brown_shirt.png" },
  { name: "Tank Top", ar: "تانك توب", img: "/assets/dudesclub_grey_shirt.png" },
];

const family = [
  {
    name: "Dudes Club",
    tag: "القسم الرياضي — جاهز",
    desc: "براند الملابس الرياضية، موجّه حصراً للشباب من 15 إلى 28 سنة.",
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
        <nav className="hidden items-center gap-8 text-sm text-ink-soft sm:flex">
          <a href="#story" className="transition-colors hover:text-ink">القصة</a>
          <a href="#club" className="transition-colors hover:text-ink">دودز كلوب</a>
          <a href="#collection" className="transition-colors hover:text-ink">المجموعة</a>
          <a href="#family" className="transition-colors hover:text-ink">العائلة</a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#cta"
            className="rounded-full border border-line px-4 py-2 text-xs font-semibold tracking-wide text-ink transition-colors hover:bg-cta hover:text-cta-ink"
          >
            قريباً
          </a>
        </div>
      </header>

      {/* ---------------- HERO ---------------- */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 pb-20 text-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-drift absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-ink-faint/25 blur-3xl" />
          <div className="animate-drift-slow absolute -bottom-32 -left-20 h-[380px] w-[380px] rounded-full bg-ink-faint/20 blur-3xl" />
          <div className="absolute top-1/3 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-line to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: -6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-24 left-6 z-10 hidden rotate-[-6deg] rounded-lg bg-zinc-50 px-3 py-2 shadow-2xl sm:block"
        >
          <Image src="/assets/IMG_0428.JPG.jpeg" alt="Dudes Club" width={90} height={60} className="opacity-90" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mb-4 text-xs font-semibold tracking-[0.3em] text-ink-soft uppercase"
        >
          دودز كومباني تقدّم
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-[15vw] leading-[0.95] font-bold tracking-tight text-balance sm:text-8xl"
        >
          دودز كلوب
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative z-10 mt-6 max-w-lg text-lg text-ink-soft"
        >
          مو بس ملابس. استراتيجية. براند رياضي سعودي 100% لا يشبه غيره،
          مصمم للشباب من 15 إلى 28 سنة.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#collection"
            className="rounded-full bg-cta px-7 py-3 text-sm font-semibold text-cta-ink transition-transform hover:scale-105"
          >
            شوف المجموعة الأولى
          </a>
          <a
            href="#story"
            className="rounded-full border border-line px-7 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            اعرف القصة
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mt-14 w-full max-w-sm"
        >
          <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 text-[13rem] leading-none font-black text-ink-faint/60 select-none sm:text-[16rem]">
              01
            </span>
            <Image
              src="/assets/weared_shirt_from_front.png"
              alt="Dudes Club T-Shirt"
              width={520}
              height={620}
              priority
              className="relative z-10 mx-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
            />
          </div>
        </motion.div>
      </section>

      <Marquee text="DUDES CLUB" />

      {/* ---------------- STORY ---------------- */}
      <section id="story" className="relative mx-auto max-w-3xl px-6 py-28 text-center">
        <Reveal>
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-ink-soft uppercase">الفلسفة</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl font-bold sm:text-5xl">استراتيجية السلحفاة</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-loose text-ink-soft sm:text-lg">
            الأرزاق بيد الله، إلا أن الأخذ بالأسباب هو ما يميّز المشاريع الناجحة. دودز كومباني تنمو
            ببطء نسبي في بدايتها، إلا أن نموّها مستمر ومتشعب — تماماً كما تتشعب دروع صدفة
            السلحفاة — لتتحول مع الوقت إلى مظلة تضم عدة علامات تجارية متنوعة المصادر والمخاطر.
          </p>
        </Reveal>
      </section>

      {/* ---------------- CLUB SPOTLIGHT ---------------- */}
      <section id="club" className="relative overflow-hidden bg-bg-raised py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-ink-soft uppercase">القسم الرياضي</p>
            <h2 className="text-3xl font-bold sm:text-5xl">فراغ حقيقي بالسوق</h2>
            <p className="mt-6 max-w-md text-base leading-loose text-ink-soft sm:text-lg">
              يعاني السوق السعودي من نقص واضح في البراندات الرياضية المحلية الموجّهة للشباب.
              المنافسة اليوم تقتصر على أسماء وافدة مثل <span className="text-ink">YoungLA</span> و
              <span className="text-ink"> Beyond Fit</span> — دون وجود منافس محلي حقيقي في هذه
              الفئة العمرية. دودز كلوب جاء ليملأ هذا الفراغ.
            </p>
            <div className="mt-8 flex gap-10 border-t border-line pt-6">
              <div>
                <p className="text-2xl font-bold">15–28</p>
                <p className="mt-1 text-xs text-ink-soft">الفئة العمرية المستهدفة</p>
              </div>
              <div>
                <p className="text-2xl font-bold">100%</p>
                <p className="mt-1 text-xs text-ink-soft">هوية سعودية محلية</p>
              </div>
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="mt-1 text-xs text-ink-soft">قطع الإطلاق الأولى</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="relative mx-auto flex max-w-sm items-center justify-center">
              <span className="pointer-events-none absolute -z-0 text-[3rem] leading-none font-black tracking-wider text-ink-faint/50 select-none sm:text-[4rem]">
                DUDESCLUB
              </span>
              <Image
                src="/assets/dudesclub_brown_shirt.png"
                alt="Dudes Club Shirt"
                width={480}
                height={480}
                className="relative z-10 drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- COLLECTION ---------------- */}
      <section id="collection" className="relative mx-auto max-w-6xl px-6 py-28">
        <Reveal className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-ink-soft uppercase">المجموعة الأولى</p>
          <h2 className="text-3xl font-bold sm:text-5xl">Collection 01</h2>
          <p className="mx-auto mt-4 max-w-md text-ink-soft">
            أربع قطع تفتتح بها دودز كلوب مسيرتها.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collection.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-bg-raised p-6 transition-colors hover:border-ink-soft">
                <span className="absolute top-4 left-4 text-xs font-semibold text-ink-faint">
                  0{i + 1}
                </span>
                <div className="relative flex flex-1 items-center justify-center py-6">
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={220}
                    height={260}
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 border-t border-line pt-4 text-center">
                  <p className="font-semibold text-ink">{item.ar}</p>
                  <p className="mt-1 text-xs tracking-wide text-ink-soft uppercase">{item.name}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Marquee text="COMING SOON — قريباً" />

      {/* ---------------- DETAILS / ACCESSORIES ---------------- */}
      <section className="relative overflow-hidden bg-bg-raised py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative mx-auto flex max-w-sm items-center justify-center">
              <div className="animate-drift-slow absolute h-64 w-64 rounded-full bg-ink-faint/20 blur-3xl" />
              <Image
                src="/assets/dudes_cap.png"
                alt="Dudes Cap"
                width={460}
                height={460}
                className="relative z-10 drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)]"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-ink-soft uppercase">التفاصيل</p>
            <h2 className="text-3xl font-bold sm:text-5xl">حتى القطع الصغيرة مدروسة</h2>
            <p className="mt-6 max-w-md text-base leading-loose text-ink-soft sm:text-lg">
              كابات دودز كلوب تكمّل المجموعة الأولى — بشعار معدني محفور بعناية، بعيداً عن الطباعة
              العادية. تفاصيل صغيرة، لكنها تعكس نفس الجدّية التي بُني عليها البراند بالكامل.
            </p>

            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-line p-3">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src="/assets/Dudes_metal.png"
                  alt="Dudes metal badge detail"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">شعار معدني محفور</p>
                <p className="mt-1 text-xs text-ink-soft">تفصيلة تُلمس قبل ما تُرى</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FAMILY ---------------- */}
      <section id="family" className="relative mx-auto max-w-6xl px-6 py-28">
        <Reveal className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-ink-soft uppercase">المظلة</p>
          <h2 className="text-3xl font-bold sm:text-5xl">دودز كومباني</h2>
          <p className="mx-auto mt-4 max-w-lg text-ink-soft">
            براند رئيسي واحد، تتفرّع منه علامات فرعية متنوعة — إذا تعثّرت واحدة، تستمر البقية.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {family.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-line p-8 transition-colors hover:border-ink-soft">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-soft">
                  <div className="h-5 w-5">{f.icon}</div>
                </div>
                <h3 className="text-xl font-bold">{f.name}</h3>
                <p className="mt-1 text-xs font-medium tracking-wide text-ink-soft">{f.tag}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section id="cta" className="relative overflow-hidden px-6 py-32 text-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-drift-slow absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-ink-faint/20 blur-3xl" />
        </div>
        <Reveal>
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-ink-soft uppercase">الإطلاق قريب</p>
          <h2 className="text-4xl font-bold text-balance sm:text-6xl">
            كن أول من يلبس
            <br />
            دودز كلوب
          </h2>
          <p className="mx-auto mt-6 max-w-md text-ink-soft">
            تابعنا على مواقع التواصل الاجتماعي لتكون أول من يعرف بموعد الإطلاق الرسمي.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="#"
              className="rounded-full bg-cta px-8 py-3.5 text-sm font-semibold text-cta-ink transition-transform hover:scale-105"
            >
              تابعنا على إنستقرام
            </a>
          </div>
        </Reveal>
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
