import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import styles from "./esports.module.css";

export const metadata: Metadata = {
  title: "Nightmare Esports Organization — دودز إي-سبورتس",
  description:
    "Nightmare Esports Organization، قسم الرياضات الإلكترونية التابع لدودز كومباني. تعرّف على فرقنا والفرص المتاحة للانضمام.",
};

const teams = [
  {
    name: "Nightmare",
    tagline: "الفريق الرئيسي",
    desc: "الاسم مو صدفة — Nightmare لأنه ما ينهزم.",
    logo: "/assets/esports/nightmare_logo.png",
    flagship: true,
  },
  {
    name: "Daydream",
    tagline: "حلم اليقظة",
    desc: "فريق فرعي يكتب بداياته الآن، ضمن استراتيجية توسّع المنظمة.",
    logo: "/assets/esports/daydream_logo.png",
    flagship: false,
  },
  {
    name: "Lucid Dream",
    tagline: "الحلم الواعي",
    desc: "فريق فرعي يكتب بداياته الآن، ضمن استراتيجية توسّع المنظمة.",
    logo: "/assets/esports/lucid_dream.png",
    flagship: false,
  },
];

function MediaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 15a3 3 0 003-3V6a3 3 0 10-6 0v6a3 3 0 003 3z" />
      <path d="M19 11a7 7 0 01-14 0" />
      <path d="M12 18v3" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4h8v5a4 4 0 01-8 0V4z" />
      <path d="M8 5H5a3 3 0 003 4" />
      <path d="M16 5h3a3 3 0 01-3 4" />
      <path d="M12 13v3" />
      <path d="M9 20h6" />
      <path d="M10 16h4l1 4H9l1-4z" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M3.5 19c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" />
      <path d="M15 14.2c2.3.3 4 2.2 4 4.8" />
    </svg>
  );
}

function AcademyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8l10-4 10 4-10 4-10-4z" />
      <path d="M6 10v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
    </svg>
  );
}

function SeatRow({
  count,
  image,
  alt,
  size,
  muted,
}: {
  count: number;
  image: string;
  alt: string;
  size: number;
  muted?: boolean;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {Array.from({ length: count }).map((_, seat) => (
        <div
          key={seat}
          className={`relative shrink-0 overflow-hidden rounded-2xl bg-white ${muted ? "opacity-80" : ""}`}
          style={{ width: size }}
        >
          <span className="absolute top-2 right-2 z-10 rounded-full bg-[var(--accent)] px-2 py-0.5 text-[10px] font-semibold text-white">
            مقعد شاغر
          </span>
          <Image
            src={image}
            alt={alt}
            width={size}
            height={size}
            className="object-cover object-top"
            style={{ width: size, height: size * 1.21 }}
          />
        </div>
      ))}
    </div>
  );
}

const coreSectors = [
  { icon: <MediaIcon />, title: "الإعلام وصناعة المحتوى", desc: "المحتوى المرئي، البثوث المباشرة، والتحليل." },
  { icon: <TrophyIcon />, title: "تنظيم البطولات", desc: "إدارة وتنظيم البطولات التنافسية." },
  { icon: <TeamIcon />, title: "إدارة الفرق والرعايات", desc: "إدارة الفرق التنافسية والرعايات والشراكات." },
  { icon: <AcademyIcon />, title: "الأكاديميات والتدريب", desc: "برامج تدريب وتطوير المواهب." },
];

const extraSectors = [
  "الاستشارات",
  "الصحافة والإعلام",
  "وكالة اكتشاف المواهب",
  "تنظيم فعاليات الشركات",
  "منصة إدارة البطولات",
  "إنتاج مقابلات اللاعبين",
];

type Role = {
  game: string | null;
  gameIcon: string | null;
  title: string;
  image: string;
  pitch: string;
  count?: number;
  groups?: { label: string; count: number }[];
};

