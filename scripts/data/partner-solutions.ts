import type { PartnerSolutionRow } from "../../src/lib/content/types";

// Edit this file, then run: npx tsx scripts/seed-partner-solutions.ts
//
// `image_file` is the card image, a path inside public/. `image_file_ar` is an
// optional Arabic version, for images with English text in them. Image blocks can also
// point at public/ with a path like "/partners/kryton/solutions/step.png": the
// seeder uploads those files and stores their public URLs.
export type PartnerSolutionSeed = Omit<
  PartnerSolutionRow,
  "id" | "partner_id" | "image_url" | "image_url_ar"
> & { partner_slug: string; image_file?: string; image_file_ar?: string };

export const partnerSolutions: PartnerSolutionSeed[] = [
  {
    partner_slug: "kryton",
    slug: "how-krystol-works",
    eyebrow_en: "The technology",
    eyebrow_ar: "التقنية",
    title_en: "How Krystol® works",
    title_ar: "كيف تعمل تقنية Krystol®",
    summary_en:
      "Instead of a membrane stuck to the surface, Krystol® makes the concrete itself watertight.",
    summary_ar:
      "فبدلاً من غشاء يُلصق على السطح، تجعل تقنية Krystol® الخرسانة نفسها مانعة للماء.",
    intro_en:
      "Every Kryton product in this profile carries Krystol® crystalline technology. Instead of a membrane stuck to the surface, it makes the concrete itself watertight — and keeps reacting for the life of the structure.",
    intro_ar:
      "جميع منتجات كرايتون في هذا الملف تحتوي على تقنية Krystol® البلورية. فبدلاً من غشاء يُلصق على السطح، تجعل الخرسانة نفسها مانعة للماء — وتبقى نشطة طوال عمر المنشأ.",
    image_file: "partners/kryton/solutions/krystol-step-2.png",
    blocks: [
      {
        type: "image_cards",
        label_en: "",
        label_ar: "",
        items: [
          {
            image_url: "/partners/kryton/solutions/krystol-step-1.png",
            label_en: "Pores & micro-cracks",
            label_ar: "المسام والشقوق الدقيقة",
            body_en:
              "All concrete has capillary pores and hairline cracks that let water and dissolved salts in.",
            body_ar:
              "كل خرسانة تحتوي على مسام شعرية وشقوق دقيقة تسمح بدخول الماء والأملاح الذائبة.",
          },
          {
            image_url: "/partners/kryton/solutions/krystol-step-2.png",
            label_en: "Water triggers crystals",
            label_ar: "الماء يحفّز التبلور",
            body_en:
              "Krystol reacts with water and unhydrated cement to grow insoluble, needle-shaped crystals.",
            body_ar:
              "تتفاعل Krystol مع الماء والإسمنت غير المتميّه لتكوين بلورات إبرية غير قابلة للذوبان.",
          },
          {
            image_url: "/partners/kryton/solutions/krystol-step-3.png",
            label_en: "Sealed — and stays active",
            label_ar: "إغلاق دائم ونشاط مستمر",
            body_en:
              "Pathways are blocked. If new moisture enters years later, crystallization starts again.",
            body_ar:
              "تُسد المسارات، وإذا دخلت رطوبة جديدة بعد سنوات يبدأ التبلور من جديد.",
          },
        ],
      },
      {
        type: "text",
        label_en: "Why it lasts",
        label_ar: "لماذا تدوم؟",
        body_en:
          "Krystol reacts with unhydrated cement and water — not with free lime, which depletes over time — so the self-sealing ability is permanent.",
        body_ar:
          "تتفاعل Krystol مع الإسمنت غير المتميّه والماء — وليس مع الجير الحر الذي ينفد مع الوقت — لذلك تبقى خاصية الإغلاق الذاتي دائمة.",
        variant: "important",
      },
      {
        type: "table",
        label_en: "Independently tested",
        label_ar: "اختبارات مستقلة",
        columns: [
          { en: "Test", ar: "الاختبار" },
          { en: "Result", ar: "النتيجة" },
          { en: "Laboratory", ar: "المختبر" },
        ],
        rows: [
          [
            { en: "Water penetration, DIN 1048-5 · KIM", ar: "نفاذية الماء DIN 1048-5 · KIM" },
            { en: "90% less: 3.7 mm vs 36.7 mm", ar: "أقل بنسبة 90%: 3.7 مم مقابل 36.7 مم" },
            { en: "Kuwait University", ar: "جامعة الكويت" },
          ],
          [
            { en: "Permeability, USACE CRD C48 · KIM", ar: "النفاذية USACE CRD C48 · KIM" },
            { en: "97% lower coefficient", ar: "انخفاض معامل النفاذية 97%" },
            { en: "Nelson Testing Labs, USA", ar: "Nelson Testing، أمريكا" },
          ],
          [
            { en: "Chloride, ASTM C1202 · Krystol T1", ar: "الكلوريدات ASTM C1202 · Krystol T1" },
            { en: "<100 C vs 2,564 C control", ar: "أقل من 100 كولوم مقابل 2,564" },
            { en: "NBTC Group, Kuwait", ar: "NBTC، الكويت" },
          ],
          [
            { en: "Drying shrinkage, BS 1881-5 · KIM", ar: "انكماش الجفاف BS 1881-5 · KIM" },
            { en: "25% reduction", ar: "انخفاض بنسبة 25%" },
            { en: "BBA, United Kingdom", ar: "BBA، بريطانيا" },
          ],
          [
            { en: "Sulfate attack, 21 cycles · KIM", ar: "هجوم الكبريتات، 21 دورة · KIM" },
            {
              en: "No strength loss (control −14%)",
              ar: "لا فقد في المقاومة (العينة المرجعية −14%)",
            },
            { en: "R. M. Hardy & Assoc., USA", ar: "R. M. Hardy، أمريكا" },
          ],
          [
            { en: "Rebar corrosion, ASTM G109 · KIM", ar: "تآكل حديد التسليح ASTM G109 · KIM" },
            {
              en: "Corrosion inhibited ≥2× vs control",
              ar: "تثبيط التآكل بمقدار الضعف على الأقل",
            },
            { en: "University of Victoria", ar: "جامعة فيكتوريا" },
          ],
        ],
        note_en: "Source: Kryton Technical Data Sheets (KIM V2023-09, Krystol T1 V2026-04).",
        note_ar: "المصدر: النشرات الفنية لكرايتون (KIM إصدار 2023، Krystol T1 إصدار 2026).",
      },
      {
        type: "badges",
        label_en: "Certifications & compliance",
        label_ar: "الشهادات والمطابقة",
        variant: "outline",
        items: [
          { en: "BBA Certificate 05/4217 (UK)", ar: "شهادة BBA رقم 05/4217 (بريطانيا)" },
          { en: "NSF/ANSI 61 · potable water", ar: "NSF/ANSI 61 · مياه الشرب" },
          { en: "ASTM C494", ar: "ASTM C494" },
          { en: "EN 934-2", ar: "EN 934-2" },
          { en: "ACI 212.3R · PRAH", ar: "ACI 212.3R · PRAH" },
          { en: "CE & UKCA marked", ar: "علامة CE و UKCA" },
          { en: "Dubai Certificate of Conformity", ar: "شهادة مطابقة دبي" },
        ],
      },
    ],
    sort_order: 1,
    published: true,
  },
  {
    partner_slug: "kryton",
    slug: "treating-joints-weak-points",
    eyebrow_en: "On site",
    eyebrow_ar: "في الموقع",
    title_en: "Treating joints & weak points",
    title_ar: "معالجة الفواصل ونقاط الضعف",
    summary_en:
      "After pouring the KIM slab and walls, GSO treats every point where water could bypass the concrete.",
    summary_ar:
      "بعد صب الأرضية والجدران بخرسانة KIM، تعالج GSO كل نقطة يمكن أن يتسرب منها الماء متجاوزاً الخرسانة.",
    intro_en:
      "After pouring the KIM slab and walls, GSO treats every point where water could bypass the concrete.",
    intro_ar:
      "بعد صب الأرضية والجدران بخرسانة KIM، تعالج GSO كل نقطة يمكن أن يتسرب منها الماء متجاوزاً الخرسانة.",
    image_file: "partners/kryton/solutions/wall-slab-joint-en.png",
    image_file_ar: "partners/kryton/solutions/wall-slab-joint-ar.png",
    blocks: [
      {
        type: "image",
        label_en: "",
        label_ar: "",
        image_url: "/partners/kryton/solutions/wall-slab-joint-en.png",
        image_url_ar: "/partners/kryton/solutions/wall-slab-joint-ar.png",
        alt_en: "Wall-to-slab (kicker) joint detail, inside face.",
        alt_ar: "تفصيلة فاصل الجدار مع الأرضية (النعلة) — الوجه الداخلي.",
        caption_en: "Wall-to-slab (kicker) joint detail, inside face.",
        caption_ar: "تفصيلة فاصل الجدار مع الأرضية (النعلة) — الوجه الداخلي.",
      },
      {
        type: "steps",
        label_en: "",
        label_ar: "",
        intro_en: "",
        intro_ar: "",
        steps_label_en: "",
        steps_label_ar: "",
        steps: [
          {
            en: "Clean construction joints, tie holes and MEP penetrations; remove loose mortar.",
            ar: "تنظيف فواصل الصب ونقاط الزراجين وحول التمديدات الكهربائية والمائية، وإزالة المونة المعلّقة.",
          },
          {
            en: "Open joints and tie holes into V-grooves; chip honeycombing back to sound concrete.",
            ar: "تفتيح الفواصل والزراجين على شكل حرف V، وجرف التعشيش حتى الخرسانة السليمة.",
          },
          {
            en: "Open the main wall-to-slab joint along its full length.",
            ar: "تفتيح فاصل الصب الرئيسي بين الجدران والأرضية بكامل طوله.",
          },
          {
            en: "Fill grooves, tie holes and cavities with Krystol Repair Grout.",
            ar: "حشو الفواصل والزراجين والتجاويف بمادة Krystol Repair Grout.",
          },
          {
            en: "Form a 45° fillet at the wall–slab joint with cement mortar mixed with KIM, to the height set by the engineer.",
            ar: "عمل نعلة بزاوية 45° عند التقاء الجدار بالأرضية بمونة إسمنتية مخلوطة بمادة KIM، وبالارتفاع الذي يحدده المهندس.",
          },
          {
            en: "Coat all treated areas with Krystol T1.",
            ar: "طلاء جميع أماكن المعالجة بمادة Krystol T1.",
          },
          {
            en: "Repeat the same procedure in manholes and elevator pits.",
            ar: "تكرار نفس الخطوات في المناهيل وحفر المصاعد.",
          },
        ],
      },
    ],
    sort_order: 2,
    published: true,
  },
  {
    partner_slug: "kryton",
    slug: "waterproof-concrete-inside-out",
    eyebrow_en: "Company profile · Crystalline concrete waterproofing",
    eyebrow_ar: "ملف الشركة · العزل المائي البلوري للخرسانة",
    title_en: "Waterproof concrete, from the inside out.",
    title_ar: "خرسانة مانعة لتسرب المياه من الداخل إلى الخارج.",
    summary_en:
      "Kryton Krystol® technology turns the concrete itself into the waterproof barrier.",
    summary_ar: "تقنية Krystol® من كرايتون تجعل الخرسانة نفسها هي الحاجز المانع للماء.",
    intro_en:
      "Kryton Krystol® technology turns the concrete itself into the waterproof barrier — for basements, water tanks, pools, manholes and marine structures in Kuwait.",
    intro_ar:
      "تقنية Krystol® من كرايتون تجعل الخرسانة نفسها هي الحاجز المانع للماء — للسراديب وخزانات المياه والمسابح والمناهيل والمنشآت البحرية في الكويت.",
    image_file: "partners/kryton/solutions/krystol-crystals-en.png",
    image_file_ar: "partners/kryton/solutions/krystol-crystals-ar.png",
    blocks: [
      {
        type: "image",
        label_en: "",
        label_ar: "",
        image_url: "/partners/kryton/solutions/krystol-crystals-en.png",
        image_url_ar: "/partners/kryton/solutions/krystol-crystals-ar.png",
        alt_en: "Krystol® crystals grow inside pores and micro-cracks, blocking water and chemicals.",
        alt_ar: "بلورات Krystol® تنمو داخل المسام والشقوق الدقيقة، وتمنع نفاذ المياه والمواد الكيميائية.",
        caption_en:
          "Illustration: Krystol® reacts with water and unhydrated cement to form insoluble needle-shaped crystals.",
        caption_ar:
          "رسم توضيحي: تتفاعل مادة Krystol® مع الماء وحبيبات الإسمنت غير المتميّهة لتكوّن بلورات إبرية غير قابلة للذوبان.",
      },
      {
        type: "stats",
        label_en: "",
        label_ar: "",
        items: [
          {
            value_en: "140 m",
            value_ar: "140 م",
            label_en: "hydrostatic head resistance",
            label_ar: "مقاومة الضغط الهيدروستاتيكي",
          },
          {
            value_en: "0.5 mm",
            value_ar: "0.5 مم",
            label_en: "hairline cracks self-sealed",
            label_ar: "إغلاق ذاتي للشقوق الشعرية",
          },
          {
            value_en: "1973",
            value_ar: "1973",
            label_en: "Kryton crystalline technology since",
            label_ar: "بداية تقنية كرايتون البلورية",
          },
        ],
      },
    ],
    sort_order: 3,
    published: true,
  },
];
