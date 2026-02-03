import Link from "next/link";
import { cn } from "@/lib/utils/utils";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { useRouter } from "next/navigation";

interface PaginationProps {
  baseUrl: string;
  currentPage: number;
  locale: string;
  handlePageChange: (page: number) => void;
  total: number;
}

export function Pagination({
  baseUrl,
  currentPage,
  locale,
  handlePageChange,
  total,
}: PaginationProps) {
  const router = useRouter();
  const getPageRange = (totalPages: number) => {
    const pageRange = [];
    if (currentPage === 1) {
      pageRange.push(1, 2, 3, 4);
    } else {
      pageRange.push(
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      );
    }
    return pageRange.filter((page) => page <= totalPages);
  };
  const totalPages = Math.ceil(total / 18);
  const pageRange = getPageRange(totalPages);
  return (
    <nav className="flex items-center justify-center gap-2 my-20">
      <Link
        href={
          currentPage - 1 <= 1
            ? `${baseUrl}`
            : `${baseUrl}/page_${currentPage - 1}`
        }
        onClick={(e) => {
          e.preventDefault();
          router.push(
            currentPage - 1 <= 1
              ? `${baseUrl}`
              : `${baseUrl}/page_${currentPage - 1}`,
          );
          handlePageChange(currentPage - 1);
          // window.history.pushState(
          //   {},
          //   "",
          //   currentPage - 1 === 1
          //     ? `${baseUrl}`
          //     : `${baseUrl}/page_${currentPage - 1}`,
          // );
        }}
        className={cn(
          "px-3 py-2 rounded-lg",
          currentPage <= 1
            ? "pointer-events-none opacity-50"
            : "hover:bg-gray-100",
        )}
      >
        <MdOutlineKeyboardDoubleArrowLeft
          className={`${locale === "ar" ? "rotate-180" : ""}`}
        />
        <span className="sr-only">Previous Page</span>
      </Link>

      {/* Page Numbers */}
      {pageRange.map((pageNumber) => (
        <Link
          key={pageNumber}
          href={
            pageNumber === 1 ? `${baseUrl}` : `${baseUrl}/page_${pageNumber}`
          }
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(pageNumber);
            // window.history.pushState(
            //   {},
            //   "",
            //   pageNumber === 1 ? `${baseUrl}` : `${baseUrl}/page_${pageNumber}`,
            // );
            router.push(
              pageNumber === 1 ? `${baseUrl}` : `${baseUrl}/page_${pageNumber}`,
            );
          }}
          className={cn(
            "px-4 py-2 rounded-lg",
            currentPage === pageNumber
              ? "bg-primary-500 text-white"
              : "bg-gray-100 hover:bg-gray-200",
          )}
        >
          {pageNumber}
        </Link>
      ))}

      {/* Next Page */}
      <Link
        href={
          currentPage >= totalPages
            ? `${baseUrl}`
            : `${baseUrl}/page_${currentPage + 1}`
        }
        onClick={(e) => {
          e.preventDefault();
          handlePageChange(currentPage + 1);
          router.push(
            currentPage >= totalPages
              ? `${baseUrl}`
              : `${baseUrl}/page_${currentPage + 1}`,
          );
        }}
        className={cn(
          "px-3 py-2 rounded-lg hover:bg-gray-100",
          currentPage >= totalPages ? "pointer-events-none opacity-50" : "",
        )}
      >
        <MdOutlineKeyboardDoubleArrowRight
          className={`${locale === "ar" ? "rotate-180" : ""}`}
        />
        <span className="sr-only">Next Page</span>
      </Link>
    </nav>
  );
}
