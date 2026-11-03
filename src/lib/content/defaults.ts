import type {
  ServiceRow,
  BranchRow,
  ProductBlock,
  ProductRow,
  ProjectRow,
  SiteField,
} from "./types";

export const defaultProjects: ProjectRow[] = [
  {
    id: "local-1",
    title_en: "Roof Waterproofing",
    title_ar: "عزل أسطح",
    description_en:
      "Complete roof waterproofing using the latest techniques and high-quality materials to ensure permanent protection against water leakage",
    description_ar:
      "عزل مائي متكامل للأسطح باستخدام أحدث التقنيات والمواد عالية الجودة لضمان حماية دائمة ضد تسرب المياه",
    category_en: "Roof Waterproofing",
    category_ar: "عزل أسطح",
    location_en: "Kuwait",
    location_ar: "الكويت",
    year: "2024",
    image_url: "/projects/roof.jpeg",
    sort_order: 1,
    published: true,
  },
  {
    id: "local-2",
    title_en: "Building Waterproofing",
    title_ar: "عزل مباني",
    description_en:
      "Comprehensive waterproofing for residential and commercial buildings to protect them from moisture and weather conditions",
    description_ar:
      "عزل مائي شامل للمباني والمنشآت السكنية والتجارية لحمايتها من الرطوبة والعوامل الجوية",
    category_en: "Building Waterproofing",
    category_ar: "عزل مباني",
    location_en: "Kuwait",
    location_ar: "الكويت",
    year: "2024",
    image_url: "/projects/ground.jpeg",
    sort_order: 2,
    published: true,
  },
  {
    id: "local-3",
    title_en: "Large Water Basin Waterproofing",
    title_ar: "عزل حوض مائي ضخم",
    description_en:
      "Professional waterproofing of large water basin using specialized materials to ensure no water leakage",
    description_ar:
      "تنفيذ عزل مائي احترافي لحوض مائي ضخم باستخدام مواد متخصصة لضمان عدم تسرب المياه",
    category_en: "Water Basins",
    category_ar: "أحواض مائية",
    location_en: "Kuwait",
    location_ar: "الكويت",
    year: "2023",
    image_url: "/projects/pool.jpeg",
    sort_order: 3,
    published: true,
  },
  {
    id: "local-4",
    title_en: "Water Tanks",
    title_ar: "خزانات مياه",
    description_en:
      "Water tank waterproofing with safe and healthy materials ensuring water purity and protection from contamination and leakage",
    description_ar:
      "عزل خزانات المياه بمواد آمنة وصحية تضمن نقاء المياه وحمايتها من التلوث والتسرب",
    category_en: "Water Tanks",
    category_ar: "خزانات مياه",
    location_en: "Kuwait",
    location_ar: "الكويت",
    year: "2023",
    image_url: "/projects/tank.jpeg",
    sort_order: 4,
    published: true,
  },
];

