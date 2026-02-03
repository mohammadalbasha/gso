import dayjs from "dayjs";
import "dayjs/locale/ar";

/**
 * Fixes Arabic relative time pluralization according to Arabic grammar rules:
 * - Numbers 1-2: singular
 * - Numbers 3-10: plural
 * - Numbers 11+: singular
 *
 * @param text - The relative time string from dayjs (e.g., "منذ 30 دقائق")
 * @returns Corrected string (e.g., "منذ 30 دقيقة")
 */
export function fixArabicRelativeTime(text: string): string {
  // Pattern to match: number + plural form
  // Match patterns like "30 دقائق", "15 ساعات", etc.
  const patterns = [
    { plural: "دقائق", singular: "دقيقة" },
    { plural: "ساعات", singular: "ساعة" },
    { plural: "أيام", singular: "يوم" },
    { plural: "أشهر", singular: "شهر" },
    { plural: "سنوات", singular: "سنة" },
    { plural: "أعوام", singular: "عام" },
  ];

  for (const { plural, singular } of patterns) {
    // Match pattern: number (with optional space) + plural form (e.g., "30 دقائق", "30دقائق")
    // The regex matches one or more digits followed by optional whitespace and the plural form
    const regex = new RegExp(`(\\d+)\\s*${plural}`, "g");
    text = text.replace(regex, (match, number) => {
      const num = parseInt(number, 10);
      // Arabic rule: 1-2 and 11+ use singular, 3-10 use plural
      if (num >= 11 || num === 1 || num === 2) {
        return `${number} ${singular}`;
      }
      // 3-10 keep plural
      return match;
    });
  }

  return text;
}
