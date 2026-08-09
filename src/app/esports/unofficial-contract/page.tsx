import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./guide.module.css";

export const metadata: Metadata = {
  title: "Creator Partnership Guide — Nightmare Esports Organization",
  robots: { index: false, follow: false },
};

// Casual gate: this page is only meant to be reached via the exact link
// shared with a prospective partner. Anyone opening the bare path without
// the key (e.g. by guessing/typing it) gets a normal 404 instead of the
// document. This is not real security — a shared link can always be
// forwarded — just a way to keep it from being stumbled into.
const ACCESS_KEY = "qStPyKwOWRwz";

const toc = [
  { id: "s1", num: "أولاً", title: "من نحن؟" },
  { id: "s2", num: "ثانياً", title: "فلسفتنا" },
  { id: "s3", num: "ثالثاً", title: "طبيعة التعاون" },
  { id: "s4", num: "رابعاً", title: "ماذا تقدم المنظمة؟" },
  { id: "s5", num: "خامساً", title: "المقابل المالي" },
  { id: "s6", num: "سادساً", title: "نظام المستويات" },
  { id: "s7", num: "سابعاً", title: "معايير الترقية" },
  { id: "s8", num: "ثامناً", title: "ماذا نتوقعه منك؟" },
  { id: "s9", num: "تاسعاً", title: "رؤيتنا" },
  { id: "s10", num: "عاشراً", title: "الخطوة التالية" },
];

type PageProps = {
  searchParams: Promise<{ key?: string }>;
};