const conshieldBlocks: ProductBlock[] = [
  {
    type: "text",
    variant: "default",
    label_en: "Description",
    label_ar: "الوصف",
    body_en:
      "GSO-CONSHIELD PU is a flexible, elastomeric waterproof coating based on acrylic co-polymers. Applied as a liquid, it cures to form a durable, protective, waterproof membrane. It is applied by brush or roller to a thick, highly durable coating. It can be applied on concrete, asbestos, wood, brick/stone, tiles and textiles. It is a single component emulsion containing inert pigments and has a brushable consistency.",
    body_ar:
      "CONSHIELD PU هو طلاء عزل مائي مرن مطاطي قائم على بوليمرات أكريليك. يُطبق كسائل ثم يتصلب ليكوّن غشاء عازل متين ومقاوم للماء. يُطبق بالفرشاة أو الرول ليعطي طبقة سميكة عالية المتانة. يمكن تطبيقه على الخرسانة، الأسبستوس، الخشب، الطوب/الحجر، البلاط والمنسوجات. وهو مستحلب أحادي المكون يحتوي على أصباغ خاملة وقوام مناسب للفرشاة.",
  },
  {
    type: "list",
    label_en: "Uses",
    label_ar: "الاستخدامات",
    items: [
      {
        en: "Primarily used for protection of roofs and designed for the protection of concrete structures against carbonation, water and chloride ingress.",
        ar: "يستخدم أساساً لحماية الأسطح، ومصمم لحماية المنشآت الخرسانية ضد الكربنة وتسرب الماء واختراق الكلوريد.",
      },
      {
        en: "Suitable as a seamless elastomeric waterproofing coating for timber, asbestos/fiber cement and zinc sheets, asphalt, built-up felt and tiles.",
        ar: "مناسب أيضاً كطلاء عزل مائي مطاطي بدون فواصل للأخشاب والأسبستوس/الأسمنت الليفي وصفائح الزنك والأسفلت واللباد المركب والبلاط.",
      },
      {
        en: "Can also be used under terrazzo or tile floors, shower pans, kitchen, laundry and bathroom floors.",
        ar: "يمكن استخدامه أيضاً تحت أرضيات التيرازو أو البلاط، وأحواض الاستحمام، وأرضيات المطابخ وغرف الغسيل والحمامات.",
      },
      {
        en: "Water tanks, swimming pools, and basement walls from the outside.",
        ar: "خزانات المياه والمسابح وجدران الأقبية من الخارج.",
      },
    ],
  },
  {
    type: "table",
    label_en: "Properties",
    label_ar: "الخصائص",
    columns: [
      { en: "Property", ar: "الخاصية" },
      { en: "Value", ar: "القيمة" },
    ],
    rows: [
      [
        { en: "Finish", ar: "الملمس" },
        { en: "Smooth. Water only", ar: "ناعم. يعتمد على الماء فقط" },
      ],
      [
        { en: "Color", ar: "اللون" },
        { en: "Dark Gray", ar: "رمادي غامق" },
      ],
      [
        { en: "Weight per Liter", ar: "الوزن لكل لتر" },
        { en: "1.38 kg", ar: "1.38 كجم" },
      ],
      [
        { en: "Elongation", ar: "الاستطالة" },
        { en: "400%", ar: "400%" },
      ],
      [
        { en: "Working Temperature", ar: "درجة حرارة التشغيل" },
        { en: "5-50°C", ar: "5-50°C" },
      ],
      [
        { en: "Chloride Ion Diffusivity", ar: "نفاذية أيون الكلوريد" },
        { en: "43 g/m²/24 h", ar: "43 جم/م² /24 ساعة" },
      ],
      [
        { en: "Flash Point", ar: "نقطة الوميض" },
        { en: "Non-Flammable", ar: "غير قابل للاشتعال" },
      ],
      [
        { en: "Chemical resistance", ar: "المقاومة الكيميائية" },
        {
          en: "Resistance to spillage of grease, fatty acids and diluted acids (chlorine and alkalis).",
          ar: "مقاومة لانسكاب الشحوم والأحماض الدهنية والأحماض المخففة (الكلور والقلويات).",
        },
      ],
      [
        { en: "Packaging", ar: "التعبئة" },
        { en: "17 kg drums", ar: "العبوة 17 كجم" },
      ],
      [
        { en: "Coverage", ar: "التغطية" },
        { en: "0.6 to 0.9 kg per m² per coat", ar: "0.6 إلى 0.9 كجم لكل م²" },
      ],
    ],
  },
  {
    type: "table",
    label_en: "Drying Time",
    label_ar: "زمن الجفاف",
    columns: [
      { en: "Temperature", ar: "درجة الحرارة" },
      { en: "Dry to touch", ar: "جاف عند اللمس" },
      { en: "Hard dry", ar: "جاف تماماً" },
    ],
    rows: [
      [
        { en: "25°C", ar: "25°C" },
        { en: "8 hrs", ar: "8 ساعات" },
        { en: "24 hrs", ar: "24 ساعة" },
      ],
      [
        { en: "35°C", ar: "35°C" },
        { en: "7 hrs", ar: "7 ساعات" },
        { en: "20 hrs", ar: "20 ساعة" },
      ],
      [
        { en: "45°C", ar: "45°C" },
        { en: "6 hrs", ar: "6 ساعات" },
        { en: "18 hrs", ar: "18 ساعة" },
      ],
    ],
  },
  {
    type: "advantages",
    label_en: "Advantages",
    label_ar: "المزايا",
    items: [
      {
        label_en: "Durability",
        label_ar: "المتانة",
        body_en: "High acrylic polymer content ensures excellent durability.",
        body_ar: "يضمن المحتوى العالي من بوليمر الأكريليك متانة ممتازة.",
      },
      {
        label_en: "Elastomeric",
        label_ar: "المرونة",
        body_en: "Optimum tensile strength and elongation ensures an elastomeric nature.",
        body_ar: "يوفر قوة شد واستطالة مثالية تضمن الطبيعة المرنة للمادة.",
      },
      {
        label_en: "Waterproof",
        label_ar: "مقاومة الماء",
        body_en: "Protects concrete from waterborne salts because it is a very strong waterproof coating.",
        body_ar: "يحمي الخرسانة من الأملاح المحمولة بالماء لكونه عازلاً قوياً جداً.",
      },
      {
        label_en: "Ease of use",
        label_ar: "سهولة الاستخدام",
        body_en: "Very easy to apply by brush, roller or airless spray and is ready to use.",
        body_ar: "سهل جداً في التطبيق بالفرشاة أو الرول أو الرش بدون هواء وجاهز للاستخدام.",
      },
      {
        label_en: "Handling",
        label_ar: "التعامل الآمن",
        body_en: "Nonflammable and safe handling ensured by the water-based nature of the product.",
        body_ar: "غير قابل للاشتعال وآمن في الاستخدام بفضل طبيعته المائية.",
      },
      {
        label_en: "Protection",
        label_ar: "الحماية",
        body_en: "A barrier against salts, chemicals and fumes, with strong resistance to weather and sunlight.",
        body_ar: "يشكل حاجزاً ضد الأملاح والمواد الكيميائية والأبخرة ويقاوم عوامل الطقس وأشعة الشمس.",
      },
      {
        label_en: "High construction",
        label_ar: "بناء عالي الجودة",
        body_en: "Hides defects and does not need extra protection, including when walked on.",
        body_ar: "يخفي العيوب ويعد أساساً مهماً. لا يحتاج إلى حماية إضافية حتى عند المشي عليه.",
      },
    ],
  },
  {
    type: "text",
    variant: "safety",
    label_en: "Safety",
    label_ar: "السلامة",
    body_en:
      "Take precautions to prevent material entering the eyes. Wear goggles while applying. Provide adequate ventilation. Wear face masks during application. Allow 24 hours between coats. A final curing time of 48 hours is adequate at normal working temperatures. Low temperatures and high humidity slow the curing rate.",
    body_ar:
      "اتخذ الاحتياطات لمنع دخول المادة إلى العينين. ارتدِ نظارات واقية أثناء التطبيق، ووفّر تهوية كافية، واستخدم قناع الوجه أثناء العمل. اترك 24 ساعة بين الطبقات. زمن التصلب النهائي 48 ساعة كافٍ في درجات الحرارة العادية. درجات الحرارة المنخفضة والرطوبة العالية تُبطئ معدل التصلب.",
  },
  {
    type: "steps",
    label_en: "Application",
    label_ar: "التطبيق",
    intro_en:
      "GSO-CONSHIELD PU can be applied by brush, roller or airless spray. All surfaces must be clean, dry and free from dust, dirt, oil, grease and other contaminants. A typical four-coat application at 300–400 microns per coat yields about 1.5 mm total thickness. Coverage is about 0.6–0.9 kg per m² per coat and depends on the substrate. Brush application is preferred because it helps the material adhere.",
    intro_ar:
      "يمكن تطبيق CONSHIELD PU بالفرشاة أو الرول أو الرش بدون هواء. يجب أن تكون جميع الأسطح نظيفة وجافة وخالية من الغبار والأوساخ والزيوت والشحوم. يؤدي تطبيق أربع طبقات بمعدل 300–400 ميكرون لكل طبقة إلى سماكة كلية حوالي 1.5 مم. الكمية حوالي 0.6–0.9 كجم لكل م² لكل طبقة. يفضل استخدام الفرشاة لأنها تساعد على التصاق المادة.",
    steps_label_en: "Steps",
    steps_label_ar: "الخطوات",
    steps: [
      {
        en: "Clean the surface and remove stuck materials, dirt or dust.",
        ar: "يتم تنظيف السطح وإزالة أي مواد عالقة أو أوساخ أو غبار.",
      },
      {
        en: "Do not apply on a damp surface. Leave it to dry well.",
        ar: "لا يُسمح بوجود رطوبة على السطح، لذلك يُترك ليجف جيداً.",
      },
      {
        en: "Apply three or four layers, about 400 microns each, with a brush so no gaps remain. Quantity is 0.6–0.9 kg per m² and total thickness is about 1.5 mm. Rough surfaces use more material.",
        ar: "يُطبق بثلاث أو أربع طبقات، وسماكة كل طبقة تقريباً 400 ميكرون. الكمية لكل م² هي 0.6–0.9 كجم والسماكة الكلية 1.5 مم. السطح الخشن يستهلك مادة أكثر.",
      },
      {
        en: "Do not use below 5°C, because the material becomes too cohesive to apply properly.",
        ar: "لا تستخدم المادة عند درجة حرارة أقل من 5°C لأن المادة تكون شديدة اللزوجة.",
      },
      {
        en: "In extreme cold, do not heat the material with high heat or fire. Store it properly. It can be extended with warm water.",
        ar: "في البرودة الشديدة لا تُسخن المادة بحرارة عالية أو بالنار. خزّنها في المكان المناسب، ويمكن تمديدها بماء دافئ.",
      },
      {
        en: "Application is straightforward. The surface can be walked on after 8 hours if the temperature exceeds 20°C.",
        ar: "التطبيق سهل. يمكن المشي على السطح بعد 8 ساعات إذا كانت درجة الحرارة أعلى من 20°C.",
      },
    ],
  },
  {
    type: "text",
    variant: "important",
    label_en: "Important Note",
    label_ar: "ملاحظة مهمة",
    body_en:
      "When opening the package and taking a limited amount, close the lid immediately and repeat this until the package is consumed. The material begins to dry as soon as it is exposed to air. Do not store it in sunlight for a long time.",
    body_ar:
      "عند فتح غطاء العبوة وأخذ كمية محدودة، يجب إغلاق العبوة فوراً وتكرار ذلك حتى انتهاء المحتوى، لأن المادة تبدأ بالجفاف فور تعرضها للهواء. ويُمنع تخزين المادة تحت أشعة الشمس لفترة طويلة.",
  },
  {
    type: "text",
    variant: "compact",
    label_en: "Cleaning",
    label_ar: "التنظيف",
    body_en: "For cleaning tools and equipment, use fresh water only.",
    body_ar: "لتنظيف الأدوات والمعدات يُستخدم الماء العذب فقط.",
  },
  {
    type: "text",
    variant: "compact",
    label_en: "Mixing",
    label_ar: "الخلط",
    body_en:
      "Mix carefully and thin to application consistency with fresh water only. Avoid aeration during mixing.",
    body_ar:
      "يجب خلط المواد بعناية وتخفيفها للوصول لقوام التطبيق باستخدام ماء عذب فقط. يجب الحذر أثناء الخلط لتجنب إدخال الهواء.",
  },
  {
    type: "text",
    variant: "compact",
    label_en: "Note",
    label_ar: "ملاحظة",
    body_en:
      "Never apply in rain or on a substrate immersed in water. Do not clean the cured coat with brooms that have bristles.",
    body_ar:
      "لا تُطبق المادة أثناء المطر أو على سطح مغمور بالماء. لا تنظف الطبقة المتصلبة بمكانس ذات شعيرات.",
  },
  {
    type: "text",
    variant: "fire",
    label_en: "Fire",
    label_ar: "الحريق",
    body_en: "Water based material, therefore nonflammable.",
    body_ar: "مادة أساسها مائي، لذلك فهي غير قابلة للاشتعال.",
  },
];