const roles: Role[] = [
  {
    game: "Overwatch",
    gameIcon: "/assets/esports/overwatch.webp",
    title: "فريق Overwatch",
    groups: [
      { label: "التشكيلة الأساسية", count: 5 },
      { label: "الاحتياط", count: 2 },
    ],
    image: "/assets/esports/anonymous_player.png",
    pitch: "الفريق الأساسي يتبنى من الصفر.",
  },
  {
    game: "Rocket League",
    gameIcon: "/assets/esports/rocket-league-96.png",
    title: "لاعب Rocket League",
    count: 1,
    image: "/assets/esports/anonymous_player.png",
    pitch: "مقعد واحد، يمثّل الفريق بالكامل.",
  },
  {
    game: null,
    gameIcon: null,
    title: "الستريمرز",
    count: 5,
    image: "/assets/esports/anonymous_streamer.png",
    pitch: "صوت الفريق قبل أول بطولة.",
  },
  {
    game: null,
    gameIcon: null,
    title: "المحللين",
    count: 2,
    image: "/assets/esports/anonymous_analyst.png",
    pitch: "الفريق اللي ياخذ اللعبة بجدية يحتاج عقول تحلل، مو بس تلعب.",
  },
];

const CTA_EMAIL = "nightmare@dudesco.com";

