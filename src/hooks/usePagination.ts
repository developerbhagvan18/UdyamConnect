'use client';

import { useState, useMemo } from 'react';

interface UsePaginationOptions {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
}

export function usePagination({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1,
}: UsePaginationOptions) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = useMemo(() => {
    const range: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
    return range;
  }, [totalPages]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const goToNext = () => goToPage(currentPage + 1);
  const goToPrev = () => goToPage(currentPage - 1);

  return {
    currentPage,
    totalPages,
    pages,
    startIndex,
    endIndex,
    goToPage,
    goToNext,
    goToPrev,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
}

