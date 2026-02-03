const data = {
  image: "/polyurethane-300.png",
  productName: { en: "POLYURETHANE M300" },
  productSubtitle: { en: "Acrylic Modified Polyurethane Membrane" },
  description: {
    label: {
      en: "Description",
    },
    data: {
      en: `POLYURETHANE M300 is a one component, acrylic modified polyurethane membrane. Product can be applied with a brush, roller or airless spray`,
    },
  },
  uses: {
    label: { en: "Uses" },
    data: [
      {
        en: `Waterproofing coating for concrete slabs, roofs, balconies, kitchens and bathrooms under tiling floors`,
      },
      {
        en: `Waterproofing for planter boxes`,
      },
      {
        en: `Waterproofing new and existing structures`,
      },
      {
        en: `Coating for internal as well as external surfaces`,
      },
      {
        en: `Waterproof lining for potable water containers, tanks, reservoirs, swimming pool`,
      },
    ],
  },
  advantages: {
    label: { en: "Advantages" },
    data: [
      {
        label: { en: "Easy to use" },
        description: {
          en: `Easily brushable or spray applied product.`,
        },
      },
      {
        label: { en: "Durability" },
        description: {
          en: `Delivers superior durability under local climatic conditions.`,
        },
      },
      {
        label: { en: "Adhesion" },
        description: {
          en: `Excellent adhesion. Bonds to porous and non-porous surfaces.`,
        },
      },
      {
        label: { en: "Flexibility" },
        description: {
          en: `Specially blended acrylic and PU improve flexibility.`,
        },
      },
      {
        label: { en: "Non-staining" },
        description: {
          en: `Does not stain tiles or marble.`,
        },
      },
      {
        label: { en: "Vapor permeability" },
        description: {
          en: `Fully cured membrane allows substrate to breathe.`,
        },
      },
      {
        label: { en: "Special Features" },
        description: {
          en: `Non-toxic, eco-friendly, durable, and self-leveling.`,
        },
      },
    ],
  },
  surfacePreparation: {
    label: { en: "Surface preparation" },
    data: {
      en: `All substrates must be structurally sound and clean from grease, oil, or contaminants. Use POLYURETHANE M300 primer if required.`,
    },
  },
  application: {
    label: { en: "Application" },
    data: {
      en: `Apply 250-350 microns using brush, roller or spray. Allow to harden before applying second coat.`,
    },
  },
  healthAndSafety: {
    label: { en: "Health and safety" },
    data: {
      en: `Non-toxic but mildly alkaline. Do wear gloves during use. Rinse with clean water if in contact with skin or eyes. Seek medical advice if necessary.`,
    },
  },
  standardsAndProperties: {
    label: { en: "Standards and properties" },
    data: [
      { label: { en: "Hardness (Shore A)" }, value: { en: "60" } },
      { label: { en: "Permeability" }, value: { en: "1.02 perms" } },
      { label: { en: "Thickness" }, value: { en: "1.00 mm" } },
      { label: { en: "Bond strength" }, value: { en: "2.0 N/mm²" } },
      { label: { en: "Tensile strength" }, value: { en: "1.6 N/mm²" } },
      { label: { en: "Tear strength" }, value: { en: "14.0 N/mm²" } },
      { label: { en: "Elongation" }, value: { en: "650%" } },
      { label: { en: "Drying time" }, value: { en: "2 hrs (25°C)" } },
      { label: { en: "Full cure" }, value: { en: "7 days" } },
    ],
  },
};

