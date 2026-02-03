// src/context/scroll.context.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { usePathname } from "next/navigation";

interface ScrollPosition {
  [key: string]: number;
}

interface ScrollPositionContextType {
  scrollPositions: ScrollPosition;
  saveScrollPosition: (path: string, position: number) => void;
  getScrollPosition: (path: string) => number;
  restoreScrollPosition: (path: string) => void;
  isTransitioning: boolean;
  setIsTransitioning: (transitioning: boolean) => void;
}

const ScrollPositionContext = createContext<
  ScrollPositionContextType | undefined
>(undefined);

export const useScrollPosition = () => {
  const context = useContext(ScrollPositionContext);
  if (!context) {
    throw new Error(
      "useScrollPosition must be used within a ScrollPositionProvider",
    );
  }
  return context;
};

interface ScrollPositionProviderProps {
  children: React.ReactNode;
}

export const ScrollPositionProvider: React.FC<ScrollPositionProviderProps> = ({
  children,
}) => {
  const [scrollPositions, setScrollPositions] = useState<ScrollPosition>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();
  const isRestoringRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize functions to prevent infinite re-renders
  const saveScrollPosition = useCallback((path: string, position: number) => {
    setScrollPositions((prev) => {
      // Only update if the position actually changed
      if (prev[path] !== position) {
        return {
          ...prev,
          [path]: position,
        };
      }
      return prev;
    });
  }, []);

  const getScrollPosition = useCallback(
    (path: string): number => {
      return scrollPositions[path] || 0;
    },
    [scrollPositions],
  );

  const restoreScrollPosition = useCallback(
    (path: string) => {
      const position = getScrollPosition(path);
      if (position > 0) {
        isRestoringRef.current = true;
        window.scrollTo({
          top: position,
          behavior: "instant",
        });

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          isRestoringRef.current = false;
        }, 100);
      }
    },
    [getScrollPosition],
  );

  // Handle scroll position saving
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (!isRestoringRef.current && !isTransitioning) {
  //       const currentPosition = window.scrollY;
  //       saveScrollPosition(pathname, currentPosition);
  //     }
  //   };

  //   let ticking = false;
  //   const throttledHandleScroll = () => {
  //     if (!ticking) {
  //       requestAnimationFrame(() => {
  //         handleScroll();
  //         ticking = false;
  //       });
  //       ticking = true;
  //     }
  //   };

  //   window.addEventListener("scroll", throttledHandleScroll, { passive: true });

  //   return () => {
  //     window.removeEventListener("scroll", throttledHandleScroll);
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //   };
  // }, [pathname, isTransitioning, saveScrollPosition]);

  // Restore scroll position when pathname changes
  // useEffect(() => {
  //   if (!isTransitioning) {
  //     const timer = setTimeout(() => {
  //       restoreScrollPosition(pathname);
  //     }, 50);

  //     return () => clearTimeout(timer);
  //   }
  // }, [pathname, isTransitioning, restoreScrollPosition]);

  // // Cleanup timeout on unmount
  // useEffect(() => {
  //   return () => {
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //   };
  // }, []);

  const value: ScrollPositionContextType = {
    scrollPositions,
    saveScrollPosition,
    getScrollPosition,
    restoreScrollPosition,
    isTransitioning,
    setIsTransitioning,
  };

  return (
    <ScrollPositionContext.Provider value={value}>
      {children}
    </ScrollPositionContext.Provider>
  );
};
