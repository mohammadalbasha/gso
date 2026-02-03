import { LanguageCode } from "@/i18n/languages";

export const extractLocation = (segments: string[]) => {
  // Check if the last segment is a page number
  const lastSegment = segments[segments.length - 1] || "";
  const isPage = lastSegment.startsWith("page_");

  if (isPage) {
    segments.pop();
  }

  segments = segments.filter(
    (segment) => segment != "search" && segment != "listing",
  );

  // Extract parameters based on whether it's a page or listing ID
  const [, locale, type, category, city, district, listingUriOrPage] = segments;

  // If it's a page, listingId will be undefined
  const listingUri = isPage ? undefined : listingUriOrPage;
  const page = isPage ? lastSegment : undefined; // Check if the last segment is a page number

  return {
    locale: locale ? decodeURIComponent(locale) : undefined,
    type: type ? decodeURIComponent(type) : undefined,
    category: category ? decodeURIComponent(category) : undefined,
    city: city ? decodeURIComponent(city) : undefined,
    district: district ? decodeURIComponent(district) : undefined,
    listingUri: listingUri,
    page: page,
  };
};

export const buildLink = (data: {
  locale: LanguageCode;
  type?: string;
  category?: string;
  city?: string;
  district?: string;
  listingId?: string;
  page?: string;
}) => {
  const { locale, type, category, city, district, listingId, page } = data;
  let link = `/${locale}`;
  if (type) link += `/${type}`;
  if (category) link += `/${category}`;
  if (city) link += `/${city}`;
  if (district) link += `/${district}`;
  if (listingId) link += `/${listingId}`;
  if (page) link += `/page_${page}`;

  return link;
};

export const buildMapLink = (data: {
  locale: LanguageCode;
  type?: string;
  category?: string;
}) => {
  let link = `/${data.locale}/map`;
  const params = new URLSearchParams();

  if (data.type) params.append("type", data.type);
  if (data.category) params.append("category", data.category);

  if (params.toString()) {
    link += `?${params.toString()}`;
  }

  return link;
};
