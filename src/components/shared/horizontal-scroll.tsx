"use client";

import React, { useRef, useEffect } from "react";

interface HorizontalScrollProps {
  children: React.ReactNode;
  selectedId?: string;
  isRTL?: boolean;
}

const HorizontalScroll = ({
  children,
  selectedId,
  isRTL = false,
}: HorizontalScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleWheel: any = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  // Auto-scroll to selected item on mount
  // useEffect(() => {
  //   if (selectedId && scrollRef.current) {
  //     // Add a small delay to ensure DOM is ready
  //     const timer = setTimeout(() => {
  //       const selectedElement = scrollRef.current?.querySelector(
  //         `[data-selected-id="${selectedId}"]`,
  //       ) as HTMLElement;

  //       if (selectedElement && scrollRef.current) {
  //         const container = scrollRef.current;

  //         // Calculate scroll position to center the selected element
  //         const scrollLeft =
  //           selectedElement.offsetLeft -
  //           container.offsetWidth / 2 +
  //           selectedElement.offsetWidth / 2;

  //         // For RTL, we need to adjust the scroll direction
  //         // const finalScrollLeft = isRTL ? -scrollLeft : scrollLeft;

  //         container.scrollTo({
  //           left: scrollLeft,
  //           //  behavior: "smooth",
  //         });
  //       }
  //     }, 0); //100

  //     return () => clearTimeout(timer);
  //   }
  // }, [selectedId, isRTL]);

  // TODO: Review
  useEffect(() => {
    if (selectedId && scrollRef.current) {
      // Add a small delay to ensure DOM is ready
      const selectedElement = scrollRef.current?.querySelector(
        `[data-selected-id="${selectedId}"]`,
      ) as HTMLElement;

      if (selectedElement && scrollRef.current) {
        const container = scrollRef.current;

        // Calculate scroll position to center the selected element
        const scrollLeft =
          selectedElement.offsetLeft -
          container.offsetWidth / 2 +
          selectedElement.offsetWidth / 2;

        // For RTL, we need to adjust the scroll direction
        // const finalScrollLeft = isRTL ? -scrollLeft : scrollLeft;

        container.scrollTo({
          left: scrollLeft,
          behavior: "instant",
          //  behavior: "smooth",
        });
      }
    }
  }, [selectedId, isRTL]);

  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto whitespace-nowrap scrollbar-hidden"
    >
      {children}
    </div>
  );
};

export default HorizontalScroll;
