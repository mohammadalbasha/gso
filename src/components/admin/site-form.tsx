import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveSiteContent } from "@/app/admin/(panel)/content-actions";
import { defaultSiteContent, siteFields } from "@/lib/content/defaults";
import type { SiteField, SiteRow } from "@/lib/content/types";

type Section = {
  id: string;
  title: string;
  description: string;
  page: string;
  // Field keys in this section, with the short label shown inside the section.
  fields: Record<string, string>;
  hint?: Record<string, string>;
};

const sections: Section[] = [
  {
    id: "home-hero",
    title: "Home page · Hero banner",
    description:
      "The two lines under the big “GSO” at the top of the home page.",
    page: "",
    fields: {
      "home.hero.titleLine1": "First line",
      "home.hero.titleLine2": "Second line",
    },
  },
  {
    id: "home-about",
    title: "Home page · About section",
    description:
      "The white section below the banner: the intro text on the left, mission and vision on the right.",
    page: "",
    fields: {
      "home.about.title": "Section title",
      "home.about.paragraph1": "Paragraph 1",
      "home.about.paragraph2": "Paragraph 2",
      "home.about.missionTitle": "Mission title",
      "home.about.missionText": "Mission text",
      "home.about.visionTitle": "Vision title",
      "home.about.visionText": "Vision text",
    },
  },
  {
    id: "home-services",
    title: "Home page · Services section",
    description:
      "The heading above the service cards. The cards themselves (name, image) are edited under Services.",
    page: "",
    fields: {
      "home.services.title": "Section title",
      "home.services.subtitle": "Small text under the title",
    },
  },
  {
    id: "home-partners",
    title: "Home page · Partners",
    description:
      "The heading above the partner company cards. The cards themselves are edited under Partners.",
    page: "",
    fields: {
      "home.partners.title": "Section title",
      "home.partners.subtitle": "Small text under the title",
    },
  },
  {
    id: "about-page",
    title: "About Us page",
    description:
      "Everything on the About Us page: the title, the three numbered cards and the vision box.",
    page: "/about",
    fields: {
      "about.title": "Page title",
      "about.firstParagraph": "Card 1",
      "about.secondParagraph": "Card 2",
      "about.thirdParagraph": "Card 3",
      "about.visionTitle": "Vision title",
      "about.visionDescription": "Vision text",
    },
  },
  {
    id: "contact",
    title: "Contact details",
    description:
      "Used in the header (Call / WhatsApp buttons), the footer and the Contact page. Branch addresses are edited under Branches.",
    page: "/contact",
    fields: {
      "contact.phones": "Phone numbers",
      "contact.email": "Email",
    },
    hint: {
      "contact.phones":
        "Separate numbers with commas, e.g. +96555007977, +96556646842. The first number is also used for WhatsApp.",
    },
  },
];

function groupFields() {
  const used = new Set<string>();
  const groups = sections.map((section) => {
    const fields = siteFields.filter((field) => field.key in section.fields);
    fields.forEach((field) => used.add(field.key));
    return { section, fields };
  });
  const rest = siteFields.filter((field) => !used.has(field.key));
  if (rest.length) {
    groups.push({
      section: {
        id: "other",
        title: "Other text",
        description: "",
        page: "",
        fields: {},
      },
      fields: rest,
    });
  }
  return groups.filter((group) => group.fields.length > 0);
}

function FieldRow({
  field,
  label,
  hint,
  row,
}: {
  field: SiteField;
  label: string;
  hint?: string;
  row?: { value_en: string | null; value_ar: string | null };
}) {
  // Contact fields are the same in both languages, so English is the one that is used.
  const singleValue = field.key.startsWith("contact.");
  const Control = field.multiline ? Textarea : Input;
  const extra = field.multiline ? { rows: 4 } : {};

  return (
    <div className="grid gap-2 py-4 first:pt-0 last:pb-0">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {hint ? <p className="text-xs text-gray-500">{hint}</p> : null}
      </div>
      {singleValue ? (
        <>
          <Control
            name={`${field.key}.en`}
            defaultValue={row?.value_en ?? ""}
            dir="ltr"
            {...extra}
          />
          <input
            type="hidden"
            name={`${field.key}.ar`}
            value={row?.value_ar ?? ""}
          />
        </>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
              English
            </span>
            <Control
              name={`${field.key}.en`}
              defaultValue={row?.value_en ?? ""}
              dir="ltr"
              {...extra}
            />
          </label>
          <label className="grid gap-1">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
              العربية
            </span>
            <Control
              name={`${field.key}.ar`}
              defaultValue={row?.value_ar ?? ""}
              dir="rtl"
              {...extra}
            />
          </label>
        </div>
      )}
    </div>
  );
}

export function SiteForm({ rows }: { rows: SiteRow[] }) {
  const map = new Map(rows.map((row) => [row.key, row]));
  const fallback = new Map(defaultSiteContent.map((row) => [row.key, row]));
  const groups = groupFields();

  return (
    <form
      action={saveSiteContent}
      className="mx-auto flex w-full max-w-5xl flex-col gap-8 pb-4"
    >
      <nav className="flex flex-wrap gap-2">
        {groups.map(({ section }) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 transition-colors hover:border-primary-500 hover:text-primary-500"
          >
            {section.title}
          </a>
        ))}
      </nav>

      {groups.map(({ section, fields }, index) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-6 overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm"
        >
          <header className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-200 bg-primary-50 px-5 py-4">
            <div className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-semibold text-white">
                {index + 1}
              </span>
              <div>
                <h2 className="text-lg font-semibold text-primary-700">
                  {section.title}
                </h2>
                {section.description ? (
                  <p className="text-sm text-gray-600">{section.description}</p>
                ) : null}
              </div>
            </div>
            {section.id !== "other" ? (
              <a
                href={`/en${section.page}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm font-medium text-primary-500 hover:underline"
              >
                View on site ↗
              </a>
            ) : null}
          </header>
          <div className="divide-y divide-gray-100 px-5 py-4">
            {fields.map((field) => (
              <FieldRow
                key={field.key}
                field={field}
                label={section.fields[field.key] ?? field.label}
                hint={section.hint?.[field.key]}
                row={map.get(field.key) ?? fallback.get(field.key)}
              />
            ))}
          </div>
        </section>
      ))}

      <div className="sticky bottom-0 -mx-2 flex items-center justify-between gap-4 rounded-t-xl border border-gray-300 bg-white/95 px-5 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] backdrop-blur">
        <p className="text-sm text-gray-600">
          All sections are saved together.
        </p>
        <Button type="submit">
          <Save />
          Save site text
        </Button>
      </div>
    </form>
  );
}
