import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface PaginationProps {
  pages: number;
  currentPage: number;
}

const Pagination = ({ pages, currentPage }: PaginationProps) => {
  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-center gap-4">
        {currentPage > 1 ? (
          <Link
            href={`/page/${currentPage - 1}`}
            className="flex items-center justify-center gap-2 text-sm"
          >
            <ChevronLeftIcon />
            Previous
          </Link>
        ) : null}
        {currentPage < pages ? (
          <Link
            href={`/page/${currentPage + 1}`}
            className="flex items-center justify-center gap-2 text-sm"
          >
            Next
            <ChevronRightIcon />
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Pagination;