const polyurethaneBlocks: ProductBlock[] = [
  {
    type: "text",
    variant: "default",
    label_en: "Description",
    label_ar: "الوصف",
    body_en:
      "POLYURETHANE M300 is a one component, acrylic modified polyurethane membrane. The product can be applied with a brush, roller or airless spray.",
    body_ar:
      "POLYURETHANE M300 غشاء بولي يوريثان معدل بالأكريليك أحادي المكون. يمكن تطبيق المنتج بالفرشاة أو الرول أو الرش بدون هواء.",
  },
  {
    type: "list",
    label_en: "Uses",
    label_ar: "الاستخدامات",
    items: [
      {
        en: "Waterproofing coating for concrete slabs, roofs, balconies, kitchens and bathrooms under tiling floors.",
        ar: "طلاء عزل مائي للبلاطات الخرسانية والأسطح والشرفات والمطابخ والحمامات تحت البلاط.",
      },
      { en: "Waterproofing for planter boxes.", ar: "عزل مائي لأحواض الزراعة." },
      {
        en: "Waterproofing new and existing structures.",
        ar: "عزل مائي للمنشآت الجديدة والقائمة.",
      },
      {
        en: "Coating for internal as well as external surfaces.",
        ar: "طلاء للأسطح الداخلية والخارجية.",
      },
      {
        en: "Waterproof lining for potable water containers, tanks, reservoirs and swimming pools.",
        ar: "بطانة عزل مائي لخزانات المياه الصالحة للشرب والخزانات والمستودعات والمسابح.",
      },
    ],
  },
  {
    type: "advantages",
    label_en: "Advantages",
    label_ar: "المزايا",
    items: [
      {
        label_en: "Easy to use",
        label_ar: "سهولة الاستخدام",
        body_en: "Easily brushable or spray applied product.",
        body_ar: "منتج سهل التطبيق بالفرشاة أو بالرش.",
      },
      {
        label_en: "Durability",
        label_ar: "المتانة",
        body_en: "Delivers superior durability under local climatic conditions.",
        body_ar: "يوفر متانة فائقة في الظروف المناخية المحلية.",
      },
      {
        label_en: "Adhesion",
        label_ar: "الالتصاق",
        body_en: "Excellent adhesion. Bonds to porous and non-porous surfaces.",
        body_ar: "التصاق ممتاز. يلتصق بالأسطح المسامية وغير المسامية.",
      },
      {
        label_en: "Flexibility",
        label_ar: "المرونة",
        body_en: "Specially blended acrylic and PU improve flexibility.",
        body_ar: "مزيج الأكريليك والبولي يوريثان يحسن المرونة.",
      },
      {
        label_en: "Non-staining",
        label_ar: "غير مُلطخ",
        body_en: "Does not stain tiles or marble.",
        body_ar: "لا يلطخ البلاط أو الرخام.",
      },
      {
        label_en: "Vapor permeability",
        label_ar: "نفاذية البخار",
        body_en: "Fully cured membrane allows the substrate to breathe.",
        body_ar: "الغشاء بعد التصلب الكامل يسمح للسطح بالتنفس.",
      },
      {
        label_en: "Special features",
        label_ar: "ميزات خاصة",
        body_en: "Non-toxic, eco-friendly, durable, and self-leveling.",
        body_ar: "غير سام، صديق للبيئة، متين، وذاتي التسوية.",
      },
    ],
  },
  {
    type: "text",
    variant: "default",
    label_en: "Surface preparation",
    label_ar: "تحضير السطح",
    body_en:
      "All substrates must be structurally sound and clean from grease, oil, or contaminants. Use POLYURETHANE M300 primer if required.",
    body_ar:
      "يجب أن تكون جميع الأسطح سليمة إنشائياً ونظيفة من الشحوم والزيوت أو الملوثات. استخدم برايمر POLYURETHANE M300 إذا لزم الأمر.",
  },
  {
    type: "text",
    variant: "default",
    label_en: "Application",
    label_ar: "التطبيق",
    body_en:
      "Apply 250-350 microns using brush, roller or spray. Allow to harden before applying the second coat.",
    body_ar:
      "يُطبق بسماكة 250-350 ميكرون باستخدام الفرشاة أو الرول أو الرش. اتركه ليتصلب قبل تطبيق الطبقة الثانية.",
  },
  {
    type: "text",
    variant: "safety",
    label_en: "Health and safety",
    label_ar: "الصحة والسلامة",
    body_en:
      "Non-toxic but mildly alkaline. Wear gloves during use. Rinse with clean water if in contact with skin or eyes. Seek medical advice if necessary.",
    body_ar:
      "غير سام لكنه قلوي بشكل خفيف. ارتدِ القفازات أثناء الاستخدام. اغسل بالماء النظيف عند ملامسة الجلد أو العينين. اطلب المشورة الطبية عند الحاجة.",
  },
  {
    type: "table",
    label_en: "Standards and properties",
    label_ar: "المعايير والخواص",
    columns: [
      { en: "Property", ar: "الخاصية" },
      { en: "Value", ar: "القيمة" },
    ],
    rows: [
      [
        { en: "Hardness (Shore A)", ar: "الصلادة (شور A)" },
        { en: "60", ar: "60" },
      ],
      [
        { en: "Permeability", ar: "النفاذية" },
        { en: "1.02 perms", ar: "1.02 برمز" },
      ],
      [
        { en: "Thickness", ar: "السماكة" },
        { en: "1.00 mm", ar: "1.00 مم" },
      ],
      [
        { en: "Bond strength", ar: "قوة الالتصاق" },
        { en: "2.0 N/mm²", ar: "2.0 نيوتن/مم²" },
      ],
      [
        { en: "Tensile strength", ar: "قوة الشد" },
        { en: "1.6 N/mm²", ar: "1.6 نيوتن/مم²" },
      ],
      [
        { en: "Tear strength", ar: "قوة التمزق" },
        { en: "14.0 N/mm²", ar: "14.0 نيوتن/مم²" },
      ],
      [
        { en: "Elongation", ar: "الاستطالة" },
        { en: "650%", ar: "650%" },
      ],
      [
        { en: "Drying time", ar: "زمن الجفاف" },
        { en: "2 hrs (25°C)", ar: "ساعتان (25°C)" },
      ],
      [
        { en: "Full cure", ar: "التصلب الكامل" },
        { en: "7 days", ar: "7 أيام" },
      ],
    ],
  },
];