type Locale = "en" | "ar";
function text(obj: { en: string }, locale: Locale) {
  return (
    (locale === "ar" && "ar" in obj ? (obj as { ar?: string }).ar : null) ??
    obj.en
  );
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function Polyurethane300Page({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="min-h-full bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        <div>
          {/* Product name banner */}
          <section
            className="rounded-t-xl overflow-hidden text-center py-8 px-4 border-b border-black/20 shadow-sm"
            style={{ backgroundColor: "#1a2a47" }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-wide">
              {text(data.productName, locale)}
            </h1>
            <p className="mt-2 text-white/95 text-sm sm:text-base font-normal max-w-2xl mx-auto">
              {text(data.productSubtitle, locale)}
            </p>
          </section>

          {/* Hero / Image */}
          <section className="relative rounded-b-xl overflow-hidden border border-t-0 border-primary-500/20 shadow-lg -mt-px">
            <div className="aspect-[2/1] relative bg-secondary-500/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.image}
                alt="Polyurethane M300"
                className="object-contain w-full h-full p-4"
              />
            </div>
          </section>
        </div>

        {/* Description */}
        <section>
          <h2 className="text-xl font-semibold text-primary-500 border-b-2 border-primary-500 pb-2 mb-4">
            {text(data.description.label, locale)}
          </h2>
          <p className="text-foreground whitespace-pre-line leading-relaxed">
            {text(data.description.data, locale)}
          </p>
        </section>

        {/* Uses */}
        <section>
          <h2 className="text-xl font-semibold text-primary-500 border-b-2 border-primary-500 pb-2 mb-4">
            {text(data.uses.label, locale)}
          </h2>
          <ul className="space-y-4 list-disc list-inside text-foreground">
            {data.uses.data.map((item, i) => (
              <li key={i} className="whitespace-pre-line">
                {text(item, locale)}
              </li>
            ))}
          </ul>
        </section>

        {/* Advantages */}
        <section>
          <h2 className="text-xl font-semibold text-primary-500 border-b-2 border-primary-500 pb-2 mb-4">
            {text(data.advantages.label, locale)}
          </h2>
          <ul className="space-y-6">
            {data.advantages.data.map((item, i) => (
              <li key={i} className="border-l-4 border-secondary-500 pl-4 py-1">
                <span className="font-semibold text-primary-500 block mb-1">
                  {text(item.label, locale)}
                </span>
                <p className="text-foreground whitespace-pre-line text-sm">
                  {text(item.description, locale)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Standards and Properties - Table */}
        <section>
          <h2 className="text-xl font-semibold text-primary-500 border-b-2 border-primary-500 pb-2 mb-4">
            {text(data.standardsAndProperties.label, locale)}
          </h2>
          <div className="rounded-lg border-2 border-primary-500 overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary-500 text-primary-foreground">
                  <th className="text-left py-3 px-4 font-semibold">
                    Property
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">Value</th>
                </tr>
              </thead>
              <tbody>
                {data.standardsAndProperties.data.map((row, i) => (
                  <tr
                    key={i}
                    className={
                      i % 2 === 0
                        ? "bg-secondary-500/10 border-b border-primary-500/30"
                        : "bg-background border-b border-primary-500/30"
                    }
                  >
                    <td className="py-3 px-4 font-medium text-primary-500">
                      {text(row.label, locale)}
                    </td>
                    <td className="py-3 px-4 text-secondary-500">
                      {text(row.value, locale)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Surface Preparation */}
        <section className="rounded-lg bg-primary-500/5 border border-primary-500/20 p-4">
          <h2 className="text-lg font-semibold text-primary-500 mb-2">
            {text(data.surfacePreparation.label, locale)}
          </h2>
          <p className="text-foreground whitespace-pre-line">
            {text(data.surfacePreparation.data, locale)}
          </p>
        </section>

        {/* Application */}
        <section className="rounded-lg bg-secondary-500/10 border border-secondary-500/30 p-4">
          <h2 className="text-lg font-semibold text-primary-500 mb-2">
            {text(data.application.label, locale)}
          </h2>
          <p className="text-foreground whitespace-pre-line">
            {text(data.application.data, locale)}
          </p>
        </section>

        {/* Health and Safety */}
        <section className="rounded-lg border border-primary-500/20 p-4">
          <h2 className="text-lg font-semibold text-primary-500 mb-2">
            {text(data.healthAndSafety.label, locale)}
          </h2>
          <p className="text-foreground whitespace-pre-line">
            {text(data.healthAndSafety.data, locale)}
          </p>
        </section>
      </div>
    </div>
  );
}
