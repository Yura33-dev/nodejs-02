import { IPaginationData } from './types/paginationTypes';

export const calculatePaginationData = (
  totalCount: number,
  perPage: number,
  page: number,
): IPaginationData => {
  const totalPages = Math.ceil(totalCount / perPage);
  const hasNextPage = Boolean(totalPages - page);
  const hasPreviousPage = page !== 1;

  return {
    page,
    perPage,
    totalItems: totalCount,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
