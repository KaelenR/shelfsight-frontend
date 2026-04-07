"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGE_SIZE_OPTIONS } from "../constants";

interface CatalogPaginationProps {
  page: number;
  pageSize: number;
  total: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function CatalogPagination({
  page,
  pageSize,
  total,
  isLoading = false,
  onPageChange,
  onPageSizeChange,
}: CatalogPaginationProps) {
  if (total === 0) {
    return null;
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);

  // Generate page numbers with ellipsis.
  const getPageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-xs text-muted-foreground">
        Showing {start}-{end} of {total} books
      </p>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          disabled={isLoading || currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {getPageNumbers().map((p, idx) =>
          p === "ellipsis" ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-8 text-center text-xs text-muted-foreground"
            >
              ...
            </span>
          ) : (
            <Button
              key={p}
              variant={currentPage === p ? "default" : "outline"}
              size="sm"
              disabled={isLoading}
              className={`h-8 w-8 p-0 text-xs ${
                currentPage === p
                  ? "bg-brand-navy text-white hover:bg-brand-navy/90"
                  : ""
              }`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          disabled={isLoading || currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Per page</span>
        <Select
          value={String(pageSize)}
          disabled={isLoading}
          onValueChange={(v) => onPageSizeChange(Number(v))}
        >
          <SelectTrigger className="h-8 w-[70px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZE_OPTIONS.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
