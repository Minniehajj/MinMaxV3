import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface PaginationProps {
  pages: number;
  currentPage: number;
}

const Pagination = ({ pages, currentPage }: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-4 pt-2 lg:justify-between">
      {currentPage > 1 && (
        <Link
          href={`/page/${currentPage - 1}`}
          className="flex items-center justify-center gap-2 border p-4 text-xl"
        >
          <ChevronLeftIcon />
          Previous
        </Link>
      )}
      {currentPage < pages && (
        <Link
          href={`/page/${currentPage + 1}`}
          className="flex items-center justify-center gap-2 border p-4 text-xl"
        >
          Next
          <ChevronRightIcon />
        </Link>
      )}
    </div>
  );
};

export default Pagination;