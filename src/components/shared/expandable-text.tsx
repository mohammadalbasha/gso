"use client";
import { useState } from "react";
import { cn } from "@/lib/utils/utils";
import { useTranslations } from "next-intl";
interface ExpandableTextProps {
  text: string;
  maxHeight?: string;
  className?: string;
}

export function ExpandableText({
  text,
  maxHeight,
  className,
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations("expandableText");

  // Only show expandable functionality if text is longer than 200 characters
  const shouldShowExpandable = text.length > 200;

  return (
    <div className="relative">
      <div
        className={cn(
          "whitespace-pre-wrap leading-relaxed transition-all duration-300 overflow-hidden",
          shouldShowExpandable && !isExpanded && `max-h-[5rem]`,
          className,
        )}
      >
        {text}
      </div>

      {/* Gradient overlay when collapsed - only show if expandable */}
      {shouldShowExpandable && !isExpanded && (
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      )}

      {/* Show more/less button - only show if expandable */}
      {shouldShowExpandable && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-2 z-[100] relative text-primary-500 hover:text-primary-600 text-sm font-medium underline  hover:cursor-pointer"
        >
          {isExpanded ? t("showLess") : t("showMore")}
        </button>
      )}
    </div>
  );
}
