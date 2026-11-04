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
      note_en?: string;
      note_ar?: string;
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
    }
  | {
      type: "image";
      label_en: string;
      label_ar: string;
      image_url: string;
      image_url_ar?: string;
      alt_en: string;
      alt_ar: string;
      caption_en: string;
      caption_ar: string;
    }
  | {
      type: "image_cards";
      label_en: string;
      label_ar: string;
      items: {
        image_url: string;
        label_en: string;
        label_ar: string;
        body_en: string;
        body_ar: string;
      }[];
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
  partner_id?: string | null;
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

export type PartnerRow = {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  title_en: string | null;
  title_ar: string | null;
  summary_en: string | null;
  summary_ar: string | null;
  description_en: string | null;
  description_ar: string | null;
  logo_url: string | null;
  image_url: string | null;
  website: string | null;
  phone: string | null;
  email: string | null;
  sort_order: number;
  published: boolean;
};

export type PartnerSectionRow = {
  id: string;
  partner_id: string;
  eyebrow_en: string | null;
  eyebrow_ar: string | null;
  title_en: string;
  title_ar: string;
  intro_en: string | null;
  intro_ar: string | null;
  blocks: ProductBlock[];
  sort_order: number;
  published: boolean;
};

export type DocumentRow = {
  id: string;
  section_id: string;
  title_en: string;
  title_ar: string;
  file_path: string;
  url: string;
  locale: "en" | "ar" | null;
  sort_order: number;
  published: boolean;
};

export type DocumentSectionRow = {
  id: string;
  partner_id: string | null;
  product_id: string | null;
  title_en: string;
  title_ar: string;
  sort_order: number;
  published: boolean;
  documents: DocumentRow[];
};

export type DocumentOwner = { partnerId?: string; productId?: string };