export default function EsportsPage() {
  return (
    <div className={`${styles.esports} grain relative overflow-x-hidden bg-bg text-ink`}>
      {/* ---------------- NAV ---------------- */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-10">
        <Image
          src="/assets/esports/nightmare_logo.png"
          alt="Nightmare Esports Organization"
          width={120}
          height={70}
          className="h-10 w-auto object-contain object-right sm:h-12"
        />
        <nav className="flex items-center gap-4 text-xs text-ink-soft sm:gap-8 sm:text-sm">
          <a href="#teams" className="transition-colors hover:text-ink">الفرق</a>
          <a href="#sectors" className="transition-colors hover:text-ink">القطاعات</a>
          <a href="#roles" className="transition-colors hover:text-ink">الفرص المتاحة</a>
        </nav>
        <a
          href={`mailto:${CTA_EMAIL}`}
          className="rounded-full bg-cta px-4 py-2 text-xs font-semibold tracking-wide text-cta-ink transition-transform hover:scale-105"
        >
          قدّم الآن
        </a>
      </header>

      {/* ---------------- HERO ---------------- */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 pb-16 text-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-drift absolute -top-24 -right-24 h-[460px] w-[460px] rounded-full bg-[var(--accent)]/20 blur-3xl" />
          <div className="animate-drift-slow absolute -bottom-32 -left-20 h-[400px] w-[400px] rounded-full bg-[var(--accent)]/15 blur-3xl" />
        </div>

        <Reveal>
          <p className="relative z-10 mb-4 text-xs font-semibold tracking-[0.3em] text-ink-soft uppercase">
            <bdi>Nightmare Esports Organization</bdi>
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="relative z-10 max-w-3xl text-4xl leading-[1.15] font-bold text-balance sm:text-6xl">
            ما عندنا سجل نعرضه عليك — عندنا مقعد نعرضه عليك.
          </h1>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="relative z-10 mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            دودز إي-سبورتس تدخل صناعة الرياضات الإلكترونية بطموح واضح: التوسع في أكبر عدد ممكن من
            قطاعاتها، عبر استراتيجية نمو مدروسة ومستدامة.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${CTA_EMAIL}`}
              className="rounded-full bg-cta px-7 py-3 text-sm font-semibold text-cta-ink transition-transform hover:scale-105"
            >
              قدّم الآن
            </a>
            <a
              href="#roles"
              className="rounded-full border border-line px-7 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink-soft"
            >
              شوف الفرص المتاحة
            </a>
          </div>
        </Reveal>
      </section>

      {/* ---------------- LEGEND ---------------- */}
      <section className="relative mx-auto max-w-2xl px-6 py-28 text-center">
        <Reveal y={12}>
          <p className={`${styles.legendLine} text-lg leading-loose text-ink-soft sm:text-2xl`}>
            يقال إن الكابوس أسطورة قديمة لا تختار أحدًا، بل تزور الجميع في صمت الليل.
          </p>
        </Reveal>
        <Reveal y={12} delay={0.5}>
          <p className={`${styles.legendLine} mt-6 text-lg leading-loose text-ink-soft sm:text-2xl`}>
            كلما هرب الإنسان من خوفه، وجد الكابوس يسبقه بخطوة داخل أحلامه.
          </p>
        </Reveal>
        <Reveal y={12} delay={1}>
          <p className={`${styles.legendLine} mt-6 text-lg leading-loose text-ink sm:text-2xl`}>
            ولهذا بقيت الحكايات تقول إن لا أحد ينجو من مطاردة الكوابيس إلى الأبد.
          </p>
        </Reveal>
      </section>

      {/* ---------------- TEAMS ---------------- */}
      <section id="teams" className="relative mx-auto max-w-5xl px-6 py-24">
        <Reveal className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-ink-soft uppercase">الفرق</p>
          <h2 className="text-3xl font-bold sm:text-5xl">
            تحت مظلة <bdi>Nightmare Esports Organization</bdi>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Reveal className="sm:col-span-2">
            <div className="flex flex-col items-center gap-6 rounded-3xl border border-line bg-bg-raised p-8 text-center sm:flex-row sm:text-right">
              <Image
                src={teams[0].logo}
                alt={teams[0].name}
                width={280}
                height={160}
                className={`${styles.logoGlow} h-24 w-auto object-contain sm:h-28`}
              />
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-ink-faint uppercase">{teams[0].tagline}</p>
                <h3 className="mt-1 text-2xl font-bold">
                  <bdi>{teams[0].name}</bdi>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{teams[0].desc}</p>
              </div>
            </div>
          </Reveal>

          {teams.slice(1).map((team, i) => (
            <Reveal key={team.name} delay={0.1 + i * 0.1}>
              <div className="flex h-full flex-col items-center gap-4 rounded-3xl border border-line bg-bg-raised p-8 text-center">
                <Image
                  src={team.logo}
                  alt={team.name}
                  width={220}
                  height={130}
                  className="h-16 w-auto object-contain"
                />
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-ink-faint uppercase">{team.tagline}</p>
                  <h3 className="mt-1 text-xl font-bold">
                    <bdi>{team.name}</bdi>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{team.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- SECTORS ---------------- */}
      <section id="sectors" className="relative overflow-hidden bg-bg-raised py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-ink-soft uppercase">النشاط</p>
            <h2 className="text-3xl font-bold sm:text-5xl">قطاعات النشاط</h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreSectors.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-bg p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-line text-[var(--accent)]">
                    <div className="h-5 w-5">{s.icon}</div>
                  </div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="mt-12 text-center">
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-ink-faint uppercase">
              قطاعات نتوسع فيها
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {extraSectors.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-line px-4 py-1.5 text-xs text-ink-soft"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- GAMES ---------------- */}
      <section className="relative border-y border-line py-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-ink-faint uppercase">الألعاب اللي نتنافس فيها</p>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <Image src="/assets/esports/overwatch.webp" alt="Overwatch 2" width={32} height={32} />
              <span className="text-sm font-medium text-ink-soft">
                <bdi>Overwatch 2</bdi>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/assets/esports/rocket-league-96.png" alt="Rocket League" width={32} height={32} />
              <span className="text-sm font-medium text-ink-soft">
                <bdi>Rocket League</bdi>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-ink-faint">
            <span>نخطط للتوسع إلى</span>
            <span className="rounded-full border border-line px-3 py-1">
              <bdi>CS:GO</bdi>
            </span>
            <span className="rounded-full border border-line px-3 py-1">
              <bdi>Valorant</bdi>
            </span>
          </div>
        </div>
      </section>

      {/* ---------------- ROLES / RECRUITING ---------------- */}
      <section id="roles" className="relative mx-auto max-w-5xl px-6 py-24">
        <Reveal className="mb-4 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-ink-soft uppercase">الفرص المتاحة</p>
          <h2 className="text-3xl font-bold sm:text-5xl">مقاعد شاغرة، مو نتائج نعرضها</h2>
          <p className="mx-auto mt-4 max-w-lg text-ink-soft">
            ما عندنا سجل نعرضه عليك بعد. عندنا مقاعد فاضية، وأول من يشغلها يكتب اسمه في تاريخ الفريق.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-14">
          {roles.map((role, i) => (
            <Reveal key={role.title} delay={i * 0.08}>
              <div>
                <div className="mb-4 flex items-center justify-center gap-2">
                  {role.gameIcon && (
                    <Image src={role.gameIcon} alt={role.game ?? ""} width={24} height={24} />
                  )}
                  <h3 className="text-lg font-bold">{role.title}</h3>
                </div>

                {role.groups ? (
                  <div className="flex flex-col items-center gap-8">
                    {role.groups.map((group) => (
                      <div key={group.label} className="flex flex-col items-center gap-3">
                        <p className="text-xs font-semibold tracking-[0.15em] text-ink-faint uppercase">
                          {group.label}
                        </p>
                        <SeatRow
                          count={group.count}
                          image={role.image}
                          alt={role.title}
                          size={group.label === "الاحتياط" ? 104 : 132}
                          muted={group.label === "الاحتياط"}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <SeatRow count={role.count ?? 0} image={role.image} alt={role.title} size={132} />
                )}

                <p className="mt-3 text-center text-sm text-ink-faint">{role.pitch}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-16 text-center">
          <a
            href={`mailto:${CTA_EMAIL}`}
            className="inline-flex rounded-full bg-cta px-7 py-3 text-sm font-semibold text-cta-ink transition-transform hover:scale-105"
          >
            قدّم الآن
          </a>
        </Reveal>
      </section>

      {/* ---------------- VISION ---------------- */}
      <section className="relative overflow-hidden bg-bg-raised py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Reveal>
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-ink-soft uppercase">الرؤية</p>
            <p className="text-lg leading-loose text-ink-soft sm:text-xl">
              الهدف الأساسي للمنظمة هو التوسع في أكبر عدد ممكن من القطاعات داخل صناعة الرياضات
              الإلكترونية، من خلال تنفيذ استراتيجيات نمو مدروسة ومستدامة.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-sm leading-relaxed text-ink-faint">
              دودز كومباني شركة موجودة فعليًا بمنتج حقيقي — <bdi>Dudes Club</bdi>. إي-سبورتس امتداد
              لها، مو مجرد حساب سوشيال ميديا.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <section className="relative overflow-hidden px-6 py-28 text-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-drift-slow absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[var(--accent)]/15 blur-3xl" />
        </div>
        <Reveal>
          <h2 className="text-3xl font-bold text-balance sm:text-5xl">تبي تكون جزء من التاريخ؟</h2>
          <p className="mx-auto mt-6 max-w-md text-ink-soft">
            راسلنا وخلك أول اسم يُكتب في سجل <bdi>Nightmare Esports Organization</bdi>.
          </p>
          <div className="mt-10">
            <a
              href={`mailto:${CTA_EMAIL}`}
              dir="ltr"
              className="inline-flex rounded-full bg-cta px-8 py-3.5 text-sm font-semibold text-cta-ink transition-transform hover:scale-105"
            >
              {CTA_EMAIL}
            </a>
          </div>
        </Reveal>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="border-t border-line px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-right">
          <Image
            src="/assets/esports/nightmare_logo.png"
            alt="Nightmare Esports Organization"
            width={100}
            height={58}
            className="h-8 w-auto object-contain opacity-70"
          />
          <p className="text-xs text-ink-faint">
            © <bdi>Nightmare Esports Organization</bdi> · دودز كومباني. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </div>
  );
}