export const defaultProducts: ProductRow[] = [
  {
    id: "local-conshield",
    slug: "conshield-pu",
    name_en: "CONSHIELD PU",
    name_ar: "CONSHIELD PU",
    subtitle_en: "Flexible Elastomeric Waterproof Coating",
    subtitle_ar: "طلاء عزل مائي مرن مطاطي",
    category_en: "Insulating Materials",
    category_ar: "مواد عازلة",
    image_url: "/conshield-pu.png",
    details: conshieldBlocks,
    sort_order: 1,
    published: true,
  },
  {
    id: "local-polyurethane",
    slug: "polyurethane-300",
    name_en: "POLYURETHANE M300",
    name_ar: "POLYURETHANE M300",
    subtitle_en: "Acrylic Modified Polyurethane Membrane",
    subtitle_ar: "غشاء بولي يوريثان معدل بالأكريليك",
    category_en: "Insulating Materials",
    category_ar: "مواد عازلة",
    image_url: "/polyurethane-300.png",
    details: polyurethaneBlocks,
    sort_order: 2,
    published: true,
  },
];

export const defaultBranches: BranchRow[] = [
  {
    id: "local-kuwait",
    name_en: "Kuwait",
    name_ar: "الكويت",
    address_en: "Shuwaikh, Al Zena St, Al Hayat Commercial Complex, Shop No. 28",
    address_ar: "الشويخ، شارع الزينة، مجمع حياة التجاري، محل رقم 28",
    phone: "+96555007977",
    email: "info@gso.homes",
    coming_soon: false,
    sort_order: 1,
    published: true,
  },
  {
    id: "local-syria",
    name_en: "Syria",
    name_ar: "سوريا",
    address_en: "",
    address_ar: "",
    phone: "",
    email: "",
    coming_soon: true,
    sort_order: 2,
    published: true,
  },
];

