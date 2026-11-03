export type ProductBlock =
  | {
      type: "text";
      label_en: string;
      label_ar: string;
      body_en: string;
      body_ar: string;
      variant: "default" | "safety" | "important" | "compact" | "fire";
    }
  | {
      type: "list";
      label_en: string;
      label_ar: string;
      items: { en: string; ar: string }[];
    }
  | {
      type: "table";
      label_en: string;
      label_ar: string;
      columns: { en: string; ar: string }[];
      rows: { en: string; ar: string }[][];
    }
  | {
      type: "advantages";
      label_en: string;
      label_ar: string;
      items: {
        label_en: string;
        label_ar: string;
        body_en: string;
        body_ar: string;
      }[];
    }
  | {
      type: "steps";
      label_en: string;
      label_ar: string;
      intro_en: string;
      intro_ar: string;
      steps_label_en: string;
      steps_label_ar: string;
      steps: { en: string; ar: string }[];
    };

export type ProjectRow = {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string | null;
  description_ar: string | null;
  category_en: string | null;
  category_ar: string | null;
  location_en: string | null;
  location_ar: string | null;
  year: string | null;
  image_url: string | null;
  sort_order: number;
  published: boolean;
};

export type ProductRow = {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  subtitle_en: string | null;
  subtitle_ar: string | null;
  category_en: string | null;
  category_ar: string | null;
  image_url: string | null;
  details: ProductBlock[];
  sort_order: number;
  published: boolean;
};

export type BranchRow = {
  id: string;
  name_en: string;
  name_ar: string;
  address_en: string | null;
  address_ar: string | null;
  phone: string | null;
  email: string | null;
  coming_soon: boolean;
  sort_order: number;
  published: boolean;
};

export type SiteRow = {
  key: string;
  value_en: string | null;
  value_ar: string | null;
};

export type SiteField = {
  key: string;
  label: string;
  multiline?: boolean;
};

export type ServiceRow = {
  id: string;
  title_en: string;
  title_ar: string;
  subtitle_en: string | null;
  subtitle_ar: string | null;
  image_url: string | null;
  sort_order: number;
  published: boolean;
};
