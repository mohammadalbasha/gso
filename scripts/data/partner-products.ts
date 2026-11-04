import type { ProductRow } from "../../src/lib/content/types";

// Edit this file, then run: npx tsx scripts/seed-partner-products.ts
//
// `image_file` is a path inside public/, e.g. "partners/kryton/kim.png".
// Leave it out to keep whatever image the product already has.
export type PartnerProductSeed = Omit<
  ProductRow,
  "id" | "partner_id" | "image_url"
> & { partner_slug: string; image_file?: string };

const testColumns = [
  { en: "Test", ar: "الاختبار" },
  { en: "Result", ar: "النتيجة" },
  { en: "Laboratory", ar: "المختبر" },
];

const category = {
  category_en: "Crystalline Concrete Waterproofing",
  category_ar: "العزل المائي البلوري للخرسانة",
};

export const partnerProducts: PartnerProductSeed[] = [
  {
    partner_slug: "kryton",
    slug: "kryton-kim",
    name_en: "KIM® — Krystol Internal Membrane™",
    name_ar: "KIM® — Krystol Internal Membrane™",
    subtitle_en: "For new concrete",
    subtitle_ar: "للخرسانات الحديثة الإنشاء",
    ...category,
    image_file: "partners/kryton/kim.png",
    details: [
      {
        type: "text",
        label_en: "",
        label_ar: "",
        body_en:
          "A grey, hydrophilic crystalline powder added to the concrete mix. The whole concrete section becomes the waterproof barrier, so external membranes, primers and protection boards are not needed below grade.",
        body_ar:
          "مسحوق بلوري رمادي محب للماء يُضاف إلى الخلطة الخرسانية، فيصبح كامل المقطع الخرساني حاجزاً مانعاً للماء، دون الحاجة إلى الأغشية الخارجية وطبقات البرايمر وألواح الحماية تحت منسوب الأرض.",
        variant: "default",
      },
      {
        type: "badges",
        label_en: "Key performance",
        label_ar: "أبرز الخصائص",
        variant: "solid",
        items: [
          { en: "140 m head", ar: "ضغط مائي حتى 140 م" },
          { en: "Self-seals cracks ≤ 0.5 mm", ar: "إغلاق ذاتي للشقوق حتى 0.5 مم" },
          { en: "NSF 61 potable water", ar: "NSF 61 لمياه الشرب" },
          { en: "BBA certified", ar: "معتمدة من BBA" },
        ],
      },
      {
        type: "list",
        label_en: "Why engineers specify it",
        label_ar: "لماذا يعتمدها المهندسون",
        items: [
          {
            en: "Protects against chlorides, sulfates and aggressive soils",
            ar: "تحمي من الكلوريدات والكبريتات والتربة العدوانية",
          },
          {
            en: "Reduces drying shrinkage (25%, BBA) and cracking",
            ar: "تقلل انكماش الجفاف (25% وفق BBA) والتشققات",
          },
          {
            en: "Negligible effect on slump, setting time and air",
            ar: "تأثير ضئيل على الهبوط وزمن الشك ونسبة الهواء",
          },
          {
            en: "Integral — cannot be punctured, peeled or UV-damaged",
            ar: "جزء من الخرسانة — لا تُثقب ولا تتقشر ولا تتأثر بالشمس",
          },
          {
            en: "Added at the batch plant: no extra site labour",
            ar: "تُضاف في مصنع الخرسانة: لا عمالة إضافية بالموقع",
          },
          {
            en: "Compatible with later coatings: epoxy, paint, tiles, GRP",
            ar: "متوافقة مع الطلاءات اللاحقة: إيبوكسي، دهانات، بلاط، GRP",
          },
        ],
      },
      {
        type: "badges",
        label_en: "Where to use",
        label_ar: "مجالات الاستخدام",
        variant: "soft",
        items: [
          { en: "Basement rafts & walls", ar: "بلاطات وجدران السراديب" },
          { en: "Retaining walls", ar: "الجدران الاستنادية" },
          { en: "Footings & piles", ar: "القواعد والخوازيق" },
          { en: "Water tanks & reservoirs", ar: "خزانات المياه" },
          { en: "Sewage tanks & manholes", ar: "خزانات الصرف والمناهيل" },
          { en: "Swimming pools", ar: "المسابح" },
          { en: "Elevator pits", ar: "حفر المصاعد" },
          { en: "Ports, quays & marine works", ar: "الموانئ والمنشآت البحرية" },
        ],
      },
      {
        type: "table",
        label_en: "Dosage",
        label_ar: "نسبة الخلط",
        columns: [
          { en: "Exposure", ar: "ظروف التعرض" },
          { en: "KIM per m³ of concrete", ar: "KIM لكل م³ خرسانة" },
        ],
        rows: [
          [
            { en: "Standard below-grade structures", ar: "المنشآت العادية تحت منسوب الأرض" },
            { en: "3 kg", ar: "3 كغ" },
          ],
          [
            {
              en: "Deep basements, high water table",
              ar: "السراديب العميقة ومنسوب المياه الجوفية المرتفع",
            },
            { en: "up to 5 kg", ar: "حتى 5 كغ" },
          ],
          [
            {
              en: "Marine structures, ports, severe chemical exposure",
              ar: "المنشآت البحرية والموانئ والتعرض الكيميائي الشديد",
            },
            { en: "up to 8 kg (max.)", ar: "حتى 8 كغ (حد أقصى)" },
          ],
        ],
        note_en:
          "Final dose is confirmed with GSO for each project; trial batches are recommended. Tanks, pools and fully buried elements: treat the full concrete volume.",
        note_ar:
          "تُحدَّد النسبة النهائية مع GSO لكل مشروع، ويُنصح بخلطات تجريبية. في الخزانات والمسابح والعناصر المدفونة بالكامل تُعالَج كامل كمية الخرسانة.",
      },
      {
        type: "steps",
        label_en: "Steps of use",
        label_ar: "خطوات الاستخدام",
        intro_en: "",
        intro_ar: "",
        steps_label_en: "",
        steps_label_ar: "",
        steps: [
          {
            en: "Pre-pour meeting with contractor, ready-mix supplier and engineer to agree dose and joint details.",
            ar: "اجتماع ما قبل الصب مع المقاول ومورّد الخرسانة والمهندس لاعتماد النسبة وتفاصيل الفواصل.",
          },
          {
            en: "Add KIM to the truck mixer or central mixer, matched to the m³ in each load.",
            ar: "إضافة KIM إلى الخلاطة المتنقلة أو المركزية بما يتناسب مع كمية الأمتار المكعبة في كل حمولة.",
          },
          {
            en: "Mix at medium/high speed: at least 1 minute per m³, never less than 3 minutes.",
            ar: "الخلط بسرعة متوسطة إلى عالية: دقيقة واحدة لكل م³ على الأقل، وبما لا يقل عن 3 دقائق.",
          },
          {
            en: "Place and vibrate well to avoid voids and honeycombing (contractor's responsibility).",
            ar: "الصب والهز الجيد لمنع الفراغات والتعشيش (من مسؤولية المقاول).",
          },
          {
            en: "Cure per ACI 308.1, then treat joints, tie holes and penetrations.",
            ar: "المعالجة وفق ACI 308.1، ثم معالجة الفواصل والزراجين والتمديدات.",
          },
        ],
      },
      {
        type: "text",
        label_en: "Warranty in Kuwait",
        label_ar: "الضمان في الكويت",
        body_en:
          "Up to 25 years when KIM is applied by GSO without an external membrane system (terms per contract).\nPackaging: 5 kg and 25 kg pails, or mixer-ready bags.",
        body_ar:
          "حتى 25 سنة عند تطبيق KIM بواسطة GSO دون نظام غشاء خارجي (وفق شروط العقد).\nالتعبئة: عبوات 5 كغ و25 كغ، أو أكياس جاهزة للخلاطة.",
        variant: "important",
      },
      {
        type: "table",
        label_en: "Independently tested",
        label_ar: "اختبارات مستقلة",
        columns: testColumns,
        rows: [
          [
            { en: "Water penetration, DIN 1048-5", ar: "نفاذية الماء DIN 1048-5" },
            { en: "90% less: 3.7 mm vs 36.7 mm", ar: "أقل بنسبة 90%: 3.7 مم مقابل 36.7 مم" },
            { en: "Kuwait University", ar: "جامعة الكويت" },
          ],
          [
            { en: "Permeability, USACE CRD C48", ar: "النفاذية USACE CRD C48" },
            { en: "97% lower coefficient", ar: "انخفاض معامل النفاذية 97%" },
            { en: "Nelson Testing Labs, USA", ar: "Nelson Testing، أمريكا" },
          ],
          [
            { en: "Drying shrinkage, BS 1881-5", ar: "انكماش الجفاف BS 1881-5" },
            { en: "25% reduction", ar: "انخفاض بنسبة 25%" },
            { en: "BBA, United Kingdom", ar: "BBA، بريطانيا" },
          ],
          [
            { en: "Sulfate attack, 21 cycles", ar: "هجوم الكبريتات، 21 دورة" },
            {
              en: "No strength loss (control −14%)",
              ar: "لا فقد في المقاومة (العينة المرجعية −14%)",
            },
            { en: "R. M. Hardy & Assoc., USA", ar: "R. M. Hardy، أمريكا" },
          ],
          [
            { en: "Rebar corrosion, ASTM G109", ar: "تآكل حديد التسليح ASTM G109" },
            {
              en: "Corrosion inhibited ≥2× vs control",
              ar: "تثبيط التآكل بمقدار الضعف على الأقل",
            },
            { en: "University of Victoria", ar: "جامعة فيكتوريا" },
          ],
        ],
        note_en: "Source: Kryton Technical Data Sheet (KIM V2023-09).",
        note_ar: "المصدر: النشرة الفنية لكرايتون (KIM إصدار 2023).",
      },
    ],
    sort_order: 1,
    published: true,
  },
  {
    partner_slug: "kryton",
    slug: "kryton-krystol-t1",
    name_en: "Krystol T1® — surface-applied",
    name_ar: "Krystol T1® — طلاء بلوري سطحي",
    subtitle_en: "For existing concrete",
    subtitle_ar: "للخرسانات القائمة",
    ...category,
    image_file: "partners/kryton/krystol-t1.png",
    details: [
      {
        type: "text",
        label_en: "",
        label_ar: "",
        body_en:
          "A crystalline slurry brushed or sprayed onto new or old concrete. Applied on the positive (wet) or negative (dry) side, it stops water under hydrostatic pressure — ideal where the outside face can no longer be reached.",
        body_ar:
          "ملاط بلوري يُطبّق بالفرشاة أو الرش على الخرسانة الجديدة أو القديمة، من الجهة الموجبة (الرطبة) أو السالبة (الجافة)، ليوقف تسرب المياه تحت الضغط — مثالي عندما يتعذّر الوصول إلى الوجه الخارجي.",
        variant: "default",
      },
      {
        type: "table",
        label_en: "",
        label_ar: "",
        columns: [
          { en: "Mix ratio (by volume)", ar: "نسبة الخلط (حجماً)" },
          { en: "Coverage", ar: "معدل التغطية" },
          { en: "25 kg pail covers", ar: "عبوة 25 كغ تغطي" },
          { en: "Working time", ar: "زمن التشغيل" },
        ],
        rows: [
          [
            { en: "3.5 powder : 1 water", ar: "3.5 مسحوق : 1 ماء" },
            { en: "1.2 – 1.6 kg/m²", ar: "1.2 – 1.6 كغ/م²" },
            { en: "≈ 16 – 20 m²", ar: "16 – 20 م² تقريباً" },
            { en: "30 min @ 20 °C", ar: "30 دقيقة عند 20°م" },
          ],
        ],
        note_en:
          "1.2 kg/m² for basements and channels; 1.6 kg/m² for tanks, pools and manholes exposed to chemicals. Minimum air/surface temperature 4 °C.",
        note_ar:
          "1.2 كغ/م² للأقبية والقنوات، و1.6 كغ/م² للخزانات والمسابح والمناهيل المعرضة للمواد الكيميائية. أدنى درجة حرارة للهواء والسطح 4°م.",
      },
      {
        type: "steps",
        label_en: "Steps of use",
        label_ar: "خطوات الاستخدام",
        intro_en: "",
        intro_ar: "",
        steps_label_en: "",
        steps_label_ar: "",
        steps: [
          {
            en: "Prepare: clean the surface, remove laitance, coatings and loose mortar so the pores are open.",
            ar: "التحضير: تنظيف السطح وإزالة الطبقات الضعيفة والدهانات والمونة المفككة لفتح المسام.",
          },
          {
            en: "Pre-wet to saturated-surface-dry (damp, no standing water).",
            ar: "الترطيب حتى حالة السطح المشبع الجاف (رطب دون مياه متجمعة).",
          },
          {
            en: "Mix to a thick, brushable slurry; add a little more water in hot weather.",
            ar: "الخلط لقوام سميك قابل للدهن، مع زيادة الماء قليلاً في الطقس الحار.",
          },
          {
            en: "Apply evenly by brush, broom or sprayer in 1 or 2 coats; 2nd coat once the 1st has set hard (6–24 h).",
            ar: "التطبيق بالتساوي بالفرشاة أو المكنسة أو الرش بطبقة أو طبقتين؛ الثانية بعد تماسك الأولى (6–24 ساعة).",
          },
          {
            en: "Cure: protect for 24 h; keep moist for 3 days (7 days for potable water tanks).",
            ar: "المعالجة: حماية لمدة 24 ساعة، وترطيب لمدة 3 أيام (7 أيام لخزانات مياه الشرب).",
          },
        ],
      },
      {
        type: "table",
        label_en: "Independently tested",
        label_ar: "اختبارات مستقلة",
        columns: testColumns,
        rows: [
          [
            { en: "Chloride, ASTM C1202", ar: "الكلوريدات ASTM C1202" },
            { en: "<100 C vs 2,564 C control", ar: "أقل من 100 كولوم مقابل 2,564" },
            { en: "NBTC Group, Kuwait", ar: "NBTC، الكويت" },
          ],
        ],
        note_en: "Source: Kryton Technical Data Sheet (Krystol T1 V2026-04).",
        note_ar: "المصدر: النشرة الفنية لكرايتون (Krystol T1 إصدار 2026).",
      },
    ],
    sort_order: 2,
    published: true,
  },
  {
    partner_slug: "kryton",
    slug: "kryton-krystol-repair-grout",
    name_en: "Krystol Repair Grout™",
    name_ar: "Krystol Repair Grout™",
    subtitle_en: "For repairs & details",
    subtitle_ar: "للإصلاحات والتفاصيل",
    ...category,
    image_file: "partners/kryton/krystol-repair-grout.png",
    details: [
      {
        type: "text",
        label_en: "",
        label_ar: "",
        body_en:
          "A fibre-reinforced, shrinkage-controlled crystalline grout that permanently repairs leaking cracks, construction joints, form-tie holes, honeycombing and spalled concrete. Certified NSF/ANSI 61 for potable water.",
        body_ar:
          "حشوة بلورية مدعّمة بالألياف ومضبوطة الانكماش، لإصلاح دائم للشقوق المسرّبة وفواصل الصب وفتحات الزراجين والتعشيش والخرسانة المتآكلة. معتمدة NSF/ANSI 61 لمياه الشرب.",
        variant: "default",
      },
      {
        type: "steps",
        label_en: "Steps of use",
        label_ar: "خطوات الاستخدام",
        intro_en: "",
        intro_ar: "",
        steps_label_en: "",
        steps_label_ar: "",
        steps: [
          {
            en: "Chase the crack, joint or tie hole into a V-groove; chip out honeycombing to sound concrete.",
            ar: "التفتيح على شكل حرف V للشق أو الفاصل أو الزرجين، وجرف التعشيش حتى الخرسانة السليمة.",
          },
          {
            en: "Clean & pre-wet the cavity to saturated-surface-dry.",
            ar: "التنظيف والترطيب حتى حالة السطح المشبع الجاف.",
          },
          {
            en: "Pack Repair Grout firmly into the groove and finish flush.",
            ar: "الحشو بمادة Repair Grout بإحكام وتسويتها مع السطح.",
          },
          {
            en: "Seal over the repair with Krystol T1 and moist-cure.",
            ar: "الطلاء فوق الإصلاح بمادة Krystol T1 مع الترطيب.",
          },
        ],
      },
    ],
    sort_order: 3,
    published: true,
  },
];