const service = (
  id: string,
  title_en: string,
  title_ar: string,
  image_url: string,
  sort_order: number,
): ServiceRow => ({
  id,
  title_en,
  title_ar,
  subtitle_en: "",
  subtitle_ar: "",
  image_url,
  sort_order,
  published: true,
});

export const defaultServices: ServiceRow[] = [
  service("local-building", "Building Construction", "تشييد المباني", "/building-construction.png", 1),
  service("local-concrete", "Concrete Repair", "اصلاح الخرسانة", "/concrete-repair.jpg", 2),
  service("local-waterproofing", "Waterproofing", "عزل مائي", "/waterproofing.png", 3),
];

export const defaultSiteContent: { key: string; value_en: string; value_ar: string }[] = [
  {
    key: "home.hero.titleLine1",
    value_en: "Global Observatory Company",
    value_ar: "شركة المرصد العالمي",
  },
  {
    key: "home.hero.titleLine2",
    value_en: "Specialized in Building Construction",
    value_ar: "المتخصص لتشييد المباني",
  },
  {
    key: "home.about.title",
    value_en: "About Our Company",
    value_ar: "لمحة عن الشركة",
  },
  {
    key: "home.about.paragraph1",
    value_en:
      "Global Observatory Company for Building Construction is a leading company in waterproofing, concrete repair, and specialty materials. We have exclusive agencies and our own specialized products that ensure the highest standards of quality and performance.",
    value_ar:
      "شركة المرصد العالمي المتخصص لتشييد المباني هي شركة رائدة في مجال العزل المائي وإصلاح الخرسانة والمواد الخصوصية. نمتلك وكالات حصرية ومواد خاصة بنا تضمن أعلى معايير الجودة والأداء.",
  },
  {
    key: "home.about.paragraph2",
    value_en:
      "We are proud to have completed many distinguished projects in the State of Kuwait, including waterproofing basements, tanks, swimming pools, water basins, and complete buildings with roofs and basements. Our extensive experience and quality materials have made us the first choice for contractors and real estate developers.",
    value_ar:
      "نفخر بتنفيذ العديد من المشاريع المتميزة في دولة الكويت، بما في ذلك عزل الأقبية والخزانات والمسابح وأحواض المياه والمباني الكاملة مع الأسطح والأقبية. خبرتنا الواسعة وجودة موادنا جعلتنا الخيار الأول للمقاولين والمطورين العقاريين.",
  },
  {
    key: "home.about.missionTitle",
    value_en: "Our Mission",
    value_ar: "مهمتنا",
  },
  {
    key: "home.about.missionText",
    value_en:
      "To provide advanced waterproofing solutions and concrete repair services with the highest quality standards, commitment to deadlines, and customer satisfaction.",
    value_ar:
      "تقديم حلول عزل مائي متطورة وخدمات إصلاح الخرسانة بأعلى معايير الجودة، مع الالتزام بالمواعيد ورضا العملاء.",
  },
  {
    key: "home.about.visionTitle",
    value_en: "Our Vision",
    value_ar: "رؤيتنا",
  },
  {
    key: "home.about.visionText",
    value_en:
      "To be the leading company in waterproofing and specialized building materials in the region.",
    value_ar: "أن نكون الشركة الرائدة في مجال العزل المائي ومواد البناء المتخصصة في المنطقة.",
  },
  { key: "home.services.title", value_en: "Our Services", value_ar: "خدماتنا" },
  { key: "home.services.subtitle", value_en: "Services", value_ar: "الخدمات" },
  { key: "about.title", value_en: "About Us", value_ar: "من نحن" },
  {
    key: "about.firstParagraph",
    value_en:
      "Global Observatory Company for Building Construction is a leading company in waterproofing, concrete repair, and specialty materials. The company was founded with a clear vision to provide advanced solutions and high-quality materials for construction projects in Kuwait and the region.",
    value_ar:
      "شركة المرصد العالمي المتخصص لتشييد المباني هي شركة رائدة في مجال العزل المائي وإصلاح الخرسانة والمواد الخصوصية. تأسست الشركة برؤية واضحة لتقديم حلول متطورة ومواد عالية الجودة لمشاريع البناء في الكويت والمنطقة.",
  },
  {
    key: "about.secondParagraph",
    value_en:
      "We have exclusive agencies and our own specialized products that ensure the highest standards of quality and performance. Our extensive experience in the field has made us a trusted partner for contractors and real estate developers.",
    value_ar:
      "نمتلك وكالات حصرية ومواد خاصة بنا تضمن أعلى معايير الجودة والأداء. خبرتنا الواسعة في المجال جعلتنا الشريك الموثوق للمقاولين والمطورين العقاريين.",
  },
  {
    key: "about.thirdParagraph",
    value_en:
      "We are proud to have completed many distinguished projects in the State of Kuwait, including waterproofing basements, tanks, swimming pools, water basins, and complete buildings with roofs and basements. Our commitment to quality, deadlines, and customer satisfaction has made us the first choice in the market.",
    value_ar:
      "نفخر بتنفيذ العديد من المشاريع المتميزة في دولة الكويت، بما في ذلك عزل الأقبية والخزانات والمسابح وأحواض المياه والمباني الكاملة مع الأسطح والأقبية. التزامنا بالجودة والمواعيد ورضا العملاء جعلنا الخيار الأول في السوق.",
  },
  { key: "about.visionTitle", value_en: "Our Vision", value_ar: "رؤيتنا" },
  {
    key: "about.visionDescription",
    value_en:
      "To be the leading company in waterproofing and specialized building materials in the region, and to contribute to building a better future by providing innovative and sustainable solutions.",
    value_ar:
      "أن نكون الشركة الرائدة في مجال العزل المائي ومواد البناء المتخصصة في المنطقة، ونساهم في بناء مستقبل أفضل من خلال توفير حلول مبتكرة ومستدامة.",
  },
  {
    key: "contact.phones",
    value_en: "+96555007977, +96556646842",
    value_ar: "+96555007977, +96556646842",
  },
  {
    key: "contact.email",
    value_en: "info@gso.homes",
    value_ar: "info@gso.homes",
  },
];