export default async function UnofficialContractPage({ searchParams }: PageProps) {
  const { key } = await searchParams;
  if (key !== ACCESS_KEY) {
    notFound();
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        {/* ============ COVER ============ */}
        <div className={styles.cover}>
          <Image
            src="/assets/esports/nightmare_logo.png"
            alt="Nightmare Esports Organization"
            width={200}
            height={116}
            style={{ width: "160px", height: "auto" }}
          />
          <p className={styles.eyebrow}>
            <bdi>Nightmare Esports Organization</bdi>
          </p>
          <h1>
            Creator Partnership Guide
            <br />
            دليل شراكة صناع المحتوى
          </h1>
          <p className={styles.subtitle}>
            قبل توقيع أي عقد، نود أن نوضح لك طريقة عمل المنظمة، وما الذي نقدمه لشركائنا، وما الذي
            نتوقعه منهم.
          </p>
          <div className={styles.meta}>
            <span>
              المنظمة: <b>Nightmare Esports Organization</b>
            </span>
            <span>
              تتبع: <b>Dudes Company</b>
            </span>
            <span>
              نوع المستند: <b>تمهيدي وغير رسمي</b>
            </span>
          </div>

          <div className={styles.callout}>
            <strong>هذا المستند غير رسمي وغير ملزم قانونيًا</strong>
            هو مجرد خطوة تمهيدية للتعارف على طريقة عمل المنظمة. أي حقوق أو التزامات فعلية تكون فقط
            ضمن عقد التعاون الرسمي الموقّع بين الطرفين.
          </div>
        </div>

        {/* ============ TOC ============ */}
        <div className={styles.toc}>
          <h2>فهرس المحتويات</h2>
          <ol className={styles.tocList}>
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>
                  <span>{item.title}</span>
                  <span className={styles.tocNum}>{item.num}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* ============ 1 ============ */}
        <section className={styles.section} id="s1">
          <p className={styles.sectionLabel}>أولاً</p>
          <h2>من نحن؟</h2>
          <p>
            <bdi>Nightmare Esports Organization</bdi> هي منظمة رياضات إلكترونية تابعة لـ{" "}
            <bdi>Dudes Company</bdi>.
          </p>
          <p>
            نعمل على بناء منظومة متكاملة في الرياضات الإلكترونية، تضم عدة قطاعات تعمل معًا تحت
            هوية واحدة. تشمل مجالاتنا:
          </p>
          <ul>
            <li>صناعة المحتوى المرئي.</li>
            <li>البثوث المباشرة.</li>
            <li>التحليل والتعليق.</li>
            <li>تنظيم البطولات.</li>
            <li>الأكاديميات والتدريب.</li>
            <li>الفرق التنافسية.</li>
            <li>الرعايات والشراكات.</li>
            <li>تطوير المواهب.</li>
          </ul>
          <p>
            هدفنا هو بناء بيئة تساعد الأشخاص الموهوبين على النمو، وتحويلهم إلى أسماء معروفة داخل
            مجتمع الرياضات الإلكترونية.
          </p>
        </section>

        {/* ============ 2 ============ */}
        <section className={styles.section} id="s2">
          <p className={styles.sectionLabel}>ثانياً</p>
          <h2>فلسفتنا</h2>
          <p>نؤمن أن النجاح لا يعتمد على الشهرة الحالية، بل على الاستمرارية والانضباط.</p>
          <p>
            لهذا نفضل العمل مع الأشخاص الذين يمتلكون الشغف والرغبة في التطور، حتى وإن كانوا في
            بداية مشوارهم.
          </p>
          <p>نجاحك يعتبر جزءًا من نجاح المنظمة، لذلك نعمل على تطوير الطرفين معًا.</p>
        </section>

        {/* ============ 3 ============ */}
        <section className={styles.section} id="s3">
          <p className={styles.sectionLabel}>ثالثاً</p>
          <h2>طبيعة التعاون</h2>
          <p>التعاون مع <bdi>Nightmare</bdi> ليس وظيفة تقليدية، بل شراكة احترافية طويلة المدى.</p>
          <p>
            نعمل مع صناع المحتوى والستريمرز والمحللين واللاعبين على أساس النمو المشترك، حيث
            تستثمر المنظمة وقتها وخبراتها وعلاقاتها في تطوير العضو، بينما يلتزم العضو ببناء
            محتوى احترافي وتمثيل المنظمة بالشكل اللائق.
          </p>
        </section>

        {/* ============ 4 ============ */}
        <section className={styles.section} id="s4">
          <p className={styles.sectionLabel}>رابعاً</p>
          <h2>ماذا تقدم المنظمة؟</h2>
          <p>
            عند انضمامك إلى <bdi>Nightmare</bdi> ستحصل على:
          </p>
          <ul>
            <li>هوية احترافية داخل المنظمة.</li>
            <li>بناء وتطوير علامتك الشخصية.</li>
            <li>إدارة الرعايات والشراكات.</li>
            <li>التسويق للمحتوى.</li>
            <li>فرص ظهور أكبر عبر منصات المنظمة.</li>
            <li>المشاركة في البطولات والفعاليات.</li>
            <li>فرص التعاون مع أعضاء المنظمة.</li>
            <li>دعم إداري وتنظيمي.</li>
            <li>متابعة وتطوير مستمر.</li>
            <li>بيئة احترافية تساعد على النمو.</li>
          </ul>
        </section>

        {/* ============ 5 ============ */}
        <section className={styles.section} id="s5">
          <p className={styles.sectionLabel}>خامساً</p>
          <h2>المقابل المالي</h2>
          <p>في المرحلة الحالية، لا تعتمد المنظمة على الرواتب الشهرية الثابتة.</p>
          <p>بدلًا من ذلك، يتم بناء التعاون على مبدأ تحقيق النمو للطرفين، وتشمل مصادر الدخل الممكنة:</p>
          <ul>
            <li>نسبة من الرعايات.</li>
            <li>نسبة من الحملات الإعلانية.</li>
            <li>المكافآت.</li>
            <li>العمولات.</li>
            <li>الفرص التجارية.</li>
            <li>المزايا الخاصة حسب مستوى العضو.</li>
          </ul>
          <p>كلما نما المحتوى وازدادت النتائج، زادت الفرص والعوائد المالية.</p>
        </section>

        {/* ============ 6 ============ */}
        <section className={styles.section} id="s6">
          <p className={styles.sectionLabel}>سادساً</p>
          <h2>نظام المستويات (Tier System)</h2>
          <p>
            تعتمد المنظمة نظامًا داخليًا لتطوير الأعضاء، ويتم الانتقال بين المستويات بناءً على
            الأداء والالتزام والاستمرارية.
          </p>

          <h3>Tier 1 — Rookie</h3>
          <p>مرحلة الانضمام. الهدف في هذه المرحلة هو بناء اسم العضو وتطوير مستواه. يحصل العضو على:</p>
          <ul>
            <li>الانضمام الرسمي للمنظمة.</li>
            <li>الدعم الأساسي.</li>
            <li>التسويق للمحتوى.</li>
            <li>إدارة الرعايات.</li>
            <li>فرص الظهور.</li>
            <li>المتابعة المستمرة.</li>
          </ul>

          <h3>Tier 2 — Rising</h3>
          <p>يصل إليه العضو بعد إثبات الالتزام وتحقيق نتائج جيدة. يحصل على:</p>
          <ul>
            <li>فرص رعاية أكبر.</li>
            <li>أولوية في الحملات.</li>
            <li>دعم إعلامي أكبر.</li>
            <li>فرص تعاون إضافية.</li>
            <li>مزايا مالية أفضل.</li>
          </ul>

          <h3>Tier 3 — Elite</h3>
          <p>مخصص للأعضاء أصحاب الأداء الاستثنائي. يحصل على:</p>
          <ul>
            <li>أعلى مستوى من الدعم.</li>
            <li>أولوية في المشاريع الكبرى.</li>
            <li>أفضل فرص الرعاية.</li>
            <li>عقود أو مزايا خاصة.</li>
            <li>مشاركة أكبر في خطط المنظمة المستقبلية.</li>
          </ul>
        </section>

        {/* ============ 7 ============ */}
        <section className={styles.section} id="s7">
          <p className={styles.sectionLabel}>سابعاً</p>
          <h2>معايير الترقية</h2>
          <p>يتم تقييم جميع الأعضاء بشكل دوري اعتمادًا على:</p>
          <ul>
            <li>جودة المحتوى.</li>
            <li>الالتزام.</li>
            <li>الاحترافية.</li>
            <li>الاستمرارية.</li>
            <li>التفاعل.</li>
            <li>التعاون مع المنظمة.</li>
            <li>تحقيق الأهداف المتفق عليها.</li>
            <li>تمثيل المنظمة بالشكل المناسب.</li>
          </ul>
        </section>

        {/* ============ 8 ============ */}
        <section className={styles.section} id="s8">
          <p className={styles.sectionLabel}>ثامناً</p>
          <h2>ماذا نتوقعه منك؟</h2>
          <p>نتوقع من جميع أعضاء المنظمة:</p>
          <ul>
            <li>الالتزام بالمواعيد.</li>
            <li>التعامل باحترافية.</li>
            <li>احترام أعضاء المنظمة.</li>
            <li>
              المحافظة على سمعة <bdi>Nightmare</bdi>.
            </li>
            <li>الاستمرار في تطوير المحتوى.</li>
            <li>تقبل الملاحظات والعمل على تحسين الأداء.</li>
            <li>تمثيل المنظمة بالشكل الذي يليق بها.</li>
          </ul>
        </section>

        {/* ============ 9 ============ */}
        <section className={styles.section} id="s9">
          <p className={styles.sectionLabel}>تاسعاً</p>
          <h2>رؤيتنا</h2>
          <p>لسنا مجرد فريق رياضات إلكترونية.</p>
          <p>
            نسعى إلى بناء منظمة تضم صناع محتوى، وستريمرز، ومحللين، ولاعبين، ومنظمي بطولات،
            يعملون معًا لصناعة أثر حقيقي داخل مجتمع الرياضات الإلكترونية، مع التركيز على التطوير
            المستمر والنمو طويل المدى.
          </p>
        </section>

        {/* ============ 10 ============ */}
        <section className={styles.section} id="s10">
          <p className={styles.sectionLabel}>عاشراً</p>
          <h2>الخطوة التالية</h2>
          <p>
            إذا وجدت أن آلية التعاون تناسب أهدافك، فستكون الخطوة التالية هي مراجعة وتوقيع عقد
            التعاون الرسمي الذي يتضمن جميع البنود القانونية والحقوق والالتزامات للطرفين.
          </p>
        </section>

        <div className={styles.docFooter}>
          © <bdi>Nightmare Esports Organization</bdi> · دودز كومباني. جميع الحقوق محفوظة.
        </div>
      </div>
    </div>
  );
}
