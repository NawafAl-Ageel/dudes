import type { Metadata } from "next";
import Image from "next/image";
import styles from "../esports.module.css";
import pageStyles from "./guide.module.css";

export const metadata: Metadata = {
  title: "Creator Partnership Guide — Nightmare Esports Organization",
  robots: { index: false, follow: false },
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-line py-10">
      <h2 className="text-xl font-bold text-[var(--accent)] sm:text-2xl">{title}</h2>
      <div className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-ink-soft sm:text-base">
        {children}
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Tier({
  name,
  label,
  desc,
  perks,
}: {
  name: string;
  label: string;
  desc: string;
  perks: string[];
}) {
  return (
    <div className="rounded-2xl border border-line bg-bg-raised p-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-ink-faint uppercase">{name}</p>
      <h3 className="mt-1 text-lg font-bold">{label}</h3>
      <p className="mt-2 text-sm text-ink-soft">{desc}</p>
      <div className="mt-4">
        <BulletList items={perks} />
      </div>
    </div>
  );
}

export default function CreatorGuidePage() {
  return (
    <div className={`${styles.esports} ${pageStyles.guide} grain relative overflow-x-hidden bg-bg text-ink`}>
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
        <header className="text-center">
          <Image
            src="/assets/esports/nightmare_logo.png"
            alt="Nightmare Esports Organization"
            width={220}
            height={128}
            className="mx-auto h-16 w-auto object-contain"
          />
          <p className="mt-8 text-xs font-semibold tracking-[0.3em] text-ink-soft uppercase">
            <bdi>Nightmare Esports Organization</bdi>
          </p>
          <h1 className="mt-3 text-2xl font-bold sm:text-4xl">Creator Partnership Guide</h1>
          <p className="mt-6 text-sm leading-relaxed text-ink-soft sm:text-base">
            مرحبًا بك في Nightmare Esports Organization.
            <br />
            قبل توقيع أي عقد، نود أن نوضح لك طريقة عمل المنظمة، وما الذي نقدمه لشركائنا، وما الذي
            نتوقعه منهم.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-ink-faint">
            هدف هذا المستند هو توضيح طبيعة الشراكة بشكل مبسط، أما جميع البنود القانونية والمالية
            الرسمية فتكون ضمن عقد التعاون الأساسي.
          </p>
        </header>

        <div className="mt-10 rounded-2xl border border-[var(--accent)]/40 bg-[var(--accent)]/10 p-5 text-center">
          <p className="text-sm font-semibold text-ink">هذا المستند غير رسمي وغير ملزم قانونيًا</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-soft">
            هو مجرد خطوة تمهيدية للتعارف على طريقة عمل المنظمة. أي حقوق أو التزامات فعلية تكون فقط
            ضمن عقد التعاون الرسمي الموقّع بين الطرفين.
          </p>
        </div>

        <div className="mt-16">
          <Section title="من نحن؟">
            <p>
              <bdi>Nightmare Esports Organization</bdi> هي منظمة رياضات إلكترونية تابعة لـ{" "}
              <bdi>Dudes Company</bdi>.
            </p>
            <p>
              نعمل على بناء منظومة متكاملة في الرياضات الإلكترونية، تضم عدة قطاعات تعمل معًا تحت
              هوية واحدة. تشمل مجالاتنا:
            </p>
            <BulletList
              items={[
                "صناعة المحتوى المرئي.",
                "البثوث المباشرة.",
                "التحليل والتعليق.",
                "تنظيم البطولات.",
                "الأكاديميات والتدريب.",
                "الفرق التنافسية.",
                "الرعايات والشراكات.",
                "تطوير المواهب.",
              ]}
            />
            <p>
              هدفنا هو بناء بيئة تساعد الأشخاص الموهوبين على النمو، وتحويلهم إلى أسماء معروفة داخل
              مجتمع الرياضات الإلكترونية.
            </p>
          </Section>

          <Section title="فلسفتنا">
            <p>نؤمن أن النجاح لا يعتمد على الشهرة الحالية، بل على الاستمرارية والانضباط.</p>
            <p>
              لهذا نفضل العمل مع الأشخاص الذين يمتلكون الشغف والرغبة في التطور، حتى وإن كانوا في
              بداية مشوارهم.
            </p>
            <p>نجاحك يعتبر جزءًا من نجاح المنظمة، لذلك نعمل على تطوير الطرفين معًا.</p>
          </Section>

          <Section title="طبيعة التعاون">
            <p>التعاون مع Nightmare ليس وظيفة تقليدية، بل شراكة احترافية طويلة المدى.</p>
            <p>
              نعمل مع صناع المحتوى والستريمرز والمحللين واللاعبين على أساس النمو المشترك، حيث
              تستثمر المنظمة وقتها وخبراتها وعلاقاتها في تطوير العضو، بينما يلتزم العضو ببناء
              محتوى احترافي وتمثيل المنظمة بالشكل اللائق.
            </p>
          </Section>

          <Section title="ماذا تقدم المنظمة؟">
            <p>عند انضمامك إلى Nightmare ستحصل على:</p>
            <BulletList
              items={[
                "هوية احترافية داخل المنظمة.",
                "بناء وتطوير علامتك الشخصية.",
                "إدارة الرعايات والشراكات.",
                "التسويق للمحتوى.",
                "فرص ظهور أكبر عبر منصات المنظمة.",
                "المشاركة في البطولات والفعاليات.",
                "فرص التعاون مع أعضاء المنظمة.",
                "دعم إداري وتنظيمي.",
                "متابعة وتطوير مستمر.",
                "بيئة احترافية تساعد على النمو.",
              ]}
            />
          </Section>

          <Section title="المقابل المالي">
            <p>في المرحلة الحالية، لا تعتمد المنظمة على الرواتب الشهرية الثابتة.</p>
            <p>بدلًا من ذلك، يتم بناء التعاون على مبدأ تحقيق النمو للطرفين، وتشمل مصادر الدخل الممكنة:</p>
            <BulletList
              items={[
                "نسبة من الرعايات.",
                "نسبة من الحملات الإعلانية.",
                "المكافآت.",
                "العمولات.",
                "الفرص التجارية.",
                "المزايا الخاصة حسب مستوى العضو.",
              ]}
            />
            <p>كلما نما المحتوى وازدادت النتائج، زادت الفرص والعوائد المالية.</p>
          </Section>

          <Section title="نظام المستويات (Tier System)">
            <p>
              تعتمد المنظمة نظامًا داخليًا لتطوير الأعضاء، ويتم الانتقال بين المستويات بناءً على
              الأداء والالتزام والاستمرارية.
            </p>
            <div className="mt-4 flex flex-col gap-4">
              <Tier
                name="Tier 1"
                label="Rookie"
                desc="مرحلة الانضمام. الهدف في هذه المرحلة هو بناء اسم العضو وتطوير مستواه."
                perks={[
                  "الانضمام الرسمي للمنظمة.",
                  "الدعم الأساسي.",
                  "التسويق للمحتوى.",
                  "إدارة الرعايات.",
                  "فرص الظهور.",
                  "المتابعة المستمرة.",
                ]}
              />
              <Tier
                name="Tier 2"
                label="Rising"
                desc="يصل إليه العضو بعد إثبات الالتزام وتحقيق نتائج جيدة."
                perks={[
                  "فرص رعاية أكبر.",
                  "أولوية في الحملات.",
                  "دعم إعلامي أكبر.",
                  "فرص تعاون إضافية.",
                  "مزايا مالية أفضل.",
                ]}
              />
              <Tier
                name="Tier 3"
                label="Elite"
                desc="مخصص للأعضاء أصحاب الأداء الاستثنائي."
                perks={[
                  "أعلى مستوى من الدعم.",
                  "أولوية في المشاريع الكبرى.",
                  "أفضل فرص الرعاية.",
                  "عقود أو مزايا خاصة.",
                  "مشاركة أكبر في خطط المنظمة المستقبلية.",
                ]}
              />
            </div>
          </Section>

          <Section title="معايير الترقية">
            <p>يتم تقييم جميع الأعضاء بشكل دوري اعتمادًا على:</p>
            <BulletList
              items={[
                "جودة المحتوى.",
                "الالتزام.",
                "الاحترافية.",
                "الاستمرارية.",
                "التفاعل.",
                "التعاون مع المنظمة.",
                "تحقيق الأهداف المتفق عليها.",
                "تمثيل المنظمة بالشكل المناسب.",
              ]}
            />
          </Section>

          <Section title="ماذا نتوقعه منك؟">
            <p>نتوقع من جميع أعضاء المنظمة:</p>
            <BulletList
              items={[
                "الالتزام بالمواعيد.",
                "التعامل باحترافية.",
                "احترام أعضاء المنظمة.",
                "المحافظة على سمعة Nightmare.",
                "الاستمرار في تطوير المحتوى.",
                "تقبل الملاحظات والعمل على تحسين الأداء.",
                "تمثيل المنظمة بالشكل الذي يليق بها.",
              ]}
            />
          </Section>

          <Section title="رؤيتنا">
            <p>لسنا مجرد فريق رياضات إلكترونية.</p>
            <p>
              نسعى إلى بناء منظمة تضم صناع محتوى، وستريمرز، ومحللين، ولاعبين، ومنظمي بطولات،
              يعملون معًا لصناعة أثر حقيقي داخل مجتمع الرياضات الإلكترونية، مع التركيز على التطوير
              المستمر والنمو طويل المدى.
            </p>
          </Section>

          <section className="py-10">
            <h2 className="text-xl font-bold text-[var(--accent)] sm:text-2xl">الخطوة التالية</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
              إذا وجدت أن آلية التعاون تناسب أهدافك، فستكون الخطوة التالية هي مراجعة وتوقيع عقد
              التعاون الرسمي الذي يتضمن جميع البنود القانونية والحقوق والالتزامات للطرفين.
            </p>
          </section>
        </div>

        <footer className="mt-10 border-t border-line pt-8 text-center">
          <p className="text-xs text-ink-faint">
            © <bdi>Nightmare Esports Organization</bdi> · دودز كومباني. جميع الحقوق محفوظة.
          </p>
        </footer>
      </div>
    </div>
  );
}