export const siteFields: SiteField[] = [
  { key: "home.hero.titleLine1", label: "Hero line 1" },
  { key: "home.hero.titleLine2", label: "Hero line 2" },
  { key: "home.about.title", label: "Home about title" },
  { key: "home.about.paragraph1", label: "Home about paragraph 1", multiline: true },
  { key: "home.about.paragraph2", label: "Home about paragraph 2", multiline: true },
  { key: "home.about.missionTitle", label: "Mission title" },
  { key: "home.about.missionText", label: "Mission text", multiline: true },
  { key: "home.about.visionTitle", label: "Home vision title" },
  { key: "home.about.visionText", label: "Home vision text", multiline: true },
  { key: "home.services.title", label: "Services section title" },
  { key: "home.services.subtitle", label: "Services section subtitle" },
  { key: "about.title", label: "About page title" },
  { key: "about.firstParagraph", label: "About paragraph 1", multiline: true },
  { key: "about.secondParagraph", label: "About paragraph 2", multiline: true },
  { key: "about.thirdParagraph", label: "About paragraph 3", multiline: true },
  { key: "about.visionTitle", label: "About vision title" },
  { key: "about.visionDescription", label: "About vision text", multiline: true },
  { key: "contact.phones", label: "Phones (comma separated)" },
  { key: "contact.email", label: "Email" },
];

export const projectImageFiles: { file: string; path: string }[] = [
  { file: "public/projects/roof.jpeg", path: "projects/roof.jpeg" },
  { file: "public/projects/ground.jpeg", path: "projects/ground.jpeg" },
  { file: "public/projects/pool.jpeg", path: "projects/pool.jpeg" },
  { file: "public/projects/tank.jpeg", path: "projects/tank.jpeg" },
  { file: "public/conshield-pu.png", path: "products/conshield-pu.png" },
  { file: "public/polyurethane-300.png", path: "products/polyurethane-300.png" },
];
