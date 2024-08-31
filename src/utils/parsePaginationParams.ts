import { IRequestedPaginationParams } from './types/paginationTypes';

const DEFAULT_PAGE = '1';
const DEFAULT_PERPAGE = '3';

export const parsePaginationParams = (
  query: IRequestedPaginationParams,
): { page: number; perPage: number } => {
  const { page = DEFAULT_PAGE, perPage = DEFAULT_PERPAGE } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 5);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};

const parseNumber = (
  numberFromRequest: string,
  defaultValue: number,
): number => {
  const isString = typeof numberFromRequest === 'string';
  if (!isString) return defaultValue;

  const parsedNumber = parseInt(numberFromRequest);

  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }

  return parsedNumber;
};
